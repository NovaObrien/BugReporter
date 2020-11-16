import { api } from '../services/AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
class NoteService {
  async getAllNotes(bugId) {
    try {
      const res = await api.get('api/bug/' + bugId + '/notes')
      AppState.notes = res.data
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async createNote(newNote) {
    try {
      const res = await api.post('api/bug/' + newNote.bugId + '/notes', newNote)
      AppState.notes = [...AppState.notes, res.data]
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async editNote(bugId, note) {
    try {
      const res = await api.put('api/bug/' + bugId + '/notes/' + note._id, note)
      const index = AppState.notes.findIndex(l => l._id === note._id)
      AppState.notes.splice(index, 1, note)
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteNote(bugId, note) {
    try {
      const res = await api.delete('api/bug/' + bugId + '/notes/' + note._id)
      const index = AppState.notes.findIndex(l => l._id === note._id)
      AppState.notes.splice(index, 1)
      logger.log(res.data)
    } catch (error) {
      logger.error(error)
    }
  }
}
export const noteService = new NoteService()
