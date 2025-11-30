import * as THREE from 'three';

export const cubeModel = {
    id: 'cube',
    name: 'Cube',
    icon: '🧊',
    type: 'Primitive',
    description: 'Simple cube geometry',
    partCount: 1,
    
    create(meshes) {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({
            color: 0xe67e22,
            roughness: 0.4,
            metalness: 0.2
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        meshes.push(cube);
        return cube;
    }
};

