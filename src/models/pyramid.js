import * as THREE from 'three';

export const pyramidModel = {
    id: 'pyramid',
    name: 'Pyramid',
    icon: '🔺',
    type: 'Primitive',
    description: 'Four-sided pyramid',
    partCount: 1,
    
    create(meshes) {
        const geometry = new THREE.ConeGeometry(1.5, 2.5, 4);
        const material = new THREE.MeshStandardMaterial({
            color: 0xf1c40f,
            roughness: 0.3,
            metalness: 0.3
        });
        const pyramid = new THREE.Mesh(geometry, material);
        pyramid.rotation.y = Math.PI / 4;
        pyramid.castShadow = true;
        meshes.push(pyramid);
        return pyramid;
    }
};

