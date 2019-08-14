//引入子页面，点击返回上一页
document.addEventListener('plusready', function() {
	var webview = plus.webview.currentWebview();
	plus.key.addEventListener('backbutton', function() {
		webview.canBack(function(e){
			if(e.canBack) {
				console.log(111111);
				$("body").animate({
					left:"100%"
				},300,function(){
					window.location.href="javascript:history.back(-1)";
				});
//				webview.back();
			} else {
				webview.close(); //hide,quit按手机返回键直接退出APP
				//plus.runtime.quit();
			}
		})
	});
});
