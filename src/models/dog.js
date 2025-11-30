import * as THREE from 'three';

export const dogModel = {
    id: 'dog',
    name: 'White Dog',
    icon: '🐕',
    type: 'Character',
    description: 'A cute fluffy white dog with orange patches',
    partCount: 28,
    
    create(meshes) {
        const dog = new THREE.Group();
        
        // Colors matching the plush toy
        const colors = {
            body: 0xf5f0e8,       // Off-white/cream body
            bodyLight: 0xfaf8f5,   // Lighter cream for belly
            nose: 0x1a1a1a,        // Black nose
            patch: 0xc97a45,       // Orange/brown patches
            patchDark: 0xb56a35,   // Darker orange for back patch
            tongue: 0xe8a0a0,      // Pink tongue
            whiskerDot: 0x2a2a2a   // Dark dots for whiskers
        };
        
        // Material factory with slight roughness for fluffy look
        const createMaterial = (color) => new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.85,
            metalness: 0.0
        });
        
        // ===== BODY (Rounded Rectangle shape) =====
        // Main body - using rounded box shape (BoxGeometry with beveled edges via CapsuleGeometry)
        const bodyGeom = new THREE.CapsuleGeometry(0.9, 1.0, 16, 32);
        bodyGeom.scale(1.1, 1, 0.85);
        const body = new THREE.Mesh(bodyGeom, createMaterial(colors.body));
        body.position.set(0, 0, 0);
        body.castShadow = true;
        dog.add(body);
        meshes.push(body);
        
        // Belly (lighter front area)
        const bellyGeom = new THREE.CapsuleGeometry(0.7, 0.6, 16, 32);
        bellyGeom.scale(0.9, 0.9, 0.5);
        const belly = new THREE.Mesh(bellyGeom, createMaterial(colors.bodyLight));
        belly.position.set(0, -0.1, 0.45);
        belly.castShadow = true;
        dog.add(belly);
        meshes.push(belly);
        
        // ===== LARGE BACK PATCH (Big brown oval on the back) =====
        const backPatchGeom = new THREE.SphereGeometry(0.65, 32, 32);
        backPatchGeom.scale(1.3, 1.1, 0.4);
        const backPatch = new THREE.Mesh(backPatchGeom, createMaterial(colors.patchDark));
        backPatch.position.set(0, -0.15, -0.65);
        backPatch.castShadow = true;
        dog.add(backPatch);
        meshes.push(backPatch);
        
        // ===== HEAD (Rounded rectangle shape) =====
        // Main head - more rounded box than sphere
        const headGeom = new THREE.CapsuleGeometry(0.55, 0.4, 16, 32);
        headGeom.scale(1.2, 1, 0.95);
        headGeom.rotateX(Math.PI / 2);
        const head = new THREE.Mesh(headGeom, createMaterial(colors.body));
        head.position.set(0, 1.55, 0.15);
        head.castShadow = true;
        dog.add(head);
        meshes.push(head);
        
        // Top of head (rounded)
        const headTopGeom = new THREE.SphereGeometry(0.6, 32, 32);
        headTopGeom.scale(1.1, 0.7, 0.9);
        const headTop = new THREE.Mesh(headTopGeom, createMaterial(colors.body));
        headTop.position.set(0, 1.85, 0.05);
        headTop.castShadow = true;
        dog.add(headTop);
        meshes.push(headTop);
        
        // Snout/muzzle (lighter cream)
        const snoutGeom = new THREE.SphereGeometry(0.35, 32, 32);
        snoutGeom.scale(1, 0.75, 0.9);
        const snout = new THREE.Mesh(snoutGeom, createMaterial(colors.bodyLight));
        snout.position.set(0, 1.35, 0.7);
        snout.castShadow = true;
        dog.add(snout);
        meshes.push(snout);
        
        // Nose (black)
        const noseGeom = new THREE.SphereGeometry(0.14, 16, 16);
        noseGeom.scale(1.3, 0.9, 0.7);
        const nose = new THREE.Mesh(noseGeom, createMaterial(colors.nose));
        nose.position.set(0, 1.45, 1.0);
        nose.castShadow = true;
        dog.add(nose);
        meshes.push(nose);
        
        // ===== BROWN EYE PATCH (Only on left side - dog's right eye) =====
        const eyePatchGeom = new THREE.SphereGeometry(0.18, 16, 16);
        eyePatchGeom.scale(1.0, 1.3, 0.6);
        const eyePatch = new THREE.Mesh(eyePatchGeom, createMaterial(colors.patch));
        eyePatch.position.set(-0.32, 1.65, 0.7);
        eyePatch.rotation.z = 0.2;
        eyePatch.castShadow = true;
        dog.add(eyePatch);
        meshes.push(eyePatch);
        
        // ===== EYES (Small black beads - pushed forward to be visible) =====
        const eyeGeom = new THREE.SphereGeometry(0.07, 16, 16);
        
        // Left eye (on the brown patch)
        const leftEye = new THREE.Mesh(eyeGeom, createMaterial(colors.nose));
        leftEye.position.set(-0.28, 1.62, 0.85);
        leftEye.castShadow = true;
        dog.add(leftEye);
        meshes.push(leftEye);
        
        // Right eye
        const rightEye = new THREE.Mesh(eyeGeom, createMaterial(colors.nose));
        rightEye.position.set(0.28, 1.62, 0.85);
        rightEye.castShadow = true;
        dog.add(rightEye);
        meshes.push(rightEye);
        
        // ===== WHISKER DOTS =====
        const whiskerDotGeom = new THREE.SphereGeometry(0.03, 8, 8);
        
        // Left side whisker dots (3 dots)
        const leftDot1 = new THREE.Mesh(whiskerDotGeom, createMaterial(colors.whiskerDot));
        leftDot1.position.set(-0.18, 1.28, 0.88);
        dog.add(leftDot1);
        meshes.push(leftDot1);
        
        const leftDot2 = new THREE.Mesh(whiskerDotGeom, createMaterial(colors.whiskerDot));
        leftDot2.position.set(-0.12, 1.25, 0.92);
        dog.add(leftDot2);
        meshes.push(leftDot2);
        
        const leftDot3 = new THREE.Mesh(whiskerDotGeom, createMaterial(colors.whiskerDot));
        leftDot3.position.set(-0.06, 1.23, 0.94);
        dog.add(leftDot3);
        meshes.push(leftDot3);
        
        // Right side whisker dots (3 dots)
        const rightDot1 = new THREE.Mesh(whiskerDotGeom, createMaterial(colors.whiskerDot));
        rightDot1.position.set(0.18, 1.28, 0.88);
        dog.add(rightDot1);
        meshes.push(rightDot1);
        
        const rightDot2 = new THREE.Mesh(whiskerDotGeom, createMaterial(colors.whiskerDot));
        rightDot2.position.set(0.12, 1.25, 0.92);
        dog.add(rightDot2);
        meshes.push(rightDot2);
        
        const rightDot3 = new THREE.Mesh(whiskerDotGeom, createMaterial(colors.whiskerDot));
        rightDot3.position.set(0.06, 1.23, 0.94);
        dog.add(rightDot3);
        meshes.push(rightDot3);
        
        // Tongue (little pink showing)
        const tongueGeom = new THREE.SphereGeometry(0.06, 16, 16);
        tongueGeom.scale(0.9, 0.5, 1);
        const tongue = new THREE.Mesh(tongueGeom, createMaterial(colors.tongue));
        tongue.position.set(0, 1.2, 0.9);
        tongue.castShadow = true;
        dog.add(tongue);
        meshes.push(tongue);
        
        // ===== EARS (Small rounded on top of head) =====
        const earGeom = new THREE.SphereGeometry(0.22, 16, 16);
        earGeom.scale(0.75, 1.1, 0.55);
        
        // Left ear
        const leftEar = new THREE.Mesh(earGeom, createMaterial(colors.body));
        leftEar.position.set(-0.5, 2.15, 0);
        leftEar.rotation.z = 0.35;
        leftEar.castShadow = true;
        dog.add(leftEar);
        meshes.push(leftEar);
        
        // Right ear
        const rightEar = new THREE.Mesh(earGeom.clone(), createMaterial(colors.body));
        rightEar.position.set(0.5, 2.15, 0);
        rightEar.rotation.z = -0.35;
        rightEar.castShadow = true;
        dog.add(rightEar);
        meshes.push(rightEar);
        
        // ===== ARMS (Longer arms) =====
        const armGeom = new THREE.CapsuleGeometry(0.16, 0.7, 8, 16);
        
        // Left arm
        const leftArm = new THREE.Mesh(armGeom, createMaterial(colors.body));
        leftArm.position.set(-1.0, 0.0, 0.25);
        leftArm.rotation.z = 0.5;
        leftArm.rotation.x = -0.1;
        leftArm.castShadow = true;
        dog.add(leftArm);
        meshes.push(leftArm);
        
        // Right arm
        const rightArm = new THREE.Mesh(armGeom.clone(), createMaterial(colors.body));
        rightArm.position.set(1.0, 0.0, 0.25);
        rightArm.rotation.z = -0.5;
        rightArm.rotation.x = -0.1;
        rightArm.castShadow = true;
        dog.add(rightArm);
        meshes.push(rightArm);
        
        // ===== LEGS (Longer legs) =====
        const legGeom = new THREE.CapsuleGeometry(0.2, 0.9, 8, 16);
        
        // Left leg
        const leftLeg = new THREE.Mesh(legGeom, createMaterial(colors.body));
        leftLeg.position.set(-0.4, -1.15, 0.15);
        leftLeg.rotation.x = 0.1;
        leftLeg.castShadow = true;
        dog.add(leftLeg);
        meshes.push(leftLeg);
        
        // Right leg
        const rightLeg = new THREE.Mesh(legGeom.clone(), createMaterial(colors.body));
        rightLeg.position.set(0.4, -1.15, 0.15);
        rightLeg.rotation.x = 0.1;
        rightLeg.castShadow = true;
        dog.add(rightLeg);
        meshes.push(rightLeg);
        
        // ===== FEET with paw pads =====
        const footGeom = new THREE.SphereGeometry(0.2, 16, 16);
        footGeom.scale(1.1, 0.65, 1.25);
        
        // Left foot
        const leftFoot = new THREE.Mesh(footGeom, createMaterial(colors.body));
        leftFoot.position.set(-0.4, -1.85, 0.22);
        leftFoot.castShadow = true;
        dog.add(leftFoot);
        meshes.push(leftFoot);
        
        // Left paw pad (small orange dot)
        const pawPadGeom = new THREE.SphereGeometry(0.08, 16, 16);
        pawPadGeom.scale(1, 0.5, 1.1);
        const leftPawPad = new THREE.Mesh(pawPadGeom, createMaterial(colors.patch));
        leftPawPad.position.set(-0.4, -1.9, 0.35);
        leftPawPad.castShadow = true;
        dog.add(leftPawPad);
        meshes.push(leftPawPad);
        
        // Right foot
        const rightFoot = new THREE.Mesh(footGeom.clone(), createMaterial(colors.body));
        rightFoot.position.set(0.4, -1.85, 0.22);
        rightFoot.castShadow = true;
        dog.add(rightFoot);
        meshes.push(rightFoot);
        
        // Right paw pad (small orange dot)
        const rightPawPad = new THREE.Mesh(pawPadGeom.clone(), createMaterial(colors.patch));
        rightPawPad.position.set(0.4, -1.9, 0.35);
        rightPawPad.castShadow = true;
        dog.add(rightPawPad);
        meshes.push(rightPawPad);
        
        // ===== TAIL (Brown/orange, hanging from back patch) =====
        const tailGeom = new THREE.CapsuleGeometry(0.14, 0.45, 8, 16);
        const tail = new THREE.Mesh(tailGeom, createMaterial(colors.patchDark));
        tail.position.set(0, -0.55, -0.85);
        tail.rotation.x = -0.5;
        tail.castShadow = true;
        dog.add(tail);
        meshes.push(tail);
        
        // Tail tip (rounder end)
        const tailTipGeom = new THREE.SphereGeometry(0.12, 16, 16);
        const tailTip = new THREE.Mesh(tailTipGeom, createMaterial(colors.patchDark));
        tailTip.position.set(0, -0.85, -1.05);
        tailTip.castShadow = true;
        dog.add(tailTip);
        meshes.push(tailTip);
        
        // Position the whole dog
        dog.position.y = 1.0;
        
        return dog;
    }
};
