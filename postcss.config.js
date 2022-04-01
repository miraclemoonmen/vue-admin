module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1920,
      selectorBlackList: ['el-time', 'picker', 'webkit-scrollbar'],
      minPixelValue: 0
    }
  }
}
