<template>
    <p class="list-category">{{ listTypeTitle }}</p>

    <div class="list-display">
      <draggable
        :id="listTypeGroup"
        :list="listsCollection"
        item-key="id"
        :group="{ name: listTypeGroup, clone: false, put: true }"
        @start="onStart"
        @end="onEnd"
        @change="onChange($event, listTypeGroup)"
      >
        <template #item="{ element }">
            <list
              :id="element.id"
              :title="element.title"
              :complete="element.complete"
              :subtasks="element.subtasks"
              @state-change="handleStateChange"
              @subtask-state-change="handleSubtaskStateChange"
              @add-subtask="handleAddSubtask"
            />
        </template>
      </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapGetters, mapActions } from 'vuex';
import List from '@/components/List.vue';

export default {
  name: 'lists-display',
  components: {
    List,
    draggable,
  },
  data() {
    return {
      drag: false,
    };
  },
  props: {
    listType: {
      type: String,
      default: 'active',
    },
  },
  computed: {
    ...mapGetters(['getListsActive', 'getListsDone']),
    listsCollection() {
      return (this.listType === 'active')
        ? this.getListsActive
        : this.getListsDone;
    },
    listTypeTitle() {
      return (this.listType === 'active')
        ? 'ToDo'
        : 'Done';
    },
    listTypeGroup() {
      return (this.listType === 'active')
        ? 'active'
        : 'done';
    },
  },
  methods: {
    ...mapActions([
      'markListAsDone',
      'markListAsActive',
      'updateListStatus',
      'addSubtask',
      'toggleSubtaskState',
    ]),
    handleStateChange(data) {
      if (data.listActive === true) {
        this.markListAsDone(data.listId);
      } else {
        this.markListAsActive(data.listId);
      }
    },
    handleAddSubtask(listId) {
      this.addSubtask(listId);
    },
    handleSubtaskStateChange(subtaskData) {
      this.toggleSubtaskState(subtaskData);
    },
    onStart() {
      this.dragging = true;
    },
    onEnd() {
      this.dragging = false;
    },
    /**
     * Catch the change event and modify a list that's been moved across
     * so that the 'complete' value is always correct
     */
    onChange(data, targetType) {
      if (data.added) {
        this.updateListStatus({
          listId: data.added.element.id,
          listTypeTarget: targetType,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-category {
    color: $color-text;
    font-size: 1.6rem;
}
</style>
