import { request } from '@/plugins/request'

// 新增文章内容
export const addEditor = data => {
	return request({
		method: 'POST',
		url: '/api/articles',
		data
	})
}

// 获取文章内容
export const getEditor = slug => {
	return request({
		method: 'GET',
		url: `/api/articles/${slug}`
	})
}

// 修改文章内容
//
export const updateEditor = (slug,data) => {
	console.log(data)
	return request({
		method: 'PUT',
		url: `/api/articles/${slug}`,
		data
	})
}
