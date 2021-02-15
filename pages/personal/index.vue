<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">

            <img class="user-img" :src="user.image?user.image:'https://static.productionready.io/images/smiley-cyrus.jpg'">
            <h4 class="ng-binding">{{user.username}}</h4>
            <p class="ng-binding"></p>
            <nuxt-link to="/settings" class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>

          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">

          <!-- Tabs for switching between author articles & favorites -->
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link" :class="{active:tag === ''}" :to="{name:'personal'}" exact>
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :class="{active:tag === 'favorites'}"
                           :to="{
                	          name:'personal',
                	          params:{
                	          	favorites:'favorites',
                	          	favorited:user.username
                	          }
                }" exact>
                Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="row in articles" :key="row.slug">
            <div class="article-meta">
              <nuxt-link class="author" :to="{
                  name: 'profile',
                  params: {
                    username: row.author.username
                  }
                }"><img :src="row.author.image"/></nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="{
                  name: 'profile',
                  params: {
                    username: row.author.username
                  }
                }">{{row.author.username}}
                </nuxt-link>
                <span class="date">{{row.createdAt | date('MMM DD YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                      :class="{active:row.favorited}" @click="handleFavorite(row)">
                <i class="ion-heart"></i> {{row.favoritesCount}}
              </button>
            </div>
            <nuxt-link class="preview-link" :to="{
            	  name:'article',
            	  params:{
            	  	slug: row.slug,
            	  	dist:'editor'
            	  }
                }">
              <h1>{{row.title}}</h1>
              <p>{{row.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'personal',
                    query: {
                      page: item
                    }
                  }"
                >{{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->

        </div>

        <!-- End row & container divs -->
      </div>
    </div>
  </div>
</template>

<script>
	import {mapState} from 'vuex'
  import {getArticles, addFavorite, deleteFavorite} from '@/api/article'

  export default {
		name: "index",
	  watchQuery: ['page'],
	  computed:{
		  ...mapState(['user']),
		  // 计算属性获取总页数，向上取整，获取总页面数
		  totalPage() {
			  return Math.ceil(this.articlesCount / this.limit)
		  }
	  },
    async asyncData({query,params,store}){
	    const limit = 2
	    const page = Number.parseInt(query.page) || 1
      const tag = params.favorites
      const {data} = await getArticles({
	      limit,
	      offset: (page - 1) * limit,
        [tag?'favorited':'author']:store.state.user.username
      })
	    const {articles, articlesCount} = data
      return {
	      articles,
	      articlesCount,
	      limit,
	      page, // 当前页数
	      tag // 当前标签
      }
    },
	  methods: {
		  async handleFavorite(article) {
			  article.favoriteDisabled = true
			  if (article.favorited) {
				  // 取消点赞
				  await deleteFavorite(article.slug)
				  article.favorited = false
				  article.favoritesCount += -1
			  } else {
				  // 添加点赞
				  await addFavorite(article.slug)
				  article.favorited = true
				  article.favoritesCount += 1
			  }
			  article.favoriteDisabled = false
		  }
	  }
	}
</script>

<style scoped>
  .profile-page .user-info {
    text-align: center;
    background: #f3f3f3;
    padding: 2rem 0 1rem 0; }
  .profile-page .user-info .user-img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-bottom: 1rem; }
</style>
