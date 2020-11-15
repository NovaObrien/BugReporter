<template>
  <div class="BugComponent bg-primary row border border-dark">
    <div class="col">
      <div class="row">
        {{ bug.title }}
      </div>
      <div class="row">
        Reported By: {{ bug.reportedBy }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
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
      bug: computed(() => props.bugProp)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
