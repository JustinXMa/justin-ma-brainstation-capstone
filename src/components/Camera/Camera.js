import React, { useRef, useEffect } from 'react';
import { useThree, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, PointerLockControls } from 'three-stdlib';
extend({ OrbitControls, PointerLockControls });

export default function CameraControls() {
    const { camera, gl } = useThree();
    const orbitControls = useRef();
    const pointerLockControls = useRef();

    useFrame(() => {
        if (pointerLockControls.current.isLocked) {
            pointerLockControls.current.update();
        } else {
            orbitControls.current.update();
        }
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                pointerLockControls.current.lock();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <orbitControls ref={orbitControls} args={[camera, gl.domElement]} />
            <pointerLockControls ref={pointerLockControls} args={[camera, gl.domElement]} />
        </>
    );
};