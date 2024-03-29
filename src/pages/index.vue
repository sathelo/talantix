<template>
  <section class="home">
    <div class="container home__container">
      <CInput
        v-model="searchValue"
        placeholder="Filter by author..."
        path-image="/icons/search.svg"
        class="home__input home__input_search"
      />
      <template v-if="!hasLoading">
        <div v-if="filteredPosts.length" class="cards home__cards">
          <CCard
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            class="cards__card"
          />
        </div>
        <div v-else>Not found</div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PlaceholderService } from "@/services/placeholder/placeholder";
import { onMounted, ref, computed } from "vue";
import { getCapitalizedText } from "@/utils";

import CCard from "@/components/Main/CCard.vue";
import CInput from "@/components/ui/CInput/CInput.vue";

import { TPostCard } from "@/types";

const searchValue = ref("");
const hasLoading = ref(true);
const posts = ref<TPostCard[]>([]);
const filteredPosts = computed<TPostCard[]>(() =>
  posts.value.filter((post) =>
    post.author?.toLowerCase()?.includes(searchValue.value.toLowerCase()),
  ),
);
onMounted(async () => {
  try {
    const responsePosts = await PlaceholderService.getPosts();
    const responseUsers = await PlaceholderService.getUsers();

    posts.value = responsePosts.map((post) => {
      const user = responseUsers.find((user) => user.id === post.userId);
      const title = getCapitalizedText(post.title);
      const description = getCapitalizedText(post.body);
      const author = user ? user.name : null;
      return {
        id: post.id,
        title: title,
        description: description,
        author: author,
      };
    });
  } catch (err) {
    console.error(err);
  } finally {
    hasLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.home {
  padding: 25px 50px;

  @include mobile {
    padding: 16px 32px;
  }

  &__container {
    display: flex;
    align-items: center;
    flex-direction: column;

    & > *:not(:last-child) {
      margin-bottom: 25px;
    }
  }

  &__input {
    width: 100%;
    max-width: calc(100% / 3);
    background: var(--text-white);
    border: 1px solid var(--text-gray-lighten);

    @include tablet {
      max-width: calc(100% / 2);
    }

    @include mobile {
      max-width: initial;
    }
  }

  .cards {
    column-count: 3;
    column-gap: 25px;

    @include tablet {
      column-count: 2;
    }

    @include mobile {
      column-count: 1;
    }

    & > *:not(:first-child) {
      margin: 12.5px 0;
    }
  }
}
</style>
