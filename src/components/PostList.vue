<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
  <TransitionGroup name="list">
  <PostItem v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove', post)"
  />
  </TransitionGroup>
  </div>
  <h2 v-else>
    Список постов пуст
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  components: {PostItem},
  props: {
    posts:
        {
          type: Array,
          required: true
        }
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.list-move {
  transition: transform 0.4s ease;
}
</style>