import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { useState } from 'react'
import { Vector3 } from 'three'

export default function WebARDemo() {
  const [billboards, setBillboards] = useState<{position: Vector3, content: string}[]>([])

  const handleClick = (e: any) => {
    const newBillboard = {
      position: e.point,
      content: `Billboard ${billboards.length + 1}`
    };
    setBillboards([...billboards, newBillboard]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }} onClick={handleClick}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {billboards.map((billboard, i) => (
          <mesh key={i} position={billboard.position}>
            <boxGeometry args={[2, 1, 0.1]} />
            <meshStandardMaterial color="#3498db" />
            <Text position={[0, 0, 0.06]} fontSize={0.2} color="#fff">
              {billboard.content}
            </Text>
          </mesh>
        ))}
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
