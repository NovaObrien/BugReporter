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

  async openBug(bug) {
    try {
      const res = await api.get('api/bug/' + bug._id)
      AppState.activeBug = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async createBug(newBug) {
    try {
      const res = await api.post('api/bug', newBug)
      AppState.bugs = [...AppState.bugs, res.data]
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async editBug(bug) {
    try {
      if (bug.closed === false) {
        const res = await api.put('api/bug/' + bug._id, bug)
        const index = AppState.bugs.findIndex(b => b.id === bug._id)
        AppState.bugs.splice(index, 1, bug)
        logger.log(res.data)
        this.getAllBugs()
      } else {
        alert('Task is closed. ReOpen to edit')
        this.getAllBugs()
      }
    } catch (error) {
      logger.error(error)
    }
  }

  async setCloseStatus(bug) {
    try {
      if (bug.closed === true) {
        bug.closed = false
        bug.status = 'Open'
      } else if (bug.closed === false) {
        bug.closed = true
        bug.status = 'Closed'
      }
      const res = await api.put('api/bug/' + bug._id, bug)
      const index = AppState.bugs.findIndex(b => b.id === bug._id)
      AppState.bugs.splice(index, 1, bug)
      logger.log(res.data)
      this.getAllBugs()
    } catch (error) {
      logger.error(error)
    }
  }
}
export const bugService = new BugService()
