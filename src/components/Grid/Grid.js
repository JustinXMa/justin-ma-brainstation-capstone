import React, { useState } from 'react';
import { Canvas, extend, useThree } from '@react-three/fiber';
import { Raycaster, Vector3 } from 'three';
import Block from '../Block/Block';
import Camera from '../Camera/Camera';
import { OrbitControls, PointerLockControls } from 'three-stdlib';

extend({ OrbitControls, PointerLockControls });

function CustomGrid({ handleClick }) {
    const [blocks, setBlocks] = useState([]);
    const raycaster = new Raycaster();
    const { camera } = useThree();
    const gridSize = 8;
    const gridStep = 1;

    const handleInternalClick = (event) => {
        raycaster.setFromCamera(
            { x: (event.clientX / window.innerWidth) * 2 - 1, y: -(event.clientY / window.innerHeight) * 2 + 1 },
            camera
        );

        const intersects = raycaster.intersectObjects(blocks.map((block) => block.mesh));

        if (intersects.length > 0) {
            const { x, y, z } = intersects[0].point;
            setBlocks((prevBlocks) => [...prevBlocks, { position: { x, y, z }, mesh: intersects[0].object }]);
            handleClick(event); // Call the handleClick function
        }
    };

    const createGrid = () => {
        const grid = [];

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const position = new Vector3(
                    j * gridStep - (gridSize / 2) * gridStep,
                    0,
                    i * gridStep - (gridSize / 2) * gridStep
                );

                const blockMesh = (
                    <mesh key={`${i}-${j}`} position={position} onClick={handleInternalClick}>
                        <Block />
                    </mesh>
                );

                grid.push(blockMesh);
            }
        }

        return grid;
    };

    return <>{createGrid()}</>;
}

export default function Grid() {
    const [worldBlocks, setWorldBlocks] = useState([]);
    const addBlock = (newBlock) => {
        console.log('Block added at position:', newBlock.position);
        // Here you can update your world state to include information about the new block
        // For example, if you have a state variable like 'worldBlocks', you can do something like:
        setWorldBlocks((prevWorldBlocks) => [...prevWorldBlocks, newBlock]);
    };

    return (
        <Canvas camera={{ position: [5, 5, 5] }}>
            <Camera />
            <CustomGrid handleClick={addBlock} />
            {worldBlocks.map((block, index) => (
                <Block key={index} position={block.position} />
            ))}
        </Canvas>
    );
}