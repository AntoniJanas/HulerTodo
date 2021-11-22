<template>
  <div class="page-wrapper">
    <header-section/>
    <lists-container/>
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import ListsContainer from '@/components/ListsContainer.vue';

export default {
  name: 'app',
  components: {
    HeaderSection,
    ListsContainer,
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
    height: 100%;
    width: 100%;
    padding-bottom: 5rem;

    @media (max-width: $mobile) {
        padding-bottom: 1rem;
    }
}
</style>
