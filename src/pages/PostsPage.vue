<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery"/>
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>
      <my-select v-model="selectedSort"
                 :options="sortOptions"
      />

    </div>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @create="createPost"/>
    </my-dialog>
    <PostList :posts="sortedAndSearchedPosts"
              @remove="removePost"
              v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div ref="observer" class="observer"></div>
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
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: {MyInput, MySelect, MyButton, MyDialog, PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      sortOptions: [
        {value: "title", name: "По названию"},
        {value: "body", name: "По содержимому"},
      ],
      page: 1,
      limit: 10,
      totalPages: 0,
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
    async fetchPosts() {
      this.isPostsLoading = true;
      try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts",
            {
              params:
                  {
                    _page: this.page,
                    _limit: this.limit
                  }
            });
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
        this.posts = res.data;
      } catch (e) {
        alert('error')
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      this.page += 1
      setTimeout(async () => {
        try {
          const res = await axios.get("https://jsonplaceholder.typicode.com/posts",
              {
                params:
                    {
                      _page: this.page,
                      _limit: this.limit
                    }
              });
          this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
          this.posts = [...this.posts, ...res.data];
        } catch (e) {
          alert('error')
        }
      }, 100)
    }
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPagesw) {
        this.loadMorePosts();
      }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
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
