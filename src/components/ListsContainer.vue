<template>
    <div class="container-wrapper">
        <div class="list-container">
            <div class="list-container__todo-lists">
                <lists-display
                    listType="active"
                />
            </div>

            <hr class="list-container__divider">

            <div class="list-container__done-lists">
                <lists-display
                    listType="done"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ListsDisplay from '@/components/ListsDisplay.vue';

export default {
  name: 'lists-container',
  components: {
    ListsDisplay,
  },
};
</script>

<style lang="scss" scoped>
.container-wrapper {
    height: 100%;
    width: 100%;
}

.list-container {
    background-color: $color-grey1;
    border-radius: $box-border-radius;
    width: 50%;
    max-width: 98.7rem;
    margin: 4.7rem auto;
    padding: 5rem;

    @media (max-width: $mobile) {
        width: 80%;
        padding: 1.5rem;
    }

    &__divider {
        height: 1px;
        background-color: $color-grey2;
        border: none;
        margin: 2.35rem 0 3.35rem;
    }
}
</style>
