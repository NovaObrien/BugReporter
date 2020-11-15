<template>
  <div class="container-fluid">
    <BugComponent v-for="bug in bugs" :key="bug._id" :bug-prop="bug" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugService } from '../services/bugService'
export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      bugService.getAllBugs()
    })
    return {
      profile: computed(() => AppState.profile),
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
