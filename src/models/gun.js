import * as THREE from 'three';

export const gunModel = {
    id: 'gun',
    name: 'AK-47',
    icon: '🔫',
    type: 'Weapon',
    description: 'A black plastic toy AK-47 style rifle',
    partCount: 19,
    
    create(meshes) {
        const gun = new THREE.Group();
        
        // Black plastic material
        const colors = {
            black: 0x1a1a1a,        // Main black
            blackDark: 0x0d0d0d,    // Darker black for details
            detail: 0x2a2a2a        // Slightly lighter for small details
        };
        
        // Material factory - plastic with slight gloss
        const createMaterial = (color) => new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.7,
            metalness: 0.0
        });
        
        // ===== BARREL =====
        const barrelGeom = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16);
        barrelGeom.rotateZ(Math.PI / 2);
        const barrel = new THREE.Mesh(barrelGeom, createMaterial(colors.black));
        barrel.position.set(-1.8, 0, 0);
        barrel.castShadow = true;
        gun.add(barrel);
        meshes.push(barrel);
        
        // ===== FRONT SIGHT =====
        const frontSightGeom = new THREE.BoxGeometry(0.15, 0.12, 0.08);
        const frontSight = new THREE.Mesh(frontSightGeom, createMaterial(colors.black));
        frontSight.position.set(-2.3, 0, 0);
        frontSight.castShadow = true;
        gun.add(frontSight);
        meshes.push(frontSight);
        
        // ===== GAS TUBE / HANDGUARD =====
        const gasTubeGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16);
        gasTubeGeom.rotateZ(Math.PI / 2);
        const gasTube = new THREE.Mesh(gasTubeGeom, createMaterial(colors.black));
        gasTube.position.set(-1.0, 0.05, 0);
        gasTube.castShadow = true;
        gun.add(gasTube);
        meshes.push(gasTube);
        
        // Handguard detail (lower section)
        const handguardGeom = new THREE.BoxGeometry(0.8, 0.15, 0.18);
        const handguard = new THREE.Mesh(handguardGeom, createMaterial(colors.black));
        handguard.position.set(-1.0, -0.08, 0);
        handguard.castShadow = true;
        gun.add(handguard);
        meshes.push(handguard);
        
        // ===== RECEIVER (Main body) =====
        const receiverGeom = new THREE.BoxGeometry(1.2, 0.35, 0.25);
        const receiver = new THREE.Mesh(receiverGeom, createMaterial(colors.black));
        receiver.position.set(0, 0, 0);
        receiver.castShadow = true;
        gun.add(receiver);
        meshes.push(receiver);
        
        // Receiver top detail
        const receiverTopGeom = new THREE.BoxGeometry(1.1, 0.15, 0.22);
        const receiverTop = new THREE.Mesh(receiverTopGeom, createMaterial(colors.blackDark));
        receiverTop.position.set(0, 0.1, 0);
        receiverTop.castShadow = true;
        gun.add(receiverTop);
        meshes.push(receiverTop);
        
        // ===== CURVED MAGAZINE =====
        // Main magazine body (curved shape approximated with scaled geometry)
        const magazineGeom = new THREE.CylinderGeometry(0.25, 0.3, 1.0, 16);
        magazineGeom.scale(1.2, 1, 0.4);
        magazineGeom.rotateX(Math.PI / 2);
        magazineGeom.translate(0, 0, 0.15);
        const magazine = new THREE.Mesh(magazineGeom, createMaterial(colors.black));
        magazine.position.set(0, -0.5, 0);
        magazine.rotation.z = 0.1; // Slight curve
        magazine.castShadow = true;
        gun.add(magazine);
        meshes.push(magazine);
        
        // Magazine ribs (vertical detail)
        const ribGeom = new THREE.BoxGeometry(0.35, 0.05, 0.12);
        for (let i = 0; i < 4; i++) {
            const rib = new THREE.Mesh(ribGeom, createMaterial(colors.blackDark));
            rib.position.set(0, -0.7 + i * 0.25, 0.18);
            gun.add(rib);
            meshes.push(rib);
        }
        
        // ===== PISTOL GRIP =====
        const gripGeom = new THREE.BoxGeometry(0.3, 0.5, 0.25);
        gripGeom.scale(1, 1, 0.8);
        const grip = new THREE.Mesh(gripGeom, createMaterial(colors.black));
        grip.position.set(0.2, -0.65, 0);
        grip.rotation.x = 0.1;
        grip.castShadow = true;
        gun.add(grip);
        meshes.push(grip);
        
        // ===== SKELETAL STOCK (Open frame/D-shape) =====
        // Stock frame - left side
        const stockLeftGeom = new THREE.BoxGeometry(0.08, 0.6, 0.12);
        const stockLeft = new THREE.Mesh(stockLeftGeom, createMaterial(colors.black));
        stockLeft.position.set(1.2, -0.2, -0.15);
        stockLeft.castShadow = true;
        gun.add(stockLeft);
        meshes.push(stockLeft);
        
        // Stock frame - right side
        const stockRightGeom = new THREE.BoxGeometry(0.08, 0.6, 0.12);
        const stockRight = new THREE.Mesh(stockRightGeom, createMaterial(colors.black));
        stockRight.position.set(1.2, -0.2, 0.15);
        stockRight.castShadow = true;
        gun.add(stockRight);
        meshes.push(stockRight);
        
        // Stock frame - top
        const stockTopGeom = new THREE.BoxGeometry(0.08, 0.12, 0.3);
        const stockTop = new THREE.Mesh(stockTopGeom, createMaterial(colors.black));
        stockTop.position.set(1.2, 0.15, 0);
        stockTop.castShadow = true;
        gun.add(stockTop);
        meshes.push(stockTop);
        
        // Stock frame - bottom (connector)
        const stockBottomGeom = new THREE.BoxGeometry(0.08, 0.12, 0.25);
        const stockBottom = new THREE.Mesh(stockBottomGeom, createMaterial(colors.black));
        stockBottom.position.set(1.2, -0.55, 0);
        stockBottom.castShadow = true;
        gun.add(stockBottom);
        meshes.push(stockBottom);
        
        // ===== REAR SIGHT / DUST COVER =====
        const dustCoverGeom = new THREE.BoxGeometry(0.9, 0.1, 0.22);
        const dustCover = new THREE.Mesh(dustCoverGeom, createMaterial(colors.blackDark));
        dustCover.position.set(0.15, 0.18, 0);
        dustCover.castShadow = true;
        gun.add(dustCover);
        meshes.push(dustCover);
        
        // Rear sight post
        const rearSightGeom = new THREE.BoxGeometry(0.2, 0.08, 0.08);
        const rearSight = new THREE.Mesh(rearSightGeom, createMaterial(colors.black));
        rearSight.position.set(0.4, 0.22, 0);
        rearSight.castShadow = true;
        gun.add(rearSight);
        meshes.push(rearSight);
        
        // Small detail (pin/screw on receiver)
        const detailGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.05, 8);
        detailGeom.rotateZ(Math.PI / 2);
        const detail = new THREE.Mesh(detailGeom, createMaterial(colors.detail));
        detail.position.set(-0.3, 0.05, 0.16);
        detail.castShadow = true;
        gun.add(detail);
        meshes.push(detail);
        
        // Position the gun horizontally (barrel pointing left, stock to right)
        gun.rotation.y = Math.PI / 2;
        gun.position.y = 1.0;
        
        return gun;
    }
};

