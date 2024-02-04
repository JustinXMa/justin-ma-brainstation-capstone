import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Block({ position, onClick }) {
    const ref = useRef();

    useFrame(() => {

    });

    return (
        <mesh
            ref={ref}
            position={position}
            onClick={(event) => onClick(event, ref)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={'#359700'} />
        </mesh>
    );
};