import * as THREE from 'three';

export const dogModel = {
    id: 'dog',
    name: 'White Dog',
    icon: '🐕',
    type: 'Character',
    description: 'A cute fluffy white dog with orange patches',
    partCount: 22,
    
    create(meshes) {
        const dog = new THREE.Group();
        
        // Colors matching the plush toy
        const colors = {
            body: 0xf5f0e8,       // Off-white/cream body
            bodyLight: 0xfaf8f5,   // Lighter cream for belly
            nose: 0x1a1a1a,        // Black nose
            patch: 0xc97a45,       // Orange/brown patches
            patchDark: 0xa86232,   // Darker orange for tail
            tongue: 0xe8a0a0,      // Pink tongue
            eyeSpot: 0xc97a45      // Orange eye patch
        };
        
        // Material factory with slight roughness for fluffy look
        const createMaterial = (color) => new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.85,
            metalness: 0.0
        });
        
        // ===== BODY =====
        // Main body (chubby rounded shape)
        const bodyGeom = new THREE.SphereGeometry(1.2, 32, 32);
        bodyGeom.scale(1, 1.1, 0.9);
        const body = new THREE.Mesh(bodyGeom, createMaterial(colors.body));
        body.position.set(0, 0, 0);
        body.castShadow = true;
        dog.add(body);
        meshes.push(body);
        
        // Belly (lighter front)
        const bellyGeom = new THREE.SphereGeometry(0.9, 32, 32);
        bellyGeom.scale(0.85, 0.95, 0.5);
        const belly = new THREE.Mesh(bellyGeom, createMaterial(colors.bodyLight));
        belly.position.set(0, -0.1, 0.5);
        belly.castShadow = true;
        dog.add(belly);
        meshes.push(belly);
        
        // Back patch (orange)
        const backPatchGeom = new THREE.SphereGeometry(0.7, 32, 32);
        backPatchGeom.scale(1.1, 0.9, 0.4);
        const backPatch = new THREE.Mesh(backPatchGeom, createMaterial(colors.patch));
        backPatch.position.set(0, 0.1, -0.75);
        backPatch.castShadow = true;
        dog.add(backPatch);
        meshes.push(backPatch);
        
        // ===== HEAD =====
        // Main head
        const headGeom = new THREE.SphereGeometry(0.85, 32, 32);
        headGeom.scale(1, 0.95, 0.9);
        const head = new THREE.Mesh(headGeom, createMaterial(colors.body));
        head.position.set(0, 1.6, 0.2);
        head.castShadow = true;
        dog.add(head);
        meshes.push(head);
        
        // Snout/muzzle
        const snoutGeom = new THREE.SphereGeometry(0.4, 32, 32);
        snoutGeom.scale(0.9, 0.7, 0.8);
        const snout = new THREE.Mesh(snoutGeom, createMaterial(colors.bodyLight));
        snout.position.set(0, 1.4, 0.75);
        snout.castShadow = true;
        dog.add(snout);
        meshes.push(snout);
        
        // Nose (black)
        const noseGeom = new THREE.SphereGeometry(0.15, 16, 16);
        noseGeom.scale(1.2, 0.9, 0.8);
        const nose = new THREE.Mesh(noseGeom, createMaterial(colors.nose));
        nose.position.set(0, 1.5, 1.0);
        nose.castShadow = true;
        dog.add(nose);
        meshes.push(nose);
        
        // Orange patch near left eye
        const eyePatchGeom = new THREE.SphereGeometry(0.18, 16, 16);
        eyePatchGeom.scale(1.2, 1.5, 0.5);
        const eyePatch = new THREE.Mesh(eyePatchGeom, createMaterial(colors.eyeSpot));
        eyePatch.position.set(-0.35, 1.75, 0.65);
        eyePatch.rotation.z = 0.3;
        eyePatch.castShadow = true;
        dog.add(eyePatch);
        meshes.push(eyePatch);
        
        // Left eye
        const eyeGeom = new THREE.SphereGeometry(0.08, 16, 16);
        const leftEye = new THREE.Mesh(eyeGeom, createMaterial(colors.nose));
        leftEye.position.set(-0.3, 1.7, 0.75);
        leftEye.castShadow = true;
        dog.add(leftEye);
        meshes.push(leftEye);
        
        // Right eye
        const rightEye = new THREE.Mesh(eyeGeom, createMaterial(colors.nose));
        rightEye.position.set(0.3, 1.7, 0.75);
        rightEye.castShadow = true;
        dog.add(rightEye);
        meshes.push(rightEye);
        
        // Tongue (little pink showing)
        const tongueGeom = new THREE.SphereGeometry(0.08, 16, 16);
        tongueGeom.scale(0.8, 0.5, 1);
        const tongue = new THREE.Mesh(tongueGeom, createMaterial(colors.tongue));
        tongue.position.set(0, 1.28, 0.85);
        tongue.castShadow = true;
        dog.add(tongue);
        meshes.push(tongue);
        
        // ===== EARS =====
        // Left ear
        const earGeom = new THREE.SphereGeometry(0.3, 16, 16);
        earGeom.scale(0.7, 1.2, 0.5);
        const leftEar = new THREE.Mesh(earGeom, createMaterial(colors.body));
        leftEar.position.set(-0.55, 2.2, 0.1);
        leftEar.rotation.z = 0.4;
        leftEar.castShadow = true;
        dog.add(leftEar);
        meshes.push(leftEar);
        
        // Right ear
        const rightEar = new THREE.Mesh(earGeom.clone(), createMaterial(colors.body));
        rightEar.position.set(0.55, 2.2, 0.1);
        rightEar.rotation.z = -0.4;
        rightEar.castShadow = true;
        dog.add(rightEar);
        meshes.push(rightEar);
        
        // ===== ARMS =====
        // Left arm
        const armGeom = new THREE.CapsuleGeometry(0.22, 0.5, 8, 16);
        const leftArm = new THREE.Mesh(armGeom, createMaterial(colors.body));
        leftArm.position.set(-0.95, 0.1, 0.3);
        leftArm.rotation.z = 0.5;
        leftArm.rotation.x = -0.2;
        leftArm.castShadow = true;
        dog.add(leftArm);
        meshes.push(leftArm);
        
        // Right arm
        const rightArm = new THREE.Mesh(armGeom.clone(), createMaterial(colors.body));
        rightArm.position.set(0.95, 0.1, 0.3);
        rightArm.rotation.z = -0.5;
        rightArm.rotation.x = -0.2;
        rightArm.castShadow = true;
        dog.add(rightArm);
        meshes.push(rightArm);
        
        // ===== LEGS =====
        // Left leg
        const legGeom = new THREE.CapsuleGeometry(0.28, 0.6, 8, 16);
        const leftLeg = new THREE.Mesh(legGeom, createMaterial(colors.body));
        leftLeg.position.set(-0.5, -1.0, 0.1);
        leftLeg.rotation.x = 0.1;
        leftLeg.castShadow = true;
        dog.add(leftLeg);
        meshes.push(leftLeg);
        
        // Right leg
        const rightLeg = new THREE.Mesh(legGeom.clone(), createMaterial(colors.body));
        rightLeg.position.set(0.5, -1.0, 0.1);
        rightLeg.rotation.x = 0.1;
        rightLeg.castShadow = true;
        dog.add(rightLeg);
        meshes.push(rightLeg);
        
        // ===== FEET with paw pads =====
        // Left foot
        const footGeom = new THREE.SphereGeometry(0.25, 16, 16);
        footGeom.scale(1.1, 0.6, 1.3);
        const leftFoot = new THREE.Mesh(footGeom, createMaterial(colors.body));
        leftFoot.position.set(-0.5, -1.55, 0.2);
        leftFoot.castShadow = true;
        dog.add(leftFoot);
        meshes.push(leftFoot);
        
        // Left paw pad (orange)
        const pawPadGeom = new THREE.SphereGeometry(0.12, 16, 16);
        pawPadGeom.scale(1, 0.5, 1.2);
        const leftPawPad = new THREE.Mesh(pawPadGeom, createMaterial(colors.patch));
        leftPawPad.position.set(-0.5, -1.6, 0.35);
        leftPawPad.castShadow = true;
        dog.add(leftPawPad);
        meshes.push(leftPawPad);
        
        // Right foot
        const rightFoot = new THREE.Mesh(footGeom.clone(), createMaterial(colors.body));
        rightFoot.position.set(0.5, -1.55, 0.2);
        rightFoot.castShadow = true;
        dog.add(rightFoot);
        meshes.push(rightFoot);
        
        // Right paw pad (orange)
        const rightPawPad = new THREE.Mesh(pawPadGeom.clone(), createMaterial(colors.patch));
        rightPawPad.position.set(0.5, -1.6, 0.35);
        rightPawPad.castShadow = true;
        dog.add(rightPawPad);
        meshes.push(rightPawPad);
        
        // ===== TAIL =====
        // Tail (orange/brown)
        const tailGeom = new THREE.CapsuleGeometry(0.18, 0.5, 8, 16);
        const tail = new THREE.Mesh(tailGeom, createMaterial(colors.patchDark));
        tail.position.set(0, -0.3, -1.0);
        tail.rotation.x = -0.8;
        tail.rotation.z = 0.15;
        tail.castShadow = true;
        dog.add(tail);
        meshes.push(tail);
        
        // Tail tip
        const tailTipGeom = new THREE.SphereGeometry(0.15, 16, 16);
        const tailTip = new THREE.Mesh(tailTipGeom, createMaterial(colors.patchDark));
        tailTip.position.set(0.05, -0.1, -1.35);
        tailTip.castShadow = true;
        dog.add(tailTip);
        meshes.push(tailTip);
        
        // Position the whole dog
        dog.position.y = 1.0;
        
        return dog;
    }
};

