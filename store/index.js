const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined
// 避免服务端渲染，影响state实例
export const state = () => {
	return {
		user: ''
	}
}

export const mutations = {
	setUser(state, data) {
		if(data){
			state.user = data
		}
	},
	deleteUser(state){
		state.user = ''
		Cookie.set('user', '')
	}
}

export const actions = {
	// nuxtServerInit 是一个特殊的 action 方法
	// 这个 action 会在服务端渲染期间自动调用
	// 作用：初始化容器数据，传递数据给客户端使用
	nuxtServerInit ({ commit }, { req }) {
		console.log('req.headers.cookie=',req.headers.cookie)
		let user = null
		// 如果请求头中有 Cookie
		if (req.headers.cookie) {
			// 使用 cookieparser 把 cookie 字符串转为 JavaScript 对象
			const parsed = cookieparser.parse(req.headers.cookie)
			try {
				user = JSON.parse(parsed.user)
			} catch (err) {
				// No valid cookie found
			}
		}

		// 提交 mutation 修改 state 状态
		commit('setUser', user)
	}
}
