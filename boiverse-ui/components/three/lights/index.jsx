import React from 'react'

export default () => {
  const FakeSphere = () => {
    return (
      <mesh>
        <sphereBufferGeometry args={[0.5, 30, 30]} attach="geometry" />
        <meshBasicMaterial color={'orange'} attach="material" />
      </mesh>
    )
  }

  return (
    <group>
      <FakeSphere />
      <ambientLight intensity={0.2} />
      <pointLight intensity={1.12} position={[0, 0, 0]} />
    </group>
  )
}
