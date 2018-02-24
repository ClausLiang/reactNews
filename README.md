## react小demo
##### 1. 安装react的相关依赖
npm install --save react react-dom babelify babel-preset-react

npm install --save babel-preset-es2015


##### 2. 全局安装webpack

npm install -g webpack

npm install -g webpack-dev-server


##### 3. 本地安装webpack

npm install --save webpack

npm install --save webpack-dev-server


##### 4. 编译

webpack

webpack --watch 修改后自动编译

##### 5. 启动

webpack-dev-server --inline 自动编译并刷新浏览器，并不生成文件，编译后的文件存储在内存中

##### 6.安装css模块化相关包，并且做webpack相关配置

```
npm install --save style-loader css-loader babel-plugin-react-html-attrs(解决className,class冲突)
```
##### 7.安装ant design

```
npm install --save antd
```
##### 8.安装react-router-dom
```
npm install --save react-router-dom
```