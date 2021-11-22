<template>
    <div
        class="list"
        :class="{ 'list--done': completeState}"
    >
        <div class="list__handle">
            <img
                src="@/assets/images/handle.svg"
                class="list__handle__icon"
            />
        </div>

        <div
            class="list__details"
            :class="{ 'list__details--collapsed': completeState }"
        >
            <div class="list__details__title">
                <div class="title__main">
                    <div :class="{ 'title__main--done': completeState}">
                        {{title}}
                    </div>

                    <span
                        v-if="!completeState"
                        class="title__main__add-subtask"
                        @click="addSubtask"
                    >
                        + Add Subtask
                    </span>
                </div>

                <input
                    type="checkbox"
                    class="title__checkbox"
                    :class="{ 'title__checkbox--done': completeState }"
                    v-model="completeState"
                >
            </div>

            <div
                v-if="!completeState"
                class="list__details__subtasks"
                :class="{ 'list__details__subtasks--active': (subtasksCollection.length > 0)}"
            >
                <div
                    class="subtask"
                    v-for="subtask in subtasksCollection"
                    :key="subtask.id"
                >
                    <input
                        type="text"
                        class="subtask__title-input"
                        placeholder="Enter Subtask"
                        v-model="subtask.subtask_title"
                    >

                    <input
                        type="checkbox"
                        class="subtask__checkbox"
                        v-model="subtask.complete"
                        @input="handleSubtaskStateChange(subtask.id)"
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'list',
  computed: {
    completeState: {
      get() {
        return this.complete;
      },
      set() {
        this.handleListStateChange();
      },
    },
    subtasksCollection() {
      return this.subtasks;
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      required: true,
    },
    subtasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleListStateChange() {
      this.$emit('state-change', {
        listId: this.id,
        listActive: !this.completeState,
      });
    },
    handleSubtaskStateChange(subtaskId) {
      this.$emit('subtask-state-change', {
        listId: this.id,
        subtaskId,
      });
    },
    addSubtask() {
      this.$emit('add-subtask', this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
    background-color: $color-grey2;
    border-radius: $box-border-radius;
    min-height: 8rem;
    margin-bottom: 1.4rem;
    display: flex;

    &--done {
        background-color: rgba($color-grey2, 0.4);
    }

    &__handle {
        flex: 0 1 6.4rem;
        max-height: 8rem;
        display: flex;
        align-content: center;
        justify-content: center;

        &__icon {
            width: 1rem;
        }
    }

    &__details {
        flex: 1 2 78rem;
        color: $color-text;
        padding: 2rem 2.8rem 2rem 0;

        @media (max-width: $mobile) {
            padding: 2rem 1.8rem 2rem 0;
        }

        &--collapsed {
            padding-top: 2.8rem;
        }

        &__title {
            display: flex;
            justify-content: space-between;

            .title__main {
                font-size: 1.6rem;
                display: flex;
                flex-direction: column;
                line-height: 2.5rem;

                &--done {
                    text-decoration: line-through;
                }

                &__add-subtask {
                    font-size: 1.1rem;
                    color: rgba($color-text, 0.27);
                    line-height: 1.7rem;
                    font-weight: 600;
                    cursor: pointer;
                }
            }

            .title__checkbox {
                justify-self: flex-end;
                align-self: center;
                width: 2.8rem;
                height: 2.8rem;

                @include checkbox-behaviour;
                background-size: 1.275rem 100%;
            }
        }

        &__subtasks {
            &--active {
                margin-top: 1.5rem;
            }

            .subtask {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
                border-bottom: 1px solid rgba($color-borders, 0.19);

                &__title-input {
                    font-size: 1.2rem;
                    font-family: Poppins;
                    line-height: 1.8rem;
                    background-color: inherit;
                    border: none;
                    color: inherit;

                    &:focus-visible {
                        outline: none;
                    }
                }

                &__checkbox {
                    justify-self: flex-end;
                    width: 1.7rem;
                    height: 1.7rem;

                    @include checkbox-behaviour;
                    background-size: 0.765rem 100%;
                }
            }
        }
    }
}
</style>
