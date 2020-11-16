<template>
  <div class="Bug container-fluid">
    <CreateNoteComponent />
    <div class="row justify-content-around text-center">
      <NoteComponent v-for="note in notes" :key="note._id" :note-prop="note" />
    </div>
  </div>
</template>

<script>

import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
import { useRoute } from 'vue-router'

export default {
  name: 'Bug',
  setup() {
    const route = useRoute()
    onMounted(() => {
      noteService.getAllNotes(route.params.id)
    })
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes.filter(l => l.bugId === route.params.id))
    }
  }
  // components: { NoteComponent }
}
</script>

<style lang="scss" scoped>

</style>
