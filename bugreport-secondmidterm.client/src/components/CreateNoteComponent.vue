<template>
  <div class="CreateNoteComponent p-3">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#createNote"
    >
      Post Note
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="createNote"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form class="form-group" @submit.prevent="createNote()">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitle">
                Create a note...
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </span>
              </button>
            </div>

            <textarea
              class="form-control rounded-0 mt-3"
              rows="15"
              name=""
              id=""
              v-model="state.newNote.content"
              placeholder="Add a Note.."
            />
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Create!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { noteService } from '../services/NoteService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  name: 'CreateNoteComponent',
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      bug: computed(() => AppState.bug),
      createNote() {
        state.newNote.bugId = route.params.id
        state.newNote.reportedBy = AppState.user.name
        noteService.createNote(state.newNote)
        state.newNote = {}
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
