import request from './request'

export function getProducts(query) {
  return request({
    url: `/products`,
    method: 'get',
    params: query
  })
}

export function getComments(id, query) {
  return request({
    url: `/products/comments/${id}`,
    method: 'get',
    params: query
  })
}
