import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'

export class BugController extends BaseController {
  constructor() {
    super('api/bug')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllBugs)
      .post('', this.postBug)
      .put('/:bugId', this.editBugById)
      // .put('/:bugId', this.closeBugById)
  }

  async postBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugService.postBug(req.body))
    } catch (error) {
      logger.error('Failed to Post Bug on Backend Possible Error in Service')
      next(error)
    }
  }

  async getAllBugs(req, res, next) {
    try {
      res.send(await bugService.getAllBugs())
    } catch (error) {
      logger.error('Failed to Get All Bugs on Backend Possible Error in Service')
      next(error)
    }
  }

  async editBugById(req, res, next) {
    try {
      const currentUserId = req.userInfo.id
      res.send(await bugService.editBugById(req.params.bugId, req.body, currentUserId))
    } catch (error) {
      logger.error('Failed to Edit Bug By Id on Backend Possible Error in Service')
      next(error)
    }
  }

  // async closeBugById(req, res, next) {
  //   try {
  //     const currentUserId = req.userInfo.id
  //     res.send(await bugService.closeBugById(req.params.bugId, req.body, currentUserId))
  //   } catch (error) {
  //     logger.error('Failed to Edit Bug By Id on Backend Possible Error in Service')
  //     next(error)
  //   }
  // }
}
