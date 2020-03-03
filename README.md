# BookDemo
## 简介

通过一个图书获取、编辑的demo，学习一些前端的知识。

## 运行

安装 node 和 http-server

server.js 启用

```bash
node server.js 6000
```

浏览器打开http://localhost.6000/

## Axios

试用Axios发请求以及拦截器功能。

axios 在本地 http-server 发GET以外的请求会触发CORS预检，错误405。

暂时没想到解决办法，先用server.js做个服务器接收这些请求，再axios拦截吧。

## MVC

用 MVC 的思想把代码整理。

