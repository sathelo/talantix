<template>
  <section class="card">
    <h1 class="card__title">{{ post.title }}</h1>
    <p class="card__description">{{ post.description }}</p>
    <span v-if="post.author" class="card__author">{{ post.author }}</span>
  </section>
</template>

<script setup lang="ts">
import { TPostCard } from "@/types";

interface IProps {
  post: TPostCard;
}

defineProps<IProps>();
</script>

<style lang="scss" scoped>
.card {
  background: var(--text-white);
  border: 1px solid var(--text-gray-lighten);
  padding: 20px;
  page-break-inside: avoid;
  break-inside: avoid;

  &__title {
    color: var(--text-primary);
    margin-bottom: 16px;
  }

  &:has(> &__author) &__description {
    margin-bottom: 24px;
  }

  &__author {
    color: var(--text-gray);
  }
}
</style>
