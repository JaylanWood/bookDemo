! function () {
let book = {
    name: '包菜的做法',
    number: 5,
    id: 1,
}
    axios.interceptors.response.use(function (response) {
        // 把请求里的url\method\data拿出来
        let {
            config: {
                url,
                method,
                data
            }
        } = response
        if (url === '/books/1' && method === 'get') {
            response.data = book
        } else if (url === '/books/1' && method === 'put') {
            var data1 = JSON.parse(data)
            // 把请求的data弄到books数据库上，并赋值给响应。
            Object.assign(book, data1)
            response.data = book
        }
        return response
    })
}.call()