/**
 * Created by Clearives on 2015/8/3.
 */
/**
 *  {node} 将获取样式的节点
 */
function getCurrentStyle(node) {
    var style = null;
    if(window.getComputedStyle) {
        style = window.getComputedStyle(node, null);
    }else{
        style = node.currentStyle;
    }
    return style;
}