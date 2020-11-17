<template>
  <div class="CreateBugComponent">
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#createBug"
    >
      <i class="fa fa-bug text-danger" aria-hidden="true"></i>
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="createBug"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalBug"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form class="form-group" @submit.prevent="createBug()">
            <div class="modal-header">
              <h5 class="modal-title" id="modalBug">
                Create a Bug...
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" v-model="state.newBug.title" placeholder="Bug title...">
              <textarea
                class="form-control rounded-0 mt-3"
                rows="15"
                name=""
                id=""
                aria-describedby="Body"
                v-model="state.newBug.description"
                placeholder="Bug description..."
              />
            </div>
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
import { reactive } from 'vue'
import { bugService } from '../services/bugService'
import { AppState } from '../AppState'
export default {
  name: 'CreateBugComponent',
  setup() {
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      createBug() {
        state.newBug.createdBy = AppState.user.name
        bugService.createBug(state.newBug)
        state.newBug = {}
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
