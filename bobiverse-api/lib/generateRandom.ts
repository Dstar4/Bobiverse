export function generateRandom(min = -10, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}