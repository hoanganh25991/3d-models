import * as THREE from 'three';

export const gunModel = {
    id: 'gun',
    name: 'AK-47',
    icon: '🔫',
    type: 'Weapon',
    description: 'A black plastic toy AK-47 style rifle',
    partCount: 12,
    
    create(meshes) {
        const gun = new THREE.Group();
        
        // Colors
        const colors = {
            black: 0x2a2a2a,
            dark: 0x1a1a1a,
            metal: 0x3a3a3a
        };
        
        const createMaterial = (color) => new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.5,
            metalness: 0.1
        });
        
        // All parts built along X axis: negative X = front (barrel), positive X = back (stock)
        
        // ===== 1. BARREL (front) =====
        const barrelGeom = new THREE.CylinderGeometry(0.06, 0.07, 1.5, 16);
        barrelGeom.rotateZ(Math.PI / 2);
        const barrel = new THREE.Mesh(barrelGeom, createMaterial(colors.metal));
        barrel.position.set(-1.5, 0, 0);
        barrel.castShadow = true;
        gun.add(barrel);
        meshes.push(barrel);
        
        // ===== 2. HANDGUARD (around barrel, connects to receiver) =====
        const handguardGeom = new THREE.BoxGeometry(0.7, 0.22, 0.22);
        const handguard = new THREE.Mesh(handguardGeom, createMaterial(colors.black));
        handguard.position.set(-0.9, 0, 0);
        handguard.castShadow = true;
        gun.add(handguard);
        meshes.push(handguard);
        
        // ===== 3. RECEIVER (main body, center) =====
        const receiverGeom = new THREE.BoxGeometry(1.0, 0.3, 0.24);
        const receiver = new THREE.Mesh(receiverGeom, createMaterial(colors.black));
        receiver.position.set(-0.1, 0, 0);
        receiver.castShadow = true;
        gun.add(receiver);
        meshes.push(receiver);
        
        // ===== 4. DUST COVER (top of receiver) =====
        const dustCoverGeom = new THREE.BoxGeometry(0.8, 0.08, 0.2);
        const dustCover = new THREE.Mesh(dustCoverGeom, createMaterial(colors.dark));
        dustCover.position.set(-0.1, 0.19, 0);
        dustCover.castShadow = true;
        gun.add(dustCover);
        meshes.push(dustCover);
        
        // ===== 5. MAGAZINE (curved, below receiver) =====
        const magazineGeom = new THREE.BoxGeometry(0.25, 0.6, 0.12);
        const magazine = new THREE.Mesh(magazineGeom, createMaterial(colors.dark));
        magazine.position.set(-0.15, -0.45, 0);
        magazine.rotation.z = 0.15; // Slight angle for curved look
        magazine.castShadow = true;
        gun.add(magazine);
        meshes.push(magazine);
        
        // ===== 6. PISTOL GRIP (behind magazine) =====
        const gripGeom = new THREE.BoxGeometry(0.18, 0.45, 0.18);
        const grip = new THREE.Mesh(gripGeom, createMaterial(colors.black));
        grip.position.set(0.25, -0.4, 0);
        grip.rotation.z = -0.2; // Angled back
        grip.castShadow = true;
        gun.add(grip);
        meshes.push(grip);
        
        // ===== 7. TRIGGER GUARD =====
        const triggerGuardGeom = new THREE.TorusGeometry(0.1, 0.02, 8, 12, Math.PI);
        const triggerGuard = new THREE.Mesh(triggerGuardGeom, createMaterial(colors.dark));
        triggerGuard.position.set(0.05, -0.2, 0);
        triggerGuard.rotation.z = Math.PI;
        triggerGuard.castShadow = true;
        gun.add(triggerGuard);
        meshes.push(triggerGuard);
        
        // ===== 8. STOCK (back, connected to receiver) =====
        const stockGeom = new THREE.BoxGeometry(0.8, 0.2, 0.18);
        const stock = new THREE.Mesh(stockGeom, createMaterial(colors.black));
        stock.position.set(0.8, 0, 0);
        stock.castShadow = true;
        gun.add(stock);
        meshes.push(stock);
        
        // ===== 9. STOCK BUTTPAD =====
        const buttpadGeom = new THREE.BoxGeometry(0.08, 0.25, 0.2);
        const buttpad = new THREE.Mesh(buttpadGeom, createMaterial(colors.dark));
        buttpad.position.set(1.24, 0, 0);
        buttpad.castShadow = true;
        gun.add(buttpad);
        meshes.push(buttpad);
        
        // ===== 10. FRONT SIGHT =====
        const frontSightGeom = new THREE.BoxGeometry(0.08, 0.12, 0.06);
        const frontSight = new THREE.Mesh(frontSightGeom, createMaterial(colors.metal));
        frontSight.position.set(-2.1, 0.1, 0);
        frontSight.castShadow = true;
        gun.add(frontSight);
        meshes.push(frontSight);
        
        // ===== 11. REAR SIGHT =====
        const rearSightGeom = new THREE.BoxGeometry(0.1, 0.08, 0.08);
        const rearSight = new THREE.Mesh(rearSightGeom, createMaterial(colors.metal));
        rearSight.position.set(0.2, 0.23, 0);
        rearSight.castShadow = true;
        gun.add(rearSight);
        meshes.push(rearSight);
        
        // ===== 12. MUZZLE =====
        const muzzleGeom = new THREE.CylinderGeometry(0.08, 0.06, 0.15, 12);
        muzzleGeom.rotateZ(Math.PI / 2);
        const muzzle = new THREE.Mesh(muzzleGeom, createMaterial(colors.metal));
        muzzle.position.set(-2.3, 0, 0);
        muzzle.castShadow = true;
        gun.add(muzzle);
        meshes.push(muzzle);
        
        // Position gun in scene
        gun.position.y = 1.0;
        
        return gun;
    }
};
