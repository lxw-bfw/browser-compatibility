
#### 浏览器兼容性问题简单解决方案

##### 涉及领域
- dom操作浏览器兼容性写法封装
- bom操作浏览器兼容性写法封装

#### 知识标签

`常见浏览器兼容问题`、 `ie浏览器`、 `浏览器dom知识`、 `浏览器bom知识`、 `兼容性写法`、 `模块化开发` `闭包`、`插件封装`、`可拓展性`、`可维护性`

#### 简单使用

1. 导入js文件
```html

```

2. 使用
```javascript
  const startButton = $lxw.queryEle('#start')
    function testClick(){
        console.log('start')
        $lxw.removerEventHadler(startButton,'click',testClick)
    }
  $lxw.addDomEvent(startButton,'click',testClick)
```
3. 案例展示
[另一个github项目--使用jsdoc的简易计时器](link)