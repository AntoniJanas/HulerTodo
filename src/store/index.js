import { createStore } from 'vuex';

/**
 * Mutation used to add a new active list
 */
const ADD_LIST = 'ADD_LIST';

/**
 * Mutation used to switch the list 'complete' status to true
 */
const MARK_LIST_AS_DONE = 'MARK_LIST_AS_DONE';

/**
 * Mutation used to switch the list 'complete' status false
 */
const MARK_LIST_AS_ACTIVE = 'MARK_LIST_AS_ACTIVE';

/**
 * Unlike markListAsDone and markListAsActive that will trigger
 * mutations specific to given collections of lists, this mutation
 * modifies a single list status regardless of where it's stored.
 * Used in conjunction with the draggable interface to ensure
 * that statuses are always correct
*/
const UPDATE_LIST_STATUS = 'UPDATE_LIST_STATUS';

/**
 * Mutation used to add a new subtask to an active list
 */
const ADD_SUBTASK = 'ADD_SUBTASK';

/**
 * Mutation used to toggle subtask 'complete' state
 */
const TOGGLE_SUBTASK_STATE = 'TOGGLE_SUBTASK_STATE';

export default createStore({
  state: {
    listsActive: [],
    listsDone: [],
  },
  mutations: {
    ADD_LIST(state, data) {
      state.listsActive.push(data);
    },
    ADD_SUBTASK(state, data) {
      const list = state.listsActive.find((activeList) => activeList.id === data.listId);
      list.subtasks.push(data.subtask);
    },
    MARK_LIST_AS_DONE(state, data) {
      const listToMove = state.listsActive.find((activeList) => activeList.id === data.listId);

      if (listToMove) {
        listToMove.complete = true;
        listToMove.id = data.maxIdValue;

        state.listsDone.push(listToMove);
        state.listsActive.splice(state.listsActive.indexOf(listToMove), 1);
      }
    },
    MARK_LIST_AS_ACTIVE(state, data) {
      const listToMove = state.listsDone.find((doneList) => doneList.id === data.listId);

      if (listToMove) {
        listToMove.complete = false;
        listToMove.id = data.maxIdValue;

        state.listsActive.push(listToMove);
        state.listsDone.splice(state.listsDone.indexOf(listToMove), 1);
      }
    },
    UPDATE_LIST_STATUS(state, data) {
      if (data.listTypeTarget === 'active') {
        const listToEdit = state.listsActive.find((activeList) => activeList.id === data.listId);
        listToEdit.complete = false;
      }

      if (data.listTypeTarget === 'done') {
        const listToEdit = state.listsDone.find((doneList) => doneList.id === data.listId);
        listToEdit.complete = true;
      }
    },
    TOGGLE_SUBTASK_STATE(state, data) {
      const list = state.listsActive.find((activeList) => activeList.id === data.listId);
      const subtaskToEdit = list.subtasks.find((subtask) => subtask.id === data.subtaskId);

      subtaskToEdit.complete = !subtaskToEdit.complete;
    },
  },
  actions: {
    addList({ commit }, payload) {
      let maxIdValue = 0;
      if (this.state.listsActive.length > 0) {
        maxIdValue = this.state.listsActive.reduce((previous, current) => (
          (previous.id > current.id) ? previous : current)).id + 1;
      }

      const newList = {
        id: maxIdValue,
        title: payload,
        complete: false,
        subtasks: [],
      };

      commit(ADD_LIST, newList);
    },
    addSubtask({ commit }, listId) {
      const listItem = this.state.listsActive.find((list) => list.id === listId);

      let maxIdValue = 0;
      if (listItem.subtasks.length > 0) {
        maxIdValue = listItem.subtasks.reduce((previous, current) => (
          (previous.id > current.id) ? previous : current)).id + 1;
      }

      const data = {
        subtask: {
          id: maxIdValue,
          subtask_title: '',
          complete: false,
        },
        listId,
      };

      commit(ADD_SUBTASK, data);
    },
    markListAsDone({ commit }, payload) {
      const data = {
        listId: payload,
        maxIdValue: this.getters.getMaxDoneId + 1,
      };
      commit(MARK_LIST_AS_DONE, data);
    },
    markListAsActive({ commit }, payload) {
      const data = {
        listId: payload,
        maxIdValue: this.getters.getMaxActiveId + 1,
      };

      commit(MARK_LIST_AS_ACTIVE, data);
    },
    updateListStatus({ commit }, payload) {
      commit(UPDATE_LIST_STATUS, payload);
    },
    toggleSubtaskState({ commit }, payload) {
      commit(TOGGLE_SUBTASK_STATE, payload);

      // Mark the list as done if there are no remaining subtasks
      const parentList = this.state.listsActive.find((list) => list.id === payload.listId);
      const subtaskCheck = parentList.subtasks.filter((subtask) => subtask.complete === false);

      if (subtaskCheck.length === 0) {
        const data = {
          listId: payload.listId,
          maxIdValue: this.getters.getMaxDoneId + 1,
        };

        commit(MARK_LIST_AS_DONE, data);
      }
    },
  },
  getters: {
    getListsActive: (state) => state.listsActive,
    getListsDone: (state) => state.listsDone,
    getMaxActiveId: (state) => ((state.listsActive.length > 0)
      ? state.listsActive.reduce((previous, current) => (
        (previous.id > current.id) ? previous : current)).id
      : 0),
    getMaxDoneId: (state) => ((state.listsDone.length > 0)
      ? state.listsDone.reduce((previous, current) => (
        (previous.id > current.id) ? previous : current)).id
      : 0),
  },
});
