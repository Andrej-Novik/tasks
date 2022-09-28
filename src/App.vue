<template>
  <div :class="$style.wrapper">
    <nav :class="$style.boards">
      <li
        v-for="board in $store.state.boards"
        :key="board.id"
        @click="$store.commit('setOpenedBoard', board.boardName)"
        :class="{
          [$style.activeBoard]: board.boardName === $store.state.openedBoard,
        }"
      >
        {{ board.boardName }}
      </li>
    </nav>
    <main :class="$style.content">
      <div :class="$style.lists" v-if="$store.state.openedBoard">
        <div
          v-for="list in getLists"
          :key="list.id"
          :class="$style.list"
          @drop="onDrop($event, list.listName)"
          @dragover.prevent
          @dragenter.prevent
        >
          <p>{{ list.listName }}</p>
          <div
            v-for="task in getTasks.filter((i) => i.listName === list.listName)"
            :key="task.id"
            :class="$style.task"
            @dragstart="onDragStart($event, task)"
            draggable="true"
          >
            {{ task.name }}
          </div>
        </div>
      </div>
      <p v-else :class="$style.choose">Выберите доску</p>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    getLists() {
      return this.$store.state.lists.filter(
        (list) => list.boardName === this.$store.state.openedBoard
      );
    },
    getTasks() {
      return this.$store.state.tasks.filter(
        (task) => task.boardName === this.$store.state.openedBoard
      );
    },
  },
  methods: {
    onDragStart(e, task) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("taskId", task.id);
    },
    onDrop(e, listName) {
      const taskId = e.dataTransfer.getData("taskId");
      this.$store.commit("dropTask", { taskId, listName });
    },
  },
};
</script>

<style lang="scss" module>
body {
  padding: 0;
  margin: 0;
}
.wrapper {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 4fr;
  .boards {
    background-color: #f3f3f3;
    height: 100%;
    color: grey;
    padding: 4rem 0 0 0;
    li {
      text-align: center;
      margin: 0 0 2rem 0;
      list-style-type: none;
      cursor: pointer;
    }
    .activeBoard {
      color: black;
    }
  }
  .content {
    height: 100%;
    background-color: #b5b1b1;
    .lists {
      display: flex;
      height: 100%;
      .list {
        width: 15rem;
        height: 100%;
        padding: 1rem;
        text-align: center;
        border-right: 1px solid #000;
        .task {
          cursor: pointer;
          background-color: #f3f3f3;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 1.5rem;
          border-radius: 0.5rem;
        }
      }
    }
    .choose {
      text-align: center;
      padding: 4rem 0 0 0;
      font-size: 1.5rem;
    }
  }
}
</style>
