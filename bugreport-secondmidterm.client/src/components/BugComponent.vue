<template>
  <div class="BugComponent row border border-dark " :class=" bug.closed == true ? 'bg-success': 'bg-primary'">
    <div class="col">
      <input
        class="mb-3 bug-title form-control row border-dark font-weight-bolder font-italic"
        :class=" bug.closed == true ? 'bg-success': 'bg-primary'"
        type="text"
        v-model="bug.title"
        @change="editBug(bug)"
      />
      <!-- {{ bug.title }} -->

      <div class="row">
        <div class="col">
          Reported By: {{ bug.createdBy }}
        </div>
        <div class="col">
          Last edited on: {{ bug.updatedAt }}
        </div>
      </div>
      <div class="row">
        <div class="col">
          Status: {{ bug.status }}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button class="btn btn-warning" @click="openBug(bug)">
            Notes
          </button>
        </div>
        <div class="col">
          <button class="btn btn-danger" @click="setCloseStatus(bug)">
            Close/Unclose
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { bugService } from '../services/bugService'
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
        bugService.openBug(bug)
      },
      editBug: (bug) => {
        bugService.editBug(bug)
      },
      setCloseStatus(bug) {
        bugService.setCloseStatus(bug)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
