<template>
    <div class="header-section">
        <div class="header-section__logo">
            <img
                src="@/assets/images/logo.svg"
                class="header-section__logo__image"
                alt="Todo logo"
            >
        </div>

        <div class="header-section__add-list">
            <add-new-list
                class="input-component"
                @add-new-list="handleAddNewList"
            />
        </div>

        <div class="header-section__spacer"/>
    </div>
</template>

<script>
import AddNewList from '@/components/AddNewList.vue';

export default {
  name: 'header-section',
  components: {
    AddNewList,
  },
  methods: {
    handleAddNewList(listName) {
      this.$store.dispatch('addList', listName);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-section {
    display: flex;
    flex-direction: row;
    background-color: $color-grey1;
    height: 23.5rem;
    width: 100%;

    @media (max-width: $tablet) {
        flex-direction: column;
    }

    &__logo {
        flex: 1;
        box-sizing: border-box;

        &__image {
            margin: 4.8rem 0 0 5.3rem;
            width: 15.8rem;

            @media (max-width: $mobile) {
                margin: 2.4rem 0 0 2.65rem;
            }
        }
    }

    &__add-list {
        flex: 3;
        text-align: center;
        display: flex;
        justify-content: center;
        padding-bottom: 4.9rem;

        .input-component {
            align-self: flex-end;
        }
    }

    &__spacer {
        flex: 1;

        @media (max-width: $tablet) {
            display: none;
        }
    }
}
</style>
