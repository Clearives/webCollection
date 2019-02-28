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
