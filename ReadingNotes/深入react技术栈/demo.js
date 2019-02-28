// 下面全是伪代码=============>
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



