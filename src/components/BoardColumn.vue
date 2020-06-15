<template>
  <BaseDrop @drop="moveTaskorColumn">
    <BaseDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: 'columnIndex'
      }"
    >
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>
      <div class="list-reset">
        <ColumnTask
          :task="task"
          :taskIndex="$taskIndex"
          :columnIndex="columnIndex"
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :column="column"
          :board="board"
        />

        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter a new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </BaseDrag>
  </BaseDrop>
</template>

<script>
import ColumnTask from '@/components/ColumnTask.vue'
import BaseDrag from '@/components/BaseDrag.vue'
import BaseDrop from '@/components/BaseDrop.vue'
import ColumnTaskMixin from '@/mixins/ColumnTaskMixin.js'

export default {
  mixins: [ColumnTaskMixin],
  components: {
    ColumnTask,
    BaseDrag,
    BaseDrop
  },
  methods: {
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    }
  }
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
