module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        targets: '> 0.25%, not dead',
        corejs: 3
      }
    ]
  ],
  plugins: ['@babel/proposal-class-properties']
}
