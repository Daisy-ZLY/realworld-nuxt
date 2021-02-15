<template>
  <div class="article-meta">
    <nuxt-link :to="{
    	name:'profile',
    	params:{
    		username:article.author.username
    	}
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link :to="{
    	name:'profile',
    	params:{
    		username:article.author.username
    	}
    }" class="author">{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createdAt |date('MMM DD , YYYY') }}</span>
    </div>
    <!-- If current user is the author, show edit/delete buttons -->
    <template v-if="article.dist==='editor'">
      <nuxt-link class="btn btn-outline-secondary btn-sm" :to="{
      	name:'editor',
      	query:{
      		slug:article.slug
      	}
      }">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button class="btn btn-outline-danger btn-sm" :class="{disabled: isDeleting}" @click="deleteArticle()">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow Eric Simons <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">(29)</span>
      </button>
    </template>
  </div>
</template>

<script>
  import {deleteArticles} from '@/api/article'
	export default {
		name: "article-meta",
    props:{
			article:{
				type:Object,
        required:true
      }
    },
		data(){
			return {
				isDeleting:false
      }
    },

    methods:{
	    async deleteArticle(){
        await deleteArticles(this.article.slug)
        this.isDeleting = true
        this.$router.push('/personal')
      }
    }
	}
</script>

<style scoped>

</style>
