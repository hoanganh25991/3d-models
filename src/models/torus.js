import * as THREE from 'three';

export const torusModel = {
    id: 'torus',
    name: 'Torus',
    icon: '⭕',
    type: 'Primitive',
    description: 'Donut-shaped geometry',
    partCount: 1,
    
    create(meshes) {
        const geometry = new THREE.TorusGeometry(1, 0.4, 32, 100);
        const material = new THREE.MeshStandardMaterial({
            color: 0x9b59b6,
            roughness: 0.2,
            metalness: 0.6
        });
        const torus = new THREE.Mesh(geometry, material);
        torus.rotation.x = Math.PI / 4;
        torus.castShadow = true;
        meshes.push(torus);
        return torus;
    }
};

