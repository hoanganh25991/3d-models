import * as THREE from 'three';

export const gunModel = {
    id: 'gun',
    name: 'AK-47',
    icon: '🔫',
    type: 'Weapon',
    description: 'A black plastic toy AK-47 style rifle',
    partCount: 28,
    
    create(meshes) {
        const gun = new THREE.Group();
        
        // Black plastic material with improved contrast
        const colors = {
            black: 0x1a1a1a,        // Main black
            blackDark: 0x0d0d0d,    // Darker black for details
            detail: 0x2a2a2a,       // Slightly lighter for small details
            metal: 0x252525         // Slight metallic accent
        };
        
        // Material factory - plastic with slight gloss for better visibility
        const createMaterial = (color, roughness = 0.6, metalness = 0.0) => new THREE.MeshStandardMaterial({
            color: color,
            roughness: roughness,
            metalness: metalness,
            envMapIntensity: 0.5
        });
        
        // ===== BARREL =====
        // Barrel extends from receiver front (x = -0.625) forward
        const barrelLength = 1.2;
        const barrelStartX = -0.625;
        const barrelGeom = new THREE.CylinderGeometry(0.08, 0.09, barrelLength, 16);
        barrelGeom.rotateZ(Math.PI / 2);
        const barrel = new THREE.Mesh(barrelGeom, createMaterial(colors.black, 0.5));
        barrel.position.set(barrelStartX - barrelLength / 2, 0, 0);
        barrel.castShadow = true;
        gun.add(barrel);
        meshes.push(barrel);
        
        // Barrel tip detail
        const barrelTipGeom = new THREE.CylinderGeometry(0.085, 0.08, 0.05, 16);
        barrelTipGeom.rotateZ(Math.PI / 2);
        const barrelTip = new THREE.Mesh(barrelTipGeom, createMaterial(colors.metal, 0.3, 0.2));
        barrelTip.position.set(barrelStartX - barrelLength / 2 - 0.025, 0, 0);
        barrelTip.castShadow = true;
        gun.add(barrelTip);
        meshes.push(barrelTip);
        
        // ===== FRONT SIGHT =====
        const frontSightX = barrelStartX - barrelLength / 2 - 0.025;
        const frontSightGeom = new THREE.BoxGeometry(0.16, 0.14, 0.09);
        const frontSight = new THREE.Mesh(frontSightGeom, createMaterial(colors.black));
        frontSight.position.set(frontSightX, 0.02, 0);
        frontSight.castShadow = true;
        gun.add(frontSight);
        meshes.push(frontSight);
        
        // Front sight post
        const frontSightPostGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.08, 8);
        const frontSightPost = new THREE.Mesh(frontSightPostGeom, createMaterial(colors.detail));
        frontSightPost.position.set(frontSightX, 0.11, 0);
        frontSightPost.castShadow = true;
        gun.add(frontSightPost);
        meshes.push(frontSightPost);
        
        // ===== GAS TUBE / HANDGUARD =====
        const handguardLength = 0.8;
        const handguardStartX = barrelStartX - barrelLength / 2 + 0.2;
        const gasTubeGeom = new THREE.CylinderGeometry(0.1, 0.1, handguardLength, 16);
        gasTubeGeom.rotateZ(Math.PI / 2);
        const gasTube = new THREE.Mesh(gasTubeGeom, createMaterial(colors.black));
        gasTube.position.set(handguardStartX + handguardLength / 2, 0.05, 0);
        gasTube.castShadow = true;
        gun.add(gasTube);
        meshes.push(gasTube);
        
        // Handguard detail (lower section)
        const handguardGeom = new THREE.BoxGeometry(handguardLength, 0.15, 0.18);
        const handguard = new THREE.Mesh(handguardGeom, createMaterial(colors.black));
        handguard.position.set(handguardStartX + handguardLength / 2, -0.08, 0);
        handguard.castShadow = true;
        gun.add(handguard);
        meshes.push(handguard);
        
        // ===== RECEIVER (Main body) =====
        const receiverGeom = new THREE.BoxGeometry(1.25, 0.38, 0.26);
        const receiver = new THREE.Mesh(receiverGeom, createMaterial(colors.black, 0.55));
        receiver.position.set(0, 0, 0);
        receiver.castShadow = true;
        gun.add(receiver);
        meshes.push(receiver);
        
        // Receiver top detail with better definition
        const receiverTopGeom = new THREE.BoxGeometry(1.15, 0.16, 0.23);
        const receiverTop = new THREE.Mesh(receiverTopGeom, createMaterial(colors.blackDark, 0.5));
        receiverTop.position.set(0, 0.12, 0);
        receiverTop.castShadow = true;
        gun.add(receiverTop);
        meshes.push(receiverTop);
        
        // Receiver side detail lines
        const sideDetailGeom = new THREE.BoxGeometry(0.8, 0.02, 0.28);
        const sideDetail = new THREE.Mesh(sideDetailGeom, createMaterial(colors.detail));
        sideDetail.position.set(-0.2, 0.05, 0);
        sideDetail.castShadow = true;
        gun.add(sideDetail);
        meshes.push(sideDetail);
        
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
        // Grip attaches to receiver bottom
        const gripGeom = new THREE.BoxGeometry(0.32, 0.52, 0.26);
        gripGeom.scale(1, 1, 0.85);
        const grip = new THREE.Mesh(gripGeom, createMaterial(colors.black));
        grip.position.set(0.3, -0.68, 0);
        grip.rotation.x = 0.12;
        grip.castShadow = true;
        gun.add(grip);
        meshes.push(grip);
        
        // Grip texture detail (checkering pattern represented as lines)
        const gripDetailGeom = new THREE.BoxGeometry(0.28, 0.25, 0.02);
        const gripDetail = new THREE.Mesh(gripDetailGeom, createMaterial(colors.blackDark));
        gripDetail.position.set(0.3, -0.5, 0.14);
        gripDetail.rotation.x = 0.12;
        gun.add(gripDetail);
        meshes.push(gripDetail);
        
        // ===== SKELETAL STOCK (Open frame/D-shape) =====
        // Stock connects to receiver at x = 0.625 (half of receiver length)
        const stockStartX = 0.625;
        
        // Stock frame - left side
        const stockLeftGeom = new THREE.BoxGeometry(0.08, 0.6, 0.12);
        const stockLeft = new THREE.Mesh(stockLeftGeom, createMaterial(colors.black));
        stockLeft.position.set(stockStartX + 0.5, -0.2, -0.15);
        stockLeft.castShadow = true;
        gun.add(stockLeft);
        meshes.push(stockLeft);
        
        // Stock frame - right side
        const stockRightGeom = new THREE.BoxGeometry(0.08, 0.6, 0.12);
        const stockRight = new THREE.Mesh(stockRightGeom, createMaterial(colors.black));
        stockRight.position.set(stockStartX + 0.5, -0.2, 0.15);
        stockRight.castShadow = true;
        gun.add(stockRight);
        meshes.push(stockRight);
        
        // Stock frame - top
        const stockTopGeom = new THREE.BoxGeometry(0.08, 0.12, 0.3);
        const stockTop = new THREE.Mesh(stockTopGeom, createMaterial(colors.black));
        stockTop.position.set(stockStartX + 0.5, 0.15, 0);
        stockTop.castShadow = true;
        gun.add(stockTop);
        meshes.push(stockTop);
        
        // Stock frame - bottom (connector)
        const stockBottomGeom = new THREE.BoxGeometry(0.08, 0.12, 0.25);
        const stockBottom = new THREE.Mesh(stockBottomGeom, createMaterial(colors.black));
        stockBottom.position.set(stockStartX + 0.5, -0.55, 0);
        stockBottom.castShadow = true;
        gun.add(stockBottom);
        meshes.push(stockBottom);
        
        // Stock connector to receiver
        const stockConnectorGeom = new THREE.BoxGeometry(0.12, 0.15, 0.26);
        const stockConnector = new THREE.Mesh(stockConnectorGeom, createMaterial(colors.black));
        stockConnector.position.set(stockStartX, -0.1, 0);
        stockConnector.castShadow = true;
        gun.add(stockConnector);
        meshes.push(stockConnector);
        
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
        
        // Additional receiver pins/details
        for (let i = 0; i < 2; i++) {
            const pinGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.04, 8);
            pinGeom.rotateZ(Math.PI / 2);
            const pin = new THREE.Mesh(pinGeom, createMaterial(colors.detail, 0.4));
            pin.position.set(-0.15 + i * 0.3, -0.05, 0.15);
            pin.castShadow = true;
            gun.add(pin);
            meshes.push(pin);
        }
        
        // Trigger guard detail (connects receiver to grip)
        const triggerGuardGeom = new THREE.BoxGeometry(0.2, 0.08, 0.05);
        const triggerGuard = new THREE.Mesh(triggerGuardGeom, createMaterial(colors.blackDark));
        triggerGuard.position.set(0.3, -0.45, 0);
        triggerGuard.castShadow = true;
        gun.add(triggerGuard);
        meshes.push(triggerGuard);
        
        // Trigger guard sides (curved shape)
        const triggerGuardLeftGeom = new THREE.BoxGeometry(0.02, 0.15, 0.05);
        const triggerGuardLeft = new THREE.Mesh(triggerGuardLeftGeom, createMaterial(colors.blackDark));
        triggerGuardLeft.position.set(0.2, -0.38, 0);
        triggerGuardLeft.castShadow = true;
        gun.add(triggerGuardLeft);
        meshes.push(triggerGuardLeft);
        
        const triggerGuardRightGeom = new THREE.BoxGeometry(0.02, 0.15, 0.05);
        const triggerGuardRight = new THREE.Mesh(triggerGuardRightGeom, createMaterial(colors.blackDark));
        triggerGuardRight.position.set(0.4, -0.38, 0);
        triggerGuardRight.castShadow = true;
        gun.add(triggerGuardRight);
        meshes.push(triggerGuardRight);
        
        // Position the gun horizontally (barrel pointing left, stock to right)
        gun.rotation.y = Math.PI / 2;
        gun.position.y = 1.0;
        
        return gun;
    }
};

