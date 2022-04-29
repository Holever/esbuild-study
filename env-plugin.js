let envPlugin = {
  name: 'env',
  setup(build) {
    // 每次 build 的时候,包括触发 watch 或者 serve模式下的重新构建
    build.onStart(() => {
      console.log('build started')
    });

    build.onResolve({ filter: /^env$/ }, args => ({
      path: args.path,
      namespace: 'env-ns',
    }))

    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, (args) => {
      // 模块路径
      console.log(args.path)
      // 父模块路径
      console.log(args.importer)
      // namespace 标识
      console.log(args.namespace)
      // 基准路径
      console.log(args.resolveDir)
      // 导入方式，如 import、require
      console.log(args.kind)
      // 额外绑定的插件数据
      console.log(args.pluginData)
      console.log('process.env: ', process.env);
      return {
        // 模块具体内容
        contents: JSON.stringify(process.env),
        // 指定 loader，如`js`、`ts`、`jsx`、`tsx`、`json`等等
        loader: 'json',
        // 错误信息
        errors: [],
        // 额外的插件数据
        pluginData: null,
        // 插件名称
        pluginName: 'env-plugin',
        // 基准路径
        resolveDir: './dir',
        // 警告信息
        warnings: [],
        // 同上
        watchDirs: [],
        watchFiles: []
      }
    })

    build.onEnd((buildResult) => {
      if (buildResult.errors.length) {
        return;
      }
      // 构建元信息
      // 获取元信息后做一些自定义的事情，比如生成 HTML
      // onEnd 钩子中如果要拿到 metafile，必须将 Esbuild 的构建配置中metafile属性设为 true
      console.log(buildResult.metafile)
    })
  },
}

require('esbuild').build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'out.js',
  metafile: true,
  // 应用插件
  plugins: [envPlugin],
}).catch(() => process.exit(1))