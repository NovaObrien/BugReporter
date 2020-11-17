<template>
  <div class="Bug container-fluid bg-light">
    <CreateNoteComponent />
    <div class="row shadow-lg">
      {{ bug.title }}
    </div>
    <div class="row shadow-lg">
      reported by: {{ bug.createdBy }}
    </div>
    <div class="row shadow-lg">
      {{ bug.description }}
    </div>

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
  props: {
    bugProp: {
      type: Object,
      default: () => {
        // alert('Found No Bug')
      }
    }
  },
  setup(props) {
    const route = useRoute()
    onMounted(() => {
      noteService.getAllNotes(route.params.id)
      // TODO get bug by id
    })
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      bugId: computed(() => props.bugProp),
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes.filter(l => l.bugId === route.params.id))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
