import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getAllModels, getModelById, createModel } from './models/index.js';

// ============================================
// Three.js Setup
// ============================================

class ModelViewer {
    constructor() {
        this.canvas = document.getElementById('three-canvas');
        this.canvasWrapper = document.getElementById('canvasWrapper');
        this.currentModel = null;
        this.autoRotate = true;
        this.wireframe = false;
        this.meshes = [];
        
        this.init();
        this.setupUI();
        this.animate();
        
        // Load first model
        const models = getAllModels();
        if (models.length > 0) {
            this.loadModel(models[0].id);
        }
    }
    
    init() {
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        const aspect = this.canvasWrapper.clientWidth / this.canvasWrapper.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
        this.camera.position.set(5, 4, 8);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.canvasWrapper.clientWidth, this.canvasWrapper.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        
        // Controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = this.autoRotate;
        this.controls.autoRotateSpeed = 2;
        this.controls.minDistance = 3;
        this.controls.maxDistance = 20;
        
        // Lights
        this.setupLights();
        
        // Grid and environment
        this.setupEnvironment();
        
        // Resize handler
        window.addEventListener('resize', () => this.onResize());
    }
    
    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        
        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 50;
        mainLight.shadow.camera.left = -10;
        mainLight.shadow.camera.right = 10;
        mainLight.shadow.camera.top = 10;
        mainLight.shadow.camera.bottom = -10;
        this.scene.add(mainLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0xe67e22, 0.3);
        fillLight.position.set(-5, 3, -5);
        this.scene.add(fillLight);
        
        // Rim light
        const rimLight = new THREE.DirectionalLight(0x6fa8dc, 0.4);
        rimLight.position.set(0, 5, -10);
        this.scene.add(rimLight);
    }
    
    setupEnvironment() {
        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(30, 30);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1f,
            roughness: 0.9,
            metalness: 0.1
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -2;
        ground.receiveShadow = true;
        this.scene.add(ground);
        
        // Grid
        const gridHelper = new THREE.GridHelper(20, 40, 0x333333, 0x222222);
        gridHelper.position.y = -1.99;
        this.scene.add(gridHelper);
    }
    
    setupUI() {
        // Mobile menu toggle
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const menuToggle = document.getElementById('menuToggle');
        
        const openSidebar = () => {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('visible');
        };
        
        const closeSidebar = () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('visible');
        };
        
        menuToggle.addEventListener('click', openSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Populate model list from registry
        const modelList = document.getElementById('modelList');
        const models = getAllModels();
        
        models.forEach(model => {
            const li = document.createElement('li');
            li.className = 'model-item';
            li.dataset.modelId = model.id;
            li.innerHTML = `
                <div class="model-icon">${model.icon}</div>
                <span class="model-name">${model.name}</span>
            `;
            li.addEventListener('click', () => {
                this.loadModel(model.id);
                // Close sidebar on mobile after selection
                closeSidebar();
            });
            modelList.appendChild(li);
        });
        
        // Auto rotate toggle
        const autoRotateBtn = document.getElementById('autoRotateBtn');
        autoRotateBtn.addEventListener('click', () => {
            this.autoRotate = !this.autoRotate;
            this.controls.autoRotate = this.autoRotate;
            autoRotateBtn.classList.toggle('active', this.autoRotate);
        });
        
        // Wireframe toggle
        const wireframeBtn = document.getElementById('wireframeBtn');
        wireframeBtn.addEventListener('click', () => {
            this.wireframe = !this.wireframe;
            wireframeBtn.classList.toggle('active', this.wireframe);
            this.updateWireframe();
        });
        
        // Reset view
        document.getElementById('resetViewBtn').addEventListener('click', () => {
            this.camera.position.set(5, 4, 8);
            this.controls.target.set(0, 0, 0);
            this.controls.update();
        });
        
        // Fullscreen
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                this.canvasWrapper.requestFullscreen();
            }
        });
    }
    
    loadModel(modelId) {
        // Clear current model
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
            this.meshes = [];
        }
        
        // Update UI
        document.querySelectorAll('.model-item').forEach(item => {
            item.classList.toggle('active', item.dataset.modelId === modelId);
        });
        
        // Get model data from registry
        const modelData = getModelById(modelId);
        if (!modelData) return;
        
        document.getElementById('currentModelTitle').textContent = modelData.name;
        
        // Create model using registry factory
        const model = createModel(modelId, this.meshes);
        
        if (model) {
            this.currentModel = model;
            this.scene.add(model);
            this.updateWireframe();
            
            // Update info panel
            document.getElementById('infoName').textContent = modelData.name;
            document.getElementById('infoParts').textContent = modelData.partCount;
            document.getElementById('infoType').textContent = modelData.type;
        }
        
        // Reset camera for this model
        this.controls.target.set(0, 0, 0);
    }
    
    updateWireframe() {
        this.meshes.forEach(mesh => {
            if (mesh.material) {
                mesh.material.wireframe = this.wireframe;
            }
        });
    }
    
    onResize() {
        const width = this.canvasWrapper.clientWidth;
        const height = this.canvasWrapper.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModelViewer();
});
