import useSWR from 'swr'
import {bobsUrl} from '../constants'

export function useBobs() {
  return useSWR(bobsUrl)
}
