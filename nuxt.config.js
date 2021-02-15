module.exports = {
	router:{
		linkActiveClass: 'active',
		// 自定义路由规则
		extendRoutes(routes, resolve) {
			// 清除系统自动生成的路由信息
			routes.splice(0)

			// 使用扩展运算符添加router规则
			routes.push(...[{
				path: '/',
				component: resolve(__dirname, 'pages/layout/'),
				children:[{
					path:'', // 默认子路由
					name:'home',
					component:resolve(__dirname,'pages/home/')
				},{
					path:'/login',
					name:'login',
					component:resolve(__dirname,'pages/login/')
				},{
					path:'/register',
					name:'register',
					component:resolve(__dirname,'pages/login/')
				},{
					path:'/article/:slug?',
					name:'article',
					component:resolve(__dirname,'pages/article/')
				},{
					path:'/editor/:slug?',
					name:'editor',
					component:resolve(__dirname,'pages/editor/')
				},{
					path:'/profile',
					name:'profile',
					component:resolve(__dirname,'pages/profile/')
				},{
					path:'/settings',
					name:'settings',
					component:resolve(__dirname,'pages/settings/')
				},{
					path:'/personal/:favorites?',
					name:'personal',
					component:resolve(__dirname,'pages/personal/')
				}]
			}])
		}
	},
	plugins:[
		'~/plugins/request.js',
		'~/plugins/dayjs.js'
	]
}
