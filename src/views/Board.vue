<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />
      <div class="column flex">
        <input
          class="p-2 mr-2 flex-grow"
          placeholder="New Column Name"
          type="text"
          v-model="newColumnnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn.vue'

export default {
  components: {
    BoardColumn
  },
  data() {
    return {
      newColumnnName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task'
    }
  },
  methods: {
    close() {
      this.$router.push({ name: 'board' })
    },

    createColumn() {
      this.$store.commit('CREATE_COLUMN', { name: this.newColumnnName })

      this.newColumnnName = ''
    }
  }
}
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}
.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
