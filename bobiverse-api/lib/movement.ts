import clamp from 'lodash/clamp'

export function viableRange(coord: number): Array<number> {
  return [clamp(coord - 1, -10, 10), coord, clamp(coord + 1, -10, 10)]
}

// export function isViableDestination(
//   location: Coordinates | null,
//   destination: Coordinates
// ): boolean {
//   if (!location) return true
//   if (
//     viableRange(location.x).includes(destination.x) &&
//     viableRange(location.y).includes(destination.y) &&
//     viableRange(location.z).includes(destination.z)
//   ) {
//     return true
//   }
//   return false
// }
