### React源码分析

1、 React.createElement

2、 ReactDOM.render

- 【instantiateReactComponent】实例化组件
    - null时,为空,实例化ReactEmptyComponent;
    - string时, 说明是文本, 实例化ReactDOMTextComponent;
    - ReactElement时, 说明是react元素, 进一步判断element.type的类型, 当为string时, 为DOM原生节点, 实例化ReactDOMComponent;函数或类时, 为react 组件， 实例化ReactCompositeComponent

- 【batchingStrategy.batchedUpdates】将组件实例当作参数执行批量更新.
    - 事务


