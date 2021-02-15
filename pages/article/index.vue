<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">

        <article-comments :article="article"></article-comments>
      </div>

    </div>

  </div>
</template>

<script>
  import {getArticle} from '@/api/article'
  import makedownIt from 'markdown-it'
  import ArticleMeta from "./components/article-meta";
  import ArticleComments from "./components/article-comments";
	export default {
		name: "articleIndex",
		components: {ArticleComments, ArticleMeta},
		// 从路由中获取参数信息
		async asyncData({params}){
			console.log(params)
      const {data} = await getArticle(params.slug)
      const {article} = data
			article.dist = params.dist

      // markdown转换为html
      const md = new makedownIt()
      article.body = md.render(article.body)
      return {
			 	article
      }
    },
		head () {
			return {
				title: `${this.article.title} - RealWorld`,
				meta: [
					{ hid: 'description', name: 'description', content: this.article.description }
				]
			}
		}

	}
</script>

<style scoped>

</style>
