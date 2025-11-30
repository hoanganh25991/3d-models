import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================
// Model Definitions
// ============================================

const MODELS = [
    {
        id: 'robot',
        name: 'Robot',
        icon: '🤖',
        type: 'Character',
        description: 'A friendly geometric robot'
    },
    {
        id: 'tank',
        name: 'Tank',
        icon: '🛡️',
        type: 'Vehicle',
        description: 'Military battle tank'
    },
    {
        id: 'cube',
        name: 'Cube',
        icon: '🧊',
        type: 'Primitive',
        description: 'Simple cube geometry'
    },
    {
        id: 'sphere',
        name: 'Sphere',
        icon: '🔮',
        type: 'Primitive',
        description: 'Smooth sphere geometry'
    },
    {
        id: 'pyramid',
        name: 'Pyramid',
        icon: '🔺',
        type: 'Primitive',
        description: 'Four-sided pyramid'
    },
    {
        id: 'torus',
        name: 'Torus',
        icon: '⭕',
        type: 'Primitive',
        description: 'Donut-shaped geometry'
    }
];

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
        this.loadModel('robot');
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
        // Populate model list
        const modelList = document.getElementById('modelList');
        MODELS.forEach(model => {
            const li = document.createElement('li');
            li.className = 'model-item';
            li.dataset.modelId = model.id;
            li.innerHTML = `
                <div class="model-icon">${model.icon}</div>
                <span class="model-name">${model.name}</span>
            `;
            li.addEventListener('click', () => this.loadModel(model.id));
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
        
        const modelData = MODELS.find(m => m.id === modelId);
        document.getElementById('currentModelTitle').textContent = modelData.name;
        
        // Create model
        let model;
        let partCount = 0;
        
        switch (modelId) {
            case 'robot':
                model = this.createRobot();
                partCount = 10;
                break;
            case 'tank':
                model = this.createTank();
                partCount = 11;
                break;
            case 'cube':
                model = this.createCube();
                partCount = 1;
                break;
            case 'sphere':
                model = this.createSphere();
                partCount = 1;
                break;
            case 'pyramid':
                model = this.createPyramid();
                partCount = 1;
                break;
            case 'torus':
                model = this.createTorus();
                partCount = 1;
                break;
        }
        
        this.currentModel = model;
        this.scene.add(model);
        this.updateWireframe();
        
        // Update info panel
        document.getElementById('infoName').textContent = modelData.name;
        document.getElementById('infoParts').textContent = partCount;
        document.getElementById('infoType').textContent = modelData.type;
        
        // Reset camera for this model
        this.controls.target.set(0, 0, 0);
    }
    
    createRobot() {
        const robot = new THREE.Group();
        
        // Colors based on sample image
        const colors = {
            head: 0xf5c6a5,
            neck: 0xf5c6a5,
            body: 0xe08850,
            arm: 0xfad5b5,
            hand: 0xfce5cc,
            legLeft: 0xf5a060,
            legRight: 0xf5a060,
            foot: 0x3d5a7a
        };
        
        // Material factory
        const createMaterial = (color) => new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.5,
            metalness: 0.1
        });
        
        // Head
        const headGeom = new THREE.BoxGeometry(1.4, 1.2, 1);
        const head = new THREE.Mesh(headGeom, createMaterial(colors.head));
        head.position.set(0, 2.8, 0);
        head.castShadow = true;
        robot.add(head);
        this.meshes.push(head);
        
        // Neck
        const neckGeom = new THREE.BoxGeometry(0.6, 0.4, 0.5);
        const neck = new THREE.Mesh(neckGeom, createMaterial(colors.neck));
        neck.position.set(0, 2.0, 0);
        neck.castShadow = true;
        robot.add(neck);
        this.meshes.push(neck);
        
        // Body
        const bodyGeom = new THREE.BoxGeometry(2.4, 2.2, 1.2);
        const body = new THREE.Mesh(bodyGeom, createMaterial(colors.body));
        body.position.set(0, 0.7, 0);
        body.castShadow = true;
        robot.add(body);
        this.meshes.push(body);
        
        // Left arm
        const armGeom = new THREE.BoxGeometry(0.8, 0.6, 0.5);
        const leftArm = new THREE.Mesh(armGeom, createMaterial(colors.arm));
        leftArm.position.set(-1.8, 1.0, 0);
        leftArm.castShadow = true;
        robot.add(leftArm);
        this.meshes.push(leftArm);
        
        // Right arm
        const rightArm = new THREE.Mesh(armGeom, createMaterial(colors.arm));
        rightArm.position.set(1.8, 1.0, 0);
        rightArm.castShadow = true;
        robot.add(rightArm);
        this.meshes.push(rightArm);
        
        // Left hand
        const handGeom = new THREE.BoxGeometry(0.5, 0.5, 0.4);
        const leftHand = new THREE.Mesh(handGeom, createMaterial(colors.hand));
        leftHand.position.set(-2.45, 1.0, 0);
        leftHand.castShadow = true;
        robot.add(leftHand);
        this.meshes.push(leftHand);
        
        // Right hand
        const rightHand = new THREE.Mesh(handGeom, createMaterial(colors.hand));
        rightHand.position.set(2.45, 1.0, 0);
        rightHand.castShadow = true;
        robot.add(rightHand);
        this.meshes.push(rightHand);
        
        // Left leg
        const legGeom = new THREE.BoxGeometry(0.9, 1.8, 0.7);
        const leftLeg = new THREE.Mesh(legGeom, createMaterial(colors.legLeft));
        leftLeg.position.set(-0.55, -1.2, 0);
        leftLeg.castShadow = true;
        robot.add(leftLeg);
        this.meshes.push(leftLeg);
        
        // Right leg
        const rightLeg = new THREE.Mesh(legGeom, createMaterial(colors.legRight));
        rightLeg.position.set(0.55, -1.2, 0);
        rightLeg.castShadow = true;
        robot.add(rightLeg);
        this.meshes.push(rightLeg);
        
        // Left foot
        const footGeom = new THREE.BoxGeometry(1.0, 0.4, 0.8);
        const leftFoot = new THREE.Mesh(footGeom, createMaterial(colors.foot));
        leftFoot.position.set(-0.55, -2.3, 0);
        leftFoot.castShadow = true;
        robot.add(leftFoot);
        this.meshes.push(leftFoot);
        
        // Right foot
        const rightFoot = new THREE.Mesh(footGeom, createMaterial(colors.foot));
        rightFoot.position.set(0.55, -2.3, 0);
        rightFoot.castShadow = true;
        robot.add(rightFoot);
        this.meshes.push(rightFoot);
        
        // Center the robot
        robot.position.y = 0.5;
        
        return robot;
    }
    
    createTank() {
        const tank = new THREE.Group();
        
        // Colors - military green theme
        const colors = {
            body: 0x4abe4a,
            turret: 0x3da63d,
            barrel: 0x3da63d,
            wheel: 0x2a2a2a
        };
        
        // Material factory
        const createMaterial = (color) => new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.6,
            metalness: 0.3
        });
        
        const wheelMaterial = new THREE.MeshStandardMaterial({
            color: colors.wheel,
            roughness: 0.8,
            metalness: 0.2
        });
        
        // Main body
        const bodyGeom = new THREE.BoxGeometry(3.5, 1.4, 2.2);
        const body = new THREE.Mesh(bodyGeom, createMaterial(colors.body));
        body.position.set(0, 0.5, 0);
        body.castShadow = true;
        tank.add(body);
        this.meshes.push(body);
        
        // Turret base
        const turretBaseGeom = new THREE.BoxGeometry(1.6, 0.8, 1.4);
        const turretBase = new THREE.Mesh(turretBaseGeom, createMaterial(colors.turret));
        turretBase.position.set(0.2, 1.6, 0);
        turretBase.castShadow = true;
        tank.add(turretBase);
        this.meshes.push(turretBase);
        
        // Turret top
        const turretTopGeom = new THREE.BoxGeometry(0.8, 0.4, 0.6);
        const turretTop = new THREE.Mesh(turretTopGeom, createMaterial(colors.turret));
        turretTop.position.set(0.2, 2.2, 0);
        turretTop.castShadow = true;
        tank.add(turretTop);
        this.meshes.push(turretTop);
        
        // Gun barrel
        const barrelGeom = new THREE.BoxGeometry(3, 0.25, 0.25);
        const barrel = new THREE.Mesh(barrelGeom, createMaterial(colors.barrel));
        barrel.position.set(-1.8, 1.6, 0);
        barrel.castShadow = true;
        tank.add(barrel);
        this.meshes.push(barrel);
        
        // Machine gun mount (vertical post)
        const mgMountGeom = new THREE.BoxGeometry(0.15, 0.5, 0.15);
        const mgMount = new THREE.Mesh(mgMountGeom, createMaterial(colors.turret));
        mgMount.position.set(0.2, 2.65, 0);
        mgMount.castShadow = true;
        tank.add(mgMount);
        this.meshes.push(mgMount);
        
        // Machine gun barrel (angled)
        const mgBarrelGeom = new THREE.BoxGeometry(1.0, 0.1, 0.1);
        const mgBarrel = new THREE.Mesh(mgBarrelGeom, createMaterial(colors.barrel));
        mgBarrel.position.set(-0.3, 2.85, 0);
        mgBarrel.rotation.z = -0.15; // slight angle
        mgBarrel.castShadow = true;
        tank.add(mgBarrel);
        this.meshes.push(mgBarrel);
        
        // Wheels (4 wheels)
        const wheelGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
        const wheelPositions = [
            { x: -1.2, z: 1.1 },
            { x: 1.2, z: 1.1 },
            { x: -1.2, z: -1.1 },
            { x: 1.2, z: -1.1 }
        ];
        
        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeom, wheelMaterial);
            wheel.rotation.x = Math.PI / 2;
            wheel.position.set(pos.x, -0.3, pos.z);
            wheel.castShadow = true;
            tank.add(wheel);
            this.meshes.push(wheel);
        });
        
        // Track/fender (side panels)
        const fenderGeom = new THREE.BoxGeometry(3.8, 0.15, 0.1);
        const fenderMaterial = createMaterial(colors.body);
        
        const leftFender = new THREE.Mesh(fenderGeom, fenderMaterial);
        leftFender.position.set(0, 0.1, 1.2);
        leftFender.castShadow = true;
        tank.add(leftFender);
        this.meshes.push(leftFender);
        
        const rightFender = new THREE.Mesh(fenderGeom, fenderMaterial);
        rightFender.position.set(0, 0.1, -1.2);
        rightFender.castShadow = true;
        tank.add(rightFender);
        this.meshes.push(rightFender);
        
        // Position tank
        tank.position.y = 0.3;
        
        return tank;
    }
    
    createCube() {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({
            color: 0xe67e22,
            roughness: 0.4,
            metalness: 0.2
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        this.meshes.push(cube);
        return cube;
    }
    
    createSphere() {
        const geometry = new THREE.SphereGeometry(1.2, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0x3498db,
            roughness: 0.2,
            metalness: 0.5
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;
        this.meshes.push(sphere);
        return sphere;
    }
    
    createPyramid() {
        const geometry = new THREE.ConeGeometry(1.5, 2.5, 4);
        const material = new THREE.MeshStandardMaterial({
            color: 0xf1c40f,
            roughness: 0.3,
            metalness: 0.3
        });
        const pyramid = new THREE.Mesh(geometry, material);
        pyramid.rotation.y = Math.PI / 4;
        pyramid.castShadow = true;
        this.meshes.push(pyramid);
        return pyramid;
    }
    
    createTorus() {
        const geometry = new THREE.TorusGeometry(1, 0.4, 32, 100);
        const material = new THREE.MeshStandardMaterial({
            color: 0x9b59b6,
            roughness: 0.2,
            metalness: 0.6
        });
        const torus = new THREE.Mesh(geometry, material);
        torus.rotation.x = Math.PI / 4;
        torus.castShadow = true;
        this.meshes.push(torus);
        return torus;
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

