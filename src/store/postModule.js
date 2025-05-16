import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter((post) => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostLoading = bool
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        }

    },
    actions: {
        async fetchPosts({state, commit}) {
            this.isPostsLoading = true;
            try {
                commit('setLoading', true)
                const res = await axios.get("https://jsonplaceholder.typicode.com/posts",
                    {
                        params:
                            {
                                _page: state.page,
                                _limit: state.limit
                            }
                    });
                commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
                commit('setPosts', res.data)
            } catch (e) {
                alert('error')
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}) {
            setTimeout(async () => {
                try {
                    commit('setPage', state.page + 1)
                    const res = await axios.get("https://jsonplaceholder.typicode.com/posts",
                        {
                            params:
                                {
                                    _page: this.page,
                                    _limit: this.limit
                                }
                        });
                    commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / this.limit))
                    commit('setPosts', [...state.posts, ...res.data])
                } catch (e) {
                    console.log(e)
                }
            }, 100)
        }
    },
    namespaced: true

}