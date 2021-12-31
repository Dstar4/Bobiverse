import useSWR from 'swr'
import {bobsUrl} from '../constants'

export function useScan(bobId: number) {
  console.log('SCANNING', bobId)
  return useSWR(`${bobsUrl}/${bobId}/scan`)
}
