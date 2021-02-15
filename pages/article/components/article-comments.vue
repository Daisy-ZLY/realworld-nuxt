<template>
  <div class="col-xs-12 col-md-8 offset-md-2">

    <form class="card comment-form" @submit.prevent="handleAddComments">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body" required></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link class="comment-author" :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>


  </div>

</template>

<script>
	import {getComments,addComments} from '@/api/article'
	export default {
		name: "article-comments",
    props:{
	    article:{
				type:Object,
        required:true
      }
    },
    data(){
			return {
				comments:[], // 列表信息
				body:'' //评论信息
      }
    },
    async mounted(){
	    // 获取评论信息
	    const {data} = await getComments(this.article.slug)
      this.comments = data.comments
    },
    methods:{
			async handleAddComments(){
        await addComments(this.article.slug,{
	        "comment": {
		        "body": "It takes a Jacobian"
	        }
        })
      }
    }
	}
</script>

<style scoped>

</style>
