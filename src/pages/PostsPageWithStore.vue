<template>
  <div>
    <h1>Страница с постами</h1>
<!--    <my-input v-model="searchQuery" v-focus />-->
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>
<!--      <my-select v-model="selectedSort"-->
<!--                 :options="sortOptions"-->
<!--      />-->

    </div>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @create="createPost"/>
    </my-dialog>
    <PostList :posts="sortedAndSearchedPosts"
              @remove="removePost"
              v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--    <div class="page__wrapper">-->
    <!--      <div v-for="pageNumber in totalPages"-->
    <!--           :key="pageNumber"-->
    <!--           class="page"-->
    <!--           :class="{-->
    <!--             'current-page':pageNumber === page-->
    <!--           }"-->
    <!--           @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {MyInput, MySelect, MyButton, MyDialog, PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    ...mapMutations ({
      setPage: 'post/setPage'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: "post/fetchPosts"
    })
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState ({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      sortOptions: state => state.post.sortOptions,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
  },
  watch:{
    // page() {
    //   this.fetchPosts();
    // }
  }
  // watch: {
  //   selectedSort(newValue) {
  //     this.posts.sort((post1, post2) => {
  //       return post1[newValue]?.localeCompare(post2[newValue]);
  //     })
  //   }
  // }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: grey;
}

</style>
