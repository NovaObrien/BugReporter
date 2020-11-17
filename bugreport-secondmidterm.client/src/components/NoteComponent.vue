<template>
  <div class="NoteComponent col-12 p-3 bg-light">
    <div class="row p-2 bg-light mb-3">
      {{ note.reportedBy }}
      <textarea
        class="col-12 rounded note-description border-0 bg-warning text-light"
        rows="5"
        v-model="note.content"
        @change="editNote(note)"
      ></textarea>

      <div class="col-2 text-center">
        <span @click="deleteNote(note)">
          <i class="fa fa-trash text-danger" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { noteService } from '../services/NoteService'
import { useRoute } from 'vue-router'

export default {
  name: 'NoteComponent',
  props: {
    noteProp: {
      type: Object,
      default: () => {
        alert('this note does not exist')
      }
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      title: '',
      newTask: {}
    })
    return {
      state,
      // profile: computed(() => AppState.profile),
      note: computed(() => props.noteProp),
      editNote: (note) => {
        noteService.editNote(route.params.id, note)
      },
      deleteNote: (note) => {
        noteService.deleteNote(route.params.id, note)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>

// "description": "aerhaetraetj",
// "_id": "5fac3fd1f1d8715434c595a2",
// "title": "someNewTitle",
// "creatorId": "13d64a3f-2dec-40c9-9653-19bb5699ea41",
// "createdAt": "2020-11-11T19:47:29.276Z",
// "updatedAt": "2020-11-11T22:11:52.581Z",
// "__v": 0,
// "id": "5fac3fd1f1d8715434c595a2"
