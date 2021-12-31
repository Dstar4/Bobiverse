import {generateRandom} from './generateRandom'

export const defaultCoordinates = {x: 2, z: 0, y: 2}

export const randomCoordinates = () => {
  return {
    x: generateRandom(),
    y: generateRandom(),
    z: generateRandom(),
  }
}
