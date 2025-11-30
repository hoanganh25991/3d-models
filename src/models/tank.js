import * as THREE from 'three';

export const tankModel = {
    id: 'tank',
    name: 'Tank',
    icon: '🛡️',
    type: 'Vehicle',
    description: 'Military battle tank',
    partCount: 11,
    
    create(meshes) {
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
        meshes.push(body);
        
        // Turret base
        const turretBaseGeom = new THREE.BoxGeometry(1.6, 0.8, 1.4);
        const turretBase = new THREE.Mesh(turretBaseGeom, createMaterial(colors.turret));
        turretBase.position.set(0.2, 1.6, 0);
        turretBase.castShadow = true;
        tank.add(turretBase);
        meshes.push(turretBase);
        
        // Turret top
        const turretTopGeom = new THREE.BoxGeometry(0.8, 0.4, 0.6);
        const turretTop = new THREE.Mesh(turretTopGeom, createMaterial(colors.turret));
        turretTop.position.set(0.2, 2.2, 0);
        turretTop.castShadow = true;
        tank.add(turretTop);
        meshes.push(turretTop);
        
        // Gun barrel
        const barrelGeom = new THREE.BoxGeometry(3, 0.25, 0.25);
        const barrel = new THREE.Mesh(barrelGeom, createMaterial(colors.barrel));
        barrel.position.set(-1.8, 1.6, 0);
        barrel.castShadow = true;
        tank.add(barrel);
        meshes.push(barrel);
        
        // Machine gun mount (vertical post)
        const mgMountGeom = new THREE.BoxGeometry(0.15, 0.5, 0.15);
        const mgMount = new THREE.Mesh(mgMountGeom, createMaterial(colors.turret));
        mgMount.position.set(0.2, 2.65, 0);
        mgMount.castShadow = true;
        tank.add(mgMount);
        meshes.push(mgMount);
        
        // Machine gun barrel (angled)
        const mgBarrelGeom = new THREE.BoxGeometry(1.0, 0.1, 0.1);
        const mgBarrel = new THREE.Mesh(mgBarrelGeom, createMaterial(colors.barrel));
        mgBarrel.position.set(-0.3, 2.85, 0);
        mgBarrel.rotation.z = -0.15;
        mgBarrel.castShadow = true;
        tank.add(mgBarrel);
        meshes.push(mgBarrel);
        
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
            meshes.push(wheel);
        });
        
        // Track/fender (side panels)
        const fenderGeom = new THREE.BoxGeometry(3.8, 0.15, 0.1);
        const fenderMaterial = createMaterial(colors.body);
        
        const leftFender = new THREE.Mesh(fenderGeom, fenderMaterial);
        leftFender.position.set(0, 0.1, 1.2);
        leftFender.castShadow = true;
        tank.add(leftFender);
        meshes.push(leftFender);
        
        const rightFender = new THREE.Mesh(fenderGeom, fenderMaterial);
        rightFender.position.set(0, 0.1, -1.2);
        rightFender.castShadow = true;
        tank.add(rightFender);
        meshes.push(rightFender);
        
        // Position tank
        tank.position.y = 0.3;
        
        return tank;
    }
};

