- [事件系统](#%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F)
- [组件间通信](#%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%9A%E4%BF%A1)
### 事件系统

1、合成事件的实现机制
> 在使用 ES6 classes 或者纯 函数时，需要手动实现 this 的绑定，绑定方式如下：
- bind
- 构造器内声明
- 箭头函数

eg:
```javascript
// bind
import React, { Component } from 'react';

class App extends Component {
  handleClick(e, arg) {
    console.log(e, arg);
  }

  render() {
    return <button onClick={this.handleClick.bind(this, 'demo')}>Demo</button>;
  }
}

// 构造器内声明
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e);
  }

  render() {
    return <button onClick={this.handleClick}>Demo</button>;
  }
}

// 箭头函数
import React, { Component } from 'react';

class App extends Component {
  const;
  handleClick = (e) => {
    console.log(e);
  };

  render() {
    return <button onClick={this.handleClick}>Demo</button>;
  }
}
```

2、合成事件与原生事件混用
> 正常情况下可以使用合成事件，但是比如我们需要再body上绑定事件时就必须使用原生事件进行绑定。

3、react阻止冒泡事件
- 阻止合成事件间的冒泡，用e.stopPropagation();
- 阻止合成事件与最外层document上的事件间的冒泡，用e.nativeEvent.stopImmediatePropagation();
- 阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免

> 参考：[react阻止冒泡事件](https://zhuanlan.zhihu.com/p/26742034)

### 组件间通信

- 父 => 子   （props）
- 子 => 父   （回调函数）
- 无嵌套关系  （全局发布/订阅模式，eg：EventEmitter）
- context     (React Context 是嵌套层次较深的兄弟组件之间通信的一种便捷方式)
> 参考：[React组件之间的通信](https://github.com/sunyongjian/blog/issues/27)
