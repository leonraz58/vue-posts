<template>
  <div>
    <div>
      <button v-on:click="addLike">Like</button>
      <button @click="addDislike">Dislike</button>
<!--      два варианта записи v-on-->
    </div>
    <div><strong>Количество лайков {{ likes }}</strong> </div>
    <div><strong>Количество лайков {{ dislikes }}</strong> </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: 0,
      dislikes: 0
    }
  },
  methods: {
    addLike() {
      this.likes += 1
    },
    addDislike() {
      this.dislikes += 1
    }
  }
}
</script>

<style>

</style>
