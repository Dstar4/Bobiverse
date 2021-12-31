import {fetcher} from '../lib/fetcher'
import useSWR from 'swr'
import {bobsUrl} from '../constants'

export function useDrones(bobId: number) {
  return useSWR(`${bobsUrl}/${bobId}/drones`, fetcher)
}
