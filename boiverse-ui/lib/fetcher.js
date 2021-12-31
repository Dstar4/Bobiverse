import axios from 'axios'

export const fetcher = url => {
  const cookie = document.cookie
  const token = cookie
    .split('; ')
    .find(row => row.startsWith('bobiverse-token='))
    .split('=')[1]
    .replace(/%20/g, ' ')

  return axios.request({
    url: url,
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
}
