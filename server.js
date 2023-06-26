import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const fs = require('fs')
const path = require('path')
const express = require('express')
// const serveStatic = require('serve-static')
// const { createServer: createViteServer } = require('vite')
// const { title } = require('process')

const __dirname = path.resolve()

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD
const isProduction = process.env.NODE_ENV === 'production'

/*
  async function createServer() {
    const app = express()

    // 以中间件模式创建 Vite 应用，并将 appType 配置为 'custom'
    // 这将禁用 Vite 自身的 HTML 服务逻辑
    // 并让上级服务器接管控制
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    let render
    if (!isProd) {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom',
      })
    } else {
      app.use(serveStatic(path.resolve(__dirname, 'dist/client')))
    }

    // 使用 vite 的 Connect 实例作为中间件
    // 如果你使用了自己的 express 路由（express.Router()），你应该使用 router.use
    app.use(vite.middlewares)

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl
      let template
      try {
        if (!isProd) {
          // 1. 读取 index.html
          template = fs.readFileSync(
            path.resolve(__dirname, 'index.html'),
            'utf-8'
          )

          // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
          //    同时也会从 Vite 插件应用 HTML 转换。
          //    例如：@vitejs/plugin-react 中的 global preambles
          template = await vite.transformIndexHtml(url, template)

          // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
          //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
          //    并提供类似 HMR 的根据情况随时失效。
          render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
        } else {
          // 生产环境
          template = fs.readFileSync(
            path.resolve(__dirname, '/dist/client/index.html'),
            'utf-8'
          )

          render = require('./dist/server/entry-server.js').render
        }

        // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
        //    函数调用了适当的 SSR 框架 API。
        //    例如 ReactDOMServer.renderToString()
        const appHtml = await render(url)

        // 5. 注入渲染后的应用程序 HTML 到模板中。
        const html = template.replace('<!--ssr-outlet-->', appHtml)

        // 6. 返回渲染后的 HTML。
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
        // 你的实际源码中。
        vite.ssrFixStacktrace(e)
        next(e)
      }
    })

    app.listen(3000, () => {
      console.log(
        'node server 运行 localhost:3000',
        isProd ? '生产环境' : '开发环境'
      )
    })
  }
*/

async function createServer() {
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProduction
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  // @ts-ignore
  const manifest = isProduction
    ? require('./dist/client/ssr-manifest.json')
    : {}

  const app = express()
  const port = 9000

  let viteServer
  if (!isProduction) {
    // Create Vite server in middleware mode. This disables Vite's own HTML
    // serving logic and let the parent server take control.
    //
    // In middleware mode, if you want to use Vite's own HTML serving logic
    // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
    viteServer = await require('vite').createServer({
      root: process.cwd(),
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
    })

    // use vite's connect instance as middleware
    app.use(viteServer.middlewares)
  } else {
    app.use(require('compression')())
    app.use(require('serve-static')(resolve('dist/client'), { index: false }))
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render, html
      if (!isProduction) {
        // 1. Read index.html
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and also applies HTML transforms from Vite plugins, e.g. global preambles from @vitejs/plugin-react
        template = await viteServer.transformIndexHtml(url, template)
        // 3. Load the server entry. vite.ssrLoadModule automatically transforms your ESM source code to be usable in Node.js!
        // There is no bundling required, and provides efficient invalidation similar to HMR.
        render = (await viteServer.ssrLoadModule('/src/entry-server.ts')).render

        // 4. render the app HTML. This assumes entry-server.js's exported `render` function calls appropriate framework SSR APIs, ReactDOMServer.renderToString()
        const [renderedHTML, state] = await render(url, manifest)

        // 5. Inject the app-rendered HTML into the template.
        html = template
          .replace('<!--pinia-state-->', state)
          .replace('<!--app-html-->', renderedHTML)
      } else {
        template = indexProd
        render = require('./dist/server/entry-server.js').render

        const [renderedHTML, state, preloadLinks] = await render(url, manifest)

        html = template
          .replace('<!--preload-links-->', preloadLinks)
          .replace('<!--pinia-state-->', state)
          .replace('<!--app-html-->', renderedHTML)
      }

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (e instanceof Error) {
        // If an error is caught, let Vite fix the stracktrace so it maps back to your actual source code.
        viteServer && viteServer.ssrFixStacktrace(e)
        console.log(e.stack)
        res.status(500).end(e.stack)
      }
    }
  })

  app.listen(port, () => {
    console.log(
      `⚡️[server]: Server is running on ${
        isProduction ? 'production' : 'development'
      } at http://localhost:${port}`
    )
  })
}

createServer()
