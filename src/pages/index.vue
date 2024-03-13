<template>
  <section class="home container">
    <div class="home__search" />

    <div class="cards home__cards">
      <CCard
        v-for="(post, postIndex) in posts"
        :key="postIndex"
        :post="post"
        class="cards__card"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { PlaceholderService } from "@/services/placeholder/placeholder";
import { onMounted, ref } from "vue";

import CCard from "@/components/CCard.vue";

import { TPost, TUser } from "@/services/placeholder/placeholder.types";

const posts = ref<TPost[]>([]);
const users = ref<TUser[]>([]);
const sortedPosts = ref<TPost[]>([]);

onMounted(async () => {
  try {
    posts.value = await PlaceholderService.getPosts();
  } catch (err) {
    console.error(err);
  }

  try {
    users.value = await PlaceholderService.getUsers();
  } catch (err) {
    console.error(err);
  }
});
</script>

<style lang="scss" scoped>
.home {
}
</style>
