### React源码分析

1、 React.createElement

2、 ReactDOM.render

- 【instantiateReactComponent】实例化组件
    - null时,为空,实例化ReactEmptyComponent;
    - string时, 说明是文本, 实例化ReactDOMTextComponent;
    - ReactElement时, 说明是react元素, 进一步判断element.type的类型, 当为string时, 为DOM原生节点, 实例化ReactDOMComponent;函数或类时, 为react 组件， 实例化ReactCompositeComponent

- setState 更新机制

```javascript
function enqueueUpdate(component) {
  ensureInjected();
  // 如果不处于批量更新模式
  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 如果处于批量更新模式，则将该组件保存在 dirtyComponents 中
  dirtyComponents.push(component);
}
```

- 【batchingStrategy.batchedUpdates】将组件实例当作参数执行批量更新.
```javascript
var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,
  batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
    ReactDefaultBatchingStrategy.isBatchingUpdates = true;
    if (alreadyBatchingUpdates) {
      callback(a, b, c, d, e);
    } else {
      transaction.perform(callback, null, a, b, c, d, e);
    }
  },
}
```
    - 事务(transaction.perform)


