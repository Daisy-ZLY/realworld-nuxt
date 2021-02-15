<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required>
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email" required>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
	// 仅在客户端加载 js-cookie 包
	const Cookie = process.client ? require('js-cookie') : undefined
  import {getUser,updateUser} from '@/api/user'
	export default {
		name: "settingsIndex",
		// 在路由匹配组件渲染之前会先执行中间件处理
		middleware: 'authenticated',
    async asyncData(){
			const {data} = await getUser()
      const {user} = data
      return {
	      user
      }
    },
    methods:{
	    logout(){
		    this.$store.commit('deleteUser')
        this.$router.push('/')
      },
	    async onSubmit(){
        await updateUser({user:this.user})
        this.$store.commit('setUser',this.user)
		    // 为了防止刷新页面数据丢失，我们需要把数据持久化
		    Cookie.set('user', this.user)
        this.$router.push('/personal')
      }
    }
	}
</script>

<style scoped>

</style>
