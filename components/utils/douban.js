import jsonp from './shared'

const apikey = '0df993c66c0c636e29ecbb5344252a4a'

export function search(name, start, count) {
  return jsonp(
    `https://api.douban.com/v2/book/search?q=${name}&start=${start}&count=${count}&apikey=${apikey}`
  )
}
