import axios from 'axios'

// axios实例化

const request = axios.create({
	baseURL:'https://conduit.productionready.io'
})

// 请求拦截器

// 响应拦截器

export default request
