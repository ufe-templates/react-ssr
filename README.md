# react-ssr

a react boilerplate with ssr and webpack4

## webpack

- loaders
  - eslint-loader
  - babel-loader
  - style-loader css-loader stylus-loader
  - file-loader url-loader
- optimization
  - splitChunks
  - runtimeChunk
  - UglifyJSPlugin
  - MiniCssExtractPlugin
  - OptimizeCSSAssetsPlugin
  - sourcemap
- dev-server
- tree shaking
- code spliting

## eslint

- standard
- standard-react

## babel

- presets
  - env
  - react
  - stage-2
- plugins
  - jsx
  - react-hot-loader

## ssr

- css问题
  1. 单独打包css
  2. 写入指定标签style内
  3. 在客户端框架渲染前删除
- code spliting
  1. react-loadable 实现
  2. cmd异步加载问题  routes中添加loadData函数, 在server渲染时先进行请求然后渲染成静态页面
  3. code spliting 与 css modules 的问题
      - 如果使用 mini-css-extract-plugin 在code spilting的时候会导致在server端 document 插入link 导致无法运行
      - 如果不使用 mini-css-extract-plugin , 使用css-loader/locals 会导致首次加载的时候 没有css
      - 创建ServerMiniCssExtractPlugin, 在getCssChunkObject时候返回空, 告诉webpack不去处理async css chunks
      - 将server端异步csschunks 放到 dist/server/css 目录下
      - 服务端先去读取dist/server/css所有css文件 生成obj
      - 在react-loadable getBundles去处理 如果需要异步导入则根据需要的导入的异步模块按需加载css文件
      - 在客户端app接管渲染的cmd中 删除这段css
      - 从而解决首屏渲染没有样式的问题
- 服务端异步加载问题 例如首屏渲染时需要异步加载资源  在客户端一般是在cmd下请求资源  但是服务端需要先获取资源 再用来渲染html后 发送给浏览器渲染 基于路由的loadData 在路由定义时设置loadData server会在loadData所有promise执行结束后再去渲染html
