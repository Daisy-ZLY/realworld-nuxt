#### 实现功能
- [访问地址](http://39.108.74.238:8088/)

- 基础功能
    - [x] 注册
        - 路由跳转 `http://localhost:3000/register`
        - 页面信息 `login/index.vue`
    - [x] 登录
        - 路由跳转 `http://localhost:3000/login`
        - 页面信息 `login/index.vue`
    - [x] 退出
        - 页面信息 `http://localhost:3000/settings`
        - 页面信息 `settings/index.vue`
        - 退出未发送交易，只是前端修改状态
            - 在store.js中调用mutation
            - 清除cookie和store中的user内容
            - 跳转首页
    
- 文章列表
    - [x] 发表  
        - 新增文章信息
    - [x] 修改
        - 在`article`页面路由添加`dist`跳转目标参数，若获取到该参数为`editor`，则为修改文章，否则为新增文章
        - 在页面，而不是组件中，调用`asyncData`方法，获取query信息进行`slug`参数读取
    - [x] 列表
        - `personal`个人页面，展示列表信息
    - [x] 分页
        - `personal`个人页面，对展示信息进行分页处理
    - [x] 标签
    - [x] 详情
        - 跳转文章详情页
    - [ ] 点赞
        - 发送交易报500错误
        - `MongoError` ,`message: "Unknown modifier: $pushAll"`
    - [ ] 取消点赞
        - 同点赞错误
    
- 个人中心
    - [x] 个人中心
        - 路由跳转 `http://localhost:3000/personal`
        - 页面信息  `personal/index.vue`
        - 主要功能
            - 展示个人信息
    - [x] 个人信息更新
        - 路由跳转 `http://localhost:3000/settings`
        - 页面信息 `settings/index.vue`
        - 主要功能
            - 收集个人信息并进行必要项校验
            - 更新cookie和store中的user内容

#### 知识点

- 页面传参
    - params
        - 路由声明
           - nuxt.config.js     
           - `path:'/article/:slug?'`
           - 路由参数可传递，可不传递
        - 页面跳转
        ```
            <nuxt-link class="preview-link" :to="{
                  name:'article',
                  params:{
                    slug: row.slug,
                    dist:'detail'
                  }
                }">
              。。。。
            </nuxt-link>
        ```
        - 导航栏形式
            - `http://localhost:3000/article/111-8sdy87`
        - 接收参数
        ```
            async asyncData({params}){
              const {data} = await getArticle(params.slug)
              。。。
            }
        ```
    - query
        - 路由无需声明参数形式
        - 页面跳转
        ```
            <nuxt-link :to="{
                name:'home',
                query:{
                    tab:'tag',
                    tag
                }
                }">#{{tag}}
            </nuxt-link>
        ```
        - 导航栏形式
            - `http://localhost:3000/?page=5`
        - 接收参数
        ```
            async asyncData({query, store}) {
                const page = Number.parseInt(query.page) || 1
                。。。
            }
        ```
        - query参数发生变化时，不会触发页面变化
            - `watchQuery: ['page']`
     
- asyncData中获取store信息
    - 基本用法：
        - 将asyncData返回的数据融合组件data方法返回数据一并给组件，实现响应式
        - 调用时机：服务端渲染期间和客户端路由更新之前
    - 注意事项：
        - 使用mapState的方式不能获取,在初始化之前调用，没有`this`对象
        - 只能在页面组件中使用，不能在子组件中使用
        - 从`store`中获取信息
        ```
        async asyncData({query, store}) {
            // this.user 获取信息，从`store`中获取
            const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
        },
        ```
    
- 样式精确匹配
    - 当样式有相似部分时，会模糊匹配，需要启动精准匹配
    ```
       <nuxt-link class="nav-link" :class="{active:tag === ''}" :to="{name:'personal'}" exact>
    ```
