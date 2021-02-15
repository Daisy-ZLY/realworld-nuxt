<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title">
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="article.tagList"><div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {addEditor,getEditor,updateEditor} from '@/api/editor'
	export default {
		name: "editorIndex",
		// 在路由匹配组件渲染之前会先执行中间件处理
		middleware: 'authenticated',
    data(){
			return{
				article:{
					title:'',
					description:'',
					body:'',
					tagList:[]
        }
      }
    },
    async asyncData({query}){
			if(query.slug){
				const {data} = await getEditor(query.slug)
				const {article} = data
				return {
					article,
					slug:query.slug
				}
      }
    },
    methods:{
			async onSubmit(){
				const {data} = this.slug ? await updateEditor(this.slug,{
					article: this.article
				}) : await addEditor({article: this.article})
        this.$router.push({
          name:'article',
          params:{
          	slug:data.article.slug,
            dist:'editor'
          }
        })
      }
    }
	}
</script>

<style scoped>

</style>
