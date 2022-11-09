;(async () => {
  require('dotenv').config()
  const isDev = process.env.NODE_ENV === 'development'
  // require('fs-extra').copySync('public', 'dist')
  require('esbuild')
    .build({
      bundle: true,
      define: {
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
        'process.env.APP_TITLE': `"${process.env.APP_TITLE}"`,
        'process.env.APP_VERSION': `"${process.env.APP_VERSION}"`,
        'process.env.API_QLIFE': `"${process.env.API_QLIFE}"`,
        'process.env.DEVELOP_MODE': `${process.env.DEVELOP_MODE}`,
        'process.env.LOCAL_MODE': `${process.env.LOCAL_MODE}`
      },
      entryPoints: ['src/index.jsx'],
      loader: {
        '.data': 'base64',
        '.svg': 'file',
        '.png': 'file',
        '.woff': 'file',
        '.woff2': 'file'
      },
      minify: !isDev,
      outfile: 'dist/index.js',
      sourcemap: isDev,
      watch: isDev
    })
    .catch(() => process.exit(1))

  if (isDev) {
    require('live-server').start({
      file: 'index.html',
      host: 'localhost',
      open: false,
      port: 80,
      root: 'dist'
    })
  }
})()
