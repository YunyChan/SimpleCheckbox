# SimpleCheckbox [![license](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/YunyChan/SimpleNumberInput/blob/master/LICENSE) #

一个兼容IE简易复选框组件，主要抹平了浏览器对label标签点击的处理方式，并且提供了可让开发者自定义样式的类名。

## 快速开始 ##

+ 直接从上面下载
+ 克隆项目：https://github.com/YunyChan/SimpleCheckbox.git

## 使用 ##

首先在页面中引入`SimpleCheckbox.js`JS文件

```html
<script src="SimpleCheckbox.js"></script>
```

然后通过创建SimpleCheckbox的实例并传入相应的参数来插入并使用组件

```html
<div id="checkbox"></div>
<script src="SimpleCheckbox.js"></script>
<script>
    var oCheckbox = new SimpleCheckbox({
        target: document.getElementById('checkbox'),
        checked: true,
        tip: 'Hello, world!'
    });
</script>
```

下面是组件的配置参数说明：

+ `target` - __必须__, 需要插入组件的dom元素
+ `bind` - _可选[Boolean]:false_, 是否从已有DOM渲染组件
+ `name` - _可选[String]_, 复选框表单name值
+ `checked` - _可选[Boolean]:false_, 设置复选框在初始化时默认是否选中
+ `tip` - _可选[String]_, 复选框提示信息
+ `onChange` - _可选[Function]:null_, 复选框选中变化后的回调方法

APIs

* `check()` - 选中
* `uncheck()` - 取消选中
* `getValue()` - 获取复选框选中状态
* `setValue(Boolean)` - 设置复选框选中状态

## 作者 ##

Yuny Chan

+ [GitHub：https://github.com/YunyChan](https://github.com/YunyChan)
+ [博客：http://yuny.me/](http://yuny.me/)