<template>
  <div class="BugComponent row border border-dark bg-primary">
    <div class="col">
      <div class="row">
        {{ bug.title }}
      </div>
      <div class="row">
        Reported By: {{ bug.createdBy }}
      </div>
      <div class="row">
        Status: {{ bug.status }}
      </div>
      <div class="row">
        <button class="btn btn-warning" @click="openBug(bug)">
          Notes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
// import { bugService } from '../services/bugService'
import router from '../router'

export default {
  name: 'BugComponent',
  props: {
    bugProp: {
      type: Object,
      default: () => {
        // alert('Found No Bug')
      }
    }
  },
  setup(props) {
    return {
      bug: computed(() => props.bugProp),
      openBug(bug) {
        router.push({ name: 'Bug', params: { id: bug._id } })
        // bugService.openBug(bug)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
