module.exports = {
  // pabulicPath:process.env.NODE_ENV === 'production' ? '' : '',
  devServer: {
    port: "8080",
    // https:false,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { // 配置跨域
      "/api": {
        target: "http://118.190.153.247:9001",
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrie: {
          "^/api": "api" // 请求的时候使用这个api就可以
        }
      }
    }
  }
}
