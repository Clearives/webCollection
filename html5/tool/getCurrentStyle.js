/**
 * Created by Clearives on 2015/8/3.
 */
// 参数node：将要获取其计算样式的元素节点
function getCurrentStyle(node) {
    var style = null;
    if(window.getComputedStyle) {
        style = window.getComputedStyle(node, null);
    }else{
        style = node.currentStyle;
    }
    return style;
}