<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <!-- 用户信息存在则显示该链接 -->
              <li class="nav-item" v-if="user">
                <nuxt-link :to="{
                	name:'home',
                	query:{
                		 tab:'your_feed'
                	}
                }" class="nav-link" :class="{active:tab === 'your_feed'}" exact>Your Feed
                </nuxt-link>
              </li>
              <!-- 任何情况下均展示-->
              <li class="nav-item">
                <nuxt-link :to="{
                	name:'home',
                	query:{
                		tab:'global_feed'
                	}
                }" class="nav-link" :class="{active:tab === 'global_feed'}" exact>Global Feed
                </nuxt-link>
              </li>
              <!-- 点击标签的情况下展示 -->
              <li class="nav-item" v-if="tag">
                <nuxt-link :to="{
                	name:'home',
                	query:{
                		tab:'tag',
                		tag
                	}
                }" class="nav-link" :class="{active:tab === 'tag'}">#{{tag}}
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
            	  	dist:'detail'
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
                    name: 'home',
                    query: {
                      page: item,
                      tag: tag
                    }
                  }"
                >{{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
        </div>


        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <template v-for="tag in tags">
                <nuxt-link :to="{
              	name:'home',
              	query:{
              		tab:'tag',
              		tag
              	}
              }" class="tag-pill tag-default" v-if="tag.replace(/\u200C/g, ' ').trim()">
                  <span>{{tag.replace(/\u200C/g, ' ')}}</span>
                </nuxt-link>
              </template>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
	import {getArticles, getFeedArticles, addFavorite, deleteFavorite} from '@/api/article'
	import {getTags} from '@/api/tag'
	import {mapState} from 'vuex'

	export default {
		name: "homeIndex",
		watchQuery: ['page', 'tag', 'tab'],
		async asyncData({query, store}) {
			const limit = 10
			const page = Number.parseInt(query.page) || 1
			const tag = query.tag
			const tab = query.tab || 'global_feed'

			// this.user 获取信息，从`store`中获取
			const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles


			const [articlesRes, tagsRes] = await Promise.all([
				loadArticles({
					limit,
					offset: (page - 1) * limit,
					tag
				}), getTags()])

			const {articles, articlesCount} = articlesRes.data
			const {tags} = tagsRes.data
			console.log(tags)


			// 数据解构展示
			return {
				articles,
				articlesCount,
				limit,
				page, // 当前页数
				tags,
				tag,  // 当前标签
				tab
			}
		},
		computed: {
			...mapState(['user']),
			// 计算属性获取总页数，向上取整，获取总页面数
			totalPage() {
				return Math.ceil(this.articlesCount / this.limit)
			}
		},
		methods: {
			async handleFavorite(article) {
				console.log(article.slug)
				// await addFavorite('licop-ar0ekb')
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

</style>
