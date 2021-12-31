export interface Bob {
  id: number
  name: string
  user_id: number
  created_at: Date
  updated_at: Date
  minerals: null
  location_id: number
  coordinates: Coordinates
  location: Location
  drones: Drone[]
}

export interface Coordinates {
  x: number
  y: number
  z: number
}

export interface Drone {
  id: number
  bob_id: number
  size: string
  job_complete_at: string | null
  created_at: Date
  updated_at: Date
  target_id: null | number
  coordinates: Coordinates
  deployed: boolean
  location_id: number
}

export interface Location {
  id: number
  system: string
  created_at: Date
  updated_at: Date
}

export interface Mineral {
  id: number
  payload: number
  created_at: string
  updated_at: string
  location_id: number
  coordinates: Coordinates
}
