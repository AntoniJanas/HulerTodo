<template>
    <div class="input-container">
        <input
            class="input-container__text-input"
            type="text"
            placeholder="Enter new Todo..."
            v-model="listName"
        />

<!-- confirm disabled behaviour when there is no title, title is a duplicate etc. -->
        <button
            class="input-container__add-button"
            @click="addNewList"
        >
            <img
                src="@/assets/images/plus.svg"
                class="icon"
                alt="Plus sign icon"
            >
        </button>
    </div>
</template>

<script>
export default {
  name: 'add-new-list',
  data() {
    return {
      listName: '',
    };
  },
  methods: {
    addNewList() {
      this.$emit('addNewList', this.listName);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container{
    width: 90%;
    max-width: 86.5rem;
    height: 6.8rem;
    border-radius: $box-border-radius;
    background-color: $color-grey2;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1.1rem 0 3rem;

    @media (min-width: $mobile) and (max-width: $tablet) {
        width: 85%;
    }

    &__text-input {
        background-color: inherit;
        color: $color-text;
        font-size: 1.6rem;
        font-family: Poppins;
        border: none;
        width: 75%;

        &:focus-visible {
            outline: none;
        }
    }

    &__add-button {
        background-color: $color-primary;
        border: none;
        border-radius: 50%;
        width: 4.6rem;
        height: 4.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;

        .icon {
            width: 1.2rem;
            height: 1.2rem;
        }
    }
}
</style>
