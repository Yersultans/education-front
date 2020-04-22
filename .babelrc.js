module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['transform-define'],
    "babel-plugin-styled-components",
    [
      "module-resolver",
      {
        "root": "./app",
        "cwd": "packagejson"
      }
    ]
  ]
}