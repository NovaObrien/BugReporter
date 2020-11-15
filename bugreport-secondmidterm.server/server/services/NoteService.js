import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async postNote(reqBody) {
    try {
      return await dbContext.Note.create(reqBody)
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async getAllNotes() {
    try {
      return await dbContext.Note.find()
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async getNoteById(noteId) {
    try {
      return await dbContext.Note.findById(noteId)
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async editNoteById(noteId, reqBody, currentUserId) {
    try {
      if (currentUserId !== reqBody.creatorId) {
        throw new BadRequest('Unauthorized Action')
      } else {
        return await dbContext.Note.findByIdAndUpdate(noteId, reqBody, { new: true })
      }
    } catch (error) {
      throw new BadRequest(error)
    }
  }

  async deleteNoteById(noteId, currentUserId) {
    try {
      return await dbContext.Note.findByIdAndDelete({ _id: noteId, creatorId: currentUserId })
    } catch (error) {
      throw new BadRequest(error)
    }
  }
}

export const noteService = new NoteService()
