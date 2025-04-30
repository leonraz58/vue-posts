<template>
  <div class="app">
    <form>
      <h4>Создание поста</h4>
      <input v-bind:value="title" @input="title = $event.target.value" type="text" class="input" placeholder="Название">
      <input v-bind:value="body" @input="body = $event.target.value" type="text" class="input" placeholder="Описание">
      <button class="btn" @click="createPost">Создать</button>
    </form>

    <div class="post" v-for="post in posts">
      <div><strong>Название: </strong> {{ post.title }}</div>
      <div><strong>Описание: </strong> {{ post.body }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {id: 1, title: 'JavaScript', body: 'Описание поста'},
        {id: 2, title: 'JavaScript', body: 'Описание поста 2'},
        {id: 3, title: 'JavaScript', body: 'Описание поста 3'},
      ],
      body: '',
      title: ''

    }
  },
  methods: {
    createPost() {
      const newPost = {
        id: new Date.now(),
        title: this.title,
        body: this.body,
      }
      this.posts.push(newPost)
      this.title = ''
      this.body = ''
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
