//rem大小设置、ajax封装、上拉加载
	(function(win,doc){
	    //浏览器缩放大小时
	    win.onresize=function(){
	        change();
	    };
	    change();
	    function change(){
	        var Fs=doc.documentElement.clientWidth;
	        var nFs=Fs/(320/10);
	        //字体大小为10px;
	        doc.documentElement.style.fontSize=nFs+'px';
	    }
	})(window,document);
	
	
//ajax封装调用
	function ajaxsd(url,type,data,suFn,erFn){
		$.ajax({
			url:"http://192.168.1.126:8080/"+url,
	 		xhrFields:{
	           withCredentials:true
	       	},
	//     	async:false,
			type: type,
	        dataType : "json",
	        data:data,
			success: function(data) {
				suFn(data);
			},
	        error: function(error) {
	            erFn(error);         
	        }
		});
	}
	
	
//上拉加载
//_loadIndex 为请求的页数    _loadState为请求状态  0 可以请求  1 正在请求  2 请求结束
	var _loadIndex =1,
	    _loadState = 0;
	function loadmore(element,url,type,dataObj,successFn,errorFn) {
	    $(element).on("scroll",function(){
	        //当前可视容器高度
	        var _elementHeight = $(element).outerHeight(),
	            //当前滚动区域高度
	            _elementChildHeight = $(element).children().outerHeight(),
	            //滚动条高度
	            _elementScroll = $(element).scrollTop();
	        //滚动区域 - 滚动条高度 > 可视高度  就是还可以滚动  表示没有滚动到底部  否则就到了底部
	        if(_elementChildHeight - _elementScroll - 10 > _elementHeight){            
	            //console.log('没到底') 
	        }else {
	            //console.log('到底了')           
	            //当状态为0 的时候进行加载，防止重复加载
	            if(_loadState == 0){       
	                //状态更新为1
	                _loadState = 1;
	                //增加页数
	                _loadIndex += 1;
	                //添加正在加载loadding
	                $(element).append('<p class="nowLoad">正在加载...</p>');
	                //请求当前页数ajax
	                ajaxLoad(_loadIndex);
	            }
	        }
	    });    
	    //ajax请求
	    function ajaxLoad(page) {        
	        //更新发向服务器的数据，添加页数key值
	        dataObj.page = page;
	        $.ajax({
	            url:url,
	            type:type,
	            dataType:'json',
	            data:dataObj,
	            success:function (data) {
	                //数据渲染  ajajx回调
	                successFn(data);
	               //当数据不为空的时候，更新状态
	                if(data.length > 0){
	                    //更新状态 为 0
	                    _loadState = 0;
	                    //删除正在加载loadding
	//                  $('.nowLoad').remove();
	                    function hg(){
	                    	$(".nowLoad").remove();
	                    }
	                    setTimeout(hg,1200);
	                }else {                    
	                    //当数据长度小于等于0的时候，代表没有数据了，更新状态为2
	                    _loadState = 2;                    
	                    //删除正在加载loadding
	                    $('.nowLoad').remove();                    
	                    //更换loadding为没有数据
	                    $(element).after('<p class="endLoad">没有数据了...</p>');
	                    function fg(){
	                    	$(".endLoad").remove();
	                    }
	                    setTimeout(fg,1200);
	                }                
	            },
	            error:function (err) {                
	                //请求失败loadding
	                errorFn(err);                
	            }
	        })
	    }
	};
//上拉加载调用js
	/*loadmore('#wrapper','/store/tradeapi','post',{},function (data) {
	    $.each(data.data.list,function (key,val) {
	        $('#wrapper ul').append();
	    });
	},function () {   
	});*/


//地址栏传参
	function getRequest() {
  		var url=window.location.search; //获取url中"?"符后的字串
  		var theRequest = new Object();
  		if (url.indexOf("?") != -1) {
    		var str = url.substr(1);
    		strs = str.split("&");
    		for(var i = 0; i < strs.length; i ++) {
      			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    		}
  		}
  		return theRequest;
	}
	getRequest();//全部参数
	
	
//计算时间
	function times(time){
		var timea="";
		var time=parseInt(time/1000);//秒
		var fen=parseInt(time/60);//分
		var shi=parseInt(fen/60);//时
		var ri=parseInt(shi/24);//天
		var timestamp=new Date().getTime();//当前时间戳
		var kk=timestamp-time;//发表时的时间戳
		getMyDate(kk);
		function getMyDate(str){
		    var oDate = new Date(str),
		        oYear = oDate.getFullYear(),//年
		        oMonth = oDate.getMonth()+1,//月
		        oDay = oDate.getDate(),//日
		        oHour = oDate.getHours(),//时
		        oMin = oDate.getMinutes(),//分
		        oSen = oDate.getSeconds(),//秒
		        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay);//最后拼接时间
		    return oTime;
		};
		//补0操作
		function getzf(num){
		    if(parseInt(num) < 10){
		        num = '0'+num;
		    }
		    return num;
		}
		if(time<60){
			timea=time+"秒前";
		}else if(fen<60){
			timea=fen+"分钟前";
		}else if(shi<24){
			timea=shi+"小时前";
		}else if(ri<7){
			timea=ri+"天前";
		}else{
			timea=getMyDate(kk);
		}
		return timea;
	}





