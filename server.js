var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号。\n例如：node server.js 8080')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 路由代码开始 ********/

  console.log('含查询字符串的路径\n' + pathWithQuery)

  if (path === '/' || path === '/index.html') {
    var string = fs.readFileSync('./index.html', 'utf8')
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.statusCode = 200
    response.write(string)
    response.end()
  } else if (path === '/fakeData.js') {
    var string = fs.readFileSync('./fakeData.js', 'utf8')
    response.setHeader('Content-Type', 'application/javascript;charset=utf-8')
    response.statusCode = 200
    response.write(string)
    response.end()
  } else if (path === '/main.js') {
    var string = fs.readFileSync('./main.js', 'utf8')
    response.setHeader('Content-Type', 'application/javascript;charset=utf-8')
    response.statusCode = 200
    response.write(string)
    response.end()
  } else if (path === '/books/1' && method === 'GET') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('fetchBook success')
    response.end()
  } else if (path === '/books/1' && method === 'PUT') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('editBook success')
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('请求失败')
    response.end()
  }

  /******** 路由代码结束 ********/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用浏览器打开 http://localhost:' + port)