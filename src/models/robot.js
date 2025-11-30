import * as THREE from 'three';

export const robotModel = {
    id: 'robot',
    name: 'Robot',
    icon: '🤖',
    type: 'Character',
    description: 'A friendly geometric robot',
    partCount: 10,
    
    create(meshes) {
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
        meshes.push(head);
        
        // Neck
        const neckGeom = new THREE.BoxGeometry(0.6, 0.4, 0.5);
        const neck = new THREE.Mesh(neckGeom, createMaterial(colors.neck));
        neck.position.set(0, 2.0, 0);
        neck.castShadow = true;
        robot.add(neck);
        meshes.push(neck);
        
        // Body
        const bodyGeom = new THREE.BoxGeometry(2.4, 2.2, 1.2);
        const body = new THREE.Mesh(bodyGeom, createMaterial(colors.body));
        body.position.set(0, 0.7, 0);
        body.castShadow = true;
        robot.add(body);
        meshes.push(body);
        
        // Left arm
        const armGeom = new THREE.BoxGeometry(0.8, 0.6, 0.5);
        const leftArm = new THREE.Mesh(armGeom, createMaterial(colors.arm));
        leftArm.position.set(-1.8, 1.0, 0);
        leftArm.castShadow = true;
        robot.add(leftArm);
        meshes.push(leftArm);
        
        // Right arm
        const rightArm = new THREE.Mesh(armGeom, createMaterial(colors.arm));
        rightArm.position.set(1.8, 1.0, 0);
        rightArm.castShadow = true;
        robot.add(rightArm);
        meshes.push(rightArm);
        
        // Left hand
        const handGeom = new THREE.BoxGeometry(0.5, 0.5, 0.4);
        const leftHand = new THREE.Mesh(handGeom, createMaterial(colors.hand));
        leftHand.position.set(-2.45, 1.0, 0);
        leftHand.castShadow = true;
        robot.add(leftHand);
        meshes.push(leftHand);
        
        // Right hand
        const rightHand = new THREE.Mesh(handGeom, createMaterial(colors.hand));
        rightHand.position.set(2.45, 1.0, 0);
        rightHand.castShadow = true;
        robot.add(rightHand);
        meshes.push(rightHand);
        
        // Left leg
        const legGeom = new THREE.BoxGeometry(0.9, 1.8, 0.7);
        const leftLeg = new THREE.Mesh(legGeom, createMaterial(colors.legLeft));
        leftLeg.position.set(-0.55, -1.2, 0);
        leftLeg.castShadow = true;
        robot.add(leftLeg);
        meshes.push(leftLeg);
        
        // Right leg
        const rightLeg = new THREE.Mesh(legGeom, createMaterial(colors.legRight));
        rightLeg.position.set(0.55, -1.2, 0);
        rightLeg.castShadow = true;
        robot.add(rightLeg);
        meshes.push(rightLeg);
        
        // Left foot
        const footGeom = new THREE.BoxGeometry(1.0, 0.4, 0.8);
        const leftFoot = new THREE.Mesh(footGeom, createMaterial(colors.foot));
        leftFoot.position.set(-0.55, -2.3, 0);
        leftFoot.castShadow = true;
        robot.add(leftFoot);
        meshes.push(leftFoot);
        
        // Right foot
        const rightFoot = new THREE.Mesh(footGeom, createMaterial(colors.foot));
        rightFoot.position.set(0.55, -2.3, 0);
        rightFoot.castShadow = true;
        robot.add(rightFoot);
        meshes.push(rightFoot);
        
        // Center the robot
        robot.position.y = 0.5;
        
        return robot;
    }
};

