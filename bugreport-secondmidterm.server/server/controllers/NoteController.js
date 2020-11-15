import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'
import { logger } from '../utils/Logger'

export class NoteController extends BaseController {
  constructor() {
    super('api/bug/:id/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllNotes)
      .get('/:noteId', this.getNoteById)
      .post('', this.postNote)
      .put('/:noteId', this.editNoteById)
      .delete('/:noteId', this.deleteNoteById)
  }

  async postNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await noteService.postNote(req.body))
    } catch (error) {
      logger.error('Failed to Post Note on Backend Possible Error in Service')
      next(error)
    }
  }

  async getAllNotes(req, res, next) {
    try {
      res.send(await noteService.getAllNotes())
    } catch (error) {
      logger.error('Failed to Get All Notes on Backend Possible Error in Service')
      next(error)
    }
  }

  async getNoteById(req, res, next) {
    try {
      res.send(await noteService.getNoteById(req.params.noteId))
    } catch (error) {
      logger.error('Failed to Get All Notes on Backend Possible Error in Service')
      next(error)
    }
  }

  async editNoteById(req, res, next) {
    try {
      const currentUserId = req.userInfo.id
      res.send(await noteService.editNoteById(req.params.noteId, req.body, currentUserId))
    } catch (error) {
      logger.error('Failed to Edit Note By Id on Backend Possible Error in Service')
      next(error)
    }
  }

  async deleteNoteById(req, res, next) {
    try {
      const currentUserId = req.userInfo.id
      res.send(await noteService.deleteNoteById(req.params.noteId, currentUserId))
    } catch (error) {
      logger.error('Failed to Delete Note By Id on Backend Possible Error in Service')
      next(error)
    }
  }
  // TODO Make Sure Controller is setup correctly than Create Service
}
