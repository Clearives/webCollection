# QRcode
QRCode.js is javascript library for making QRCode. QRCode.js supports Cross-browser with HTML5 Canvas and table tag in DOM. QRCode.js has no dependencies.

# Demo
[http://clearives.cc/webCollection/plugin/qrcode/demo/](http://clearives.cc/webCollection/plugin/qrcode/demo/)

# Use
`
var qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 100,
	height : 100
})
// 使用 API
qrcode.clear()
qrcode.makeCode('http://clearives.cc/webCollection/plugin/qrcode/demo/')
`
