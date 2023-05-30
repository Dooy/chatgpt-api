# 打包chatgpt-dooy
打包自己的库 然后供调用
```shell
pnpm run build
npm config set registry https://registry.npmjs.org/
npm version patch #增加一个版本号
npm publish
```

# 调用
```shell
pnpm install chatgpt-dooy
```