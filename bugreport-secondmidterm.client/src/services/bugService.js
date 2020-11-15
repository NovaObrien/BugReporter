import { api } from '../services/AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
class BugService {
  async getAllBugs() {
    try {
      const res = await api.get('api/bug')
      AppState.bugs = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }
}
export const bugService = new BugService()
