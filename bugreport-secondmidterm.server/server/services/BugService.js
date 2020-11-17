import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async postBug(reqBody) {
    try {
      return await dbContext.Bug.create(reqBody)
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async getAllBugs() {
    try {
      return await dbContext.Bug.find()
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async getBugById(bugId) {
    try {
      return await dbContext.Bug.findById(bugId)
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async editBugById(bugId, reqBody, currentUserId) {
    try {
      if (currentUserId !== reqBody.creatorId) {
        throw new BadRequest('Unauthorized Action')
      } else {
        return await dbContext.Bug.findByIdAndUpdate(bugId, reqBody, { new: true })
      }
    } catch (error) {
      throw new BadRequest(error)
    }
  }
}
export const bugService = new BugService()
