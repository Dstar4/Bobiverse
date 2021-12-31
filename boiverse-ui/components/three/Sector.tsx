import {Canvas} from 'react-three-fiber'
import Cube from './cubes'
import Environment from './environment'
import Lights from './lights'

interface propsType {
  scanCoords: number[][]
  bobsCoords: number[][]
  dronesCoords: number[][]
}

export function Sector({scanCoords, bobsCoords, dronesCoords}: propsType) {
  return (
    <Canvas style={{height: '400px'}}>
      <Cube minerals={scanCoords} bobs={bobsCoords} drones={dronesCoords} />
      <Lights />
      <Environment />
    </Canvas>
  )
}
