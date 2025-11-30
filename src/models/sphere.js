import * as THREE from 'three';

export const sphereModel = {
    id: 'sphere',
    name: 'Sphere',
    icon: '🔮',
    type: 'Primitive',
    description: 'Smooth sphere geometry',
    partCount: 1,
    
    create(meshes) {
        const geometry = new THREE.SphereGeometry(1.2, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0x3498db,
            roughness: 0.2,
            metalness: 0.5
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;
        meshes.push(sphere);
        return sphere;
    }
};

