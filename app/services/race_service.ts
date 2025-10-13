import axios from 'axios'
import { DateTime } from 'luxon'

export class RaceService {
  async getPCSResults(slug: string) {
    const res = await axios.get(`http://127.0.0.1:8001/race/${slug}`)
    return res.data
  }

  async getPCSStartlist(slug: string, year: string = DateTime.now().year.toString()) {
    const res = await axios.get(`http://127.0.0.1:8001/race/${slug}/${year}/startlist`)
    return res.data
  }
}
