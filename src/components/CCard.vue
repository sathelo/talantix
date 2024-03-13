<template>
  <section class="card">
    <h1 class="card__title">{{ post.title }}</h1>
    <p class="card__description">{{ post.description }}</p>
    <span class="card__author">{{ post.author }}</span>
  </section>
</template>

<script setup lang="ts">
interface IProps {
  post: {
    title: string;
    description: string;
    author: string;
  };
}

defineProps<IProps>();
</script>

<style lang="scss" scoped></style>
