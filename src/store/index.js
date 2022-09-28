import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default createStore({
  state: {
    openedBoard: localStorage.getItem("openedBoard") || null,
    boards: [
      {
        id: uuidv4(),
        boardName: "Board 1",
      },
      {
        id: uuidv4(),
        boardName: "Board 2",
      },
    ],
    lists: [
      {
        id: uuidv4(),
        listName: "ToDo",
        boardName: "Board 1",
      },
      {
        id: uuidv4(),
        listName: "In Progress",
        boardName: "Board 1",
      },
      {
        id: uuidv4(),
        listName: "ToDo",
        boardName: "Board 2",
      },
      {
        id: uuidv4(),
        listName: "In Progress",
        boardName: "Board 2",
      },
    ],
    tasks: [
      {
        id: uuidv4(),
        name: "Task 1",
        listName: "ToDo",
        boardName: "Board 1",
      },
      {
        id: uuidv4(),
        name: "Task 2",
        listName: "In Progress",
        boardName: "Board 1",
      },
      {
        id: uuidv4(),
        name: "Task 3",
        listName: "ToDo",
        boardName: "Board 1",
      },
      {
        id: uuidv4(),
        name: "Task 2",
        listName: "ToDo",
        boardName: "Board 2",
      },
      {
        id: uuidv4(),
        name: "Task 1",
        listName: "In Progress",
        boardName: "Board 2",
      },
    ],
  },
  getters: {},
  mutations: {
    setOpenedBoard(state, boardName) {
      state.openedBoard = boardName;
      localStorage.setItem("openedBoard", state.openedBoard);
    },
    dropTask(state, { taskId, listName }) {
      console.log(taskId, listName);
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, listName: listName } : task
      );
    },
  },
  actions: {},
  modules: {},
});
