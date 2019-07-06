import config from './config'

const { apiKey } = config
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=colombia&api_key=${apiKey}&format=json`

export function getArtists () {
  return fetch(URL)
    .then(res => res.json())
    .then(json => json.topartists.artist)
}