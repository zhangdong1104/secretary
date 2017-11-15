



//设置地址
	function set_url(url) {
	    if(url[0]=='/') {
	        var a = "";
	    }else{
	        var a = "/";
	    }
	    return "http://xjms.buy23.cn/api"+a+url;
	}

var app = {
	set_h:function(key,data){
        if(!key) 
        {
            return;
        }
        //console.log("设置缓存,key：",key,"data：",data);
        if(typeof(data)=='object') 
        {
            data = this.json_to_str(data);
        }
        if(data=='') 
        {
            localStorage.removeItem(key);
        }else{
            localStorage.setItem(key, data);
        }
    },
    get_h:function(key)
    {
       if(!key) 
       {
           return false;
       }
       var data = localStorage.getItem(key);
       //console.log("得到缓存,key:",key,"data:",data);
       if(data == "" || data == null) 
       {
           return false;
       }
       
       if(data!=""&&data!=null&&data!=0&&(data[0]=="{"||data[0]=="[")) 
       {
           return this.str_to_json(data);
       }else{
           return data;
       }
    },
    //清空所有缓存
    empty_all_h:function(){
    	localStorage.clear();
    },
    //清空单个缓存
    empty_one_h:function(key){
    	localStorage.removeItem(key);
    },
    
    //检查缓存
    select_h:function(key){
    	if(localStorage.hasOwnProperty(key)){
    		return true;
    	}else{
    		return false;
    	}
    },
    //获取系统类型
    get_system:function() //获取系统类型 ios或android(全小写)
    {
        if(!this._system) 
        {
            if(uexWidgetOne.platformName=="iOS") 
            {
                this._system =  "ios";
            }else{
                this._system = "android";
            }
        }
        return this._system;
    },
    //ajax
    ajax:function(url,datas,success,error){
    	if(!url){
            return false;
        }
	url = set_url(url);
	var that = this;
	if(typeof(success)!="function") 
        {
            success = function(){};
        }
        if(typeof(error)!="function") 
        {
            error = function(){};
        }
        
        
        datas = datas || {};
	mui.ajax({
			type:"post",
			url:url,
			async:true,
			datatype:'json',
			data:datas,
			headers:{
				token:app.get_h('token'),
			},
			beforeSend:function(){
				app.open();
			},
			success:function(data){
				if(data.code==404){
					mui.openWindow({
//					id : 'login',
					url : 'login.html',
					show : {
						autoShow:true
					}
				});
//					mui.openWindow('login.html'); 
				}
				console.log(data);
				success(data);
			},
			error:function(){
				return 'error'
			}
		});
},
    
};

//转圈
app.open = function(){
	if(window.plus){
		plusReady(); 
	}else{ 
		document.addEventListener('plusready', plusReady,false);
	}
}

function plusReady(){
	plus.nativeUI.showWaiting(); 
	setTimeout( function(){
		plus.nativeUI.closeWaiting();
	},5000);
}


app.set_html = function(data,status)
{
    status = status || false;
    var temp = "data-html";//普通html赋值
    var temp1 = "data-show";//显示-隐藏元素
    var temp2 = "data-none-show";//显示-隐藏元素
    
    for(var i in data) 
    {
        // console.log(i);
        if(typeof(data[i])=="object") 
        {
            continue;
        }
        var str = "["+temp+"="+i+"]";
        if($(str).length!=0) 
        {
            var name = $(str)[0].tagName;
            //console.log(name);
            if( name == "INPUT") 
            {
                $(str).val(data[i]);
            }else{
                $(str).html(data[i]);
            }
        }
        
        var str = "["+temp1+"="+i+"]";
        //console.log(str);
        if($(str).length!=0) 
        {
            app.set_view(str,data[i]);
        }
        
        if(status) 
        {
            var str = "["+temp2+"="+i+"]";
//            console.log(str);
            if($(str).length!=0) 
            {
                app.set_view(str,data[i],true);
            }
        }
        
    }
}

//退出
app.closeApp = function() {
    plus.nativeUI.actionSheet({
        cancel: "取消",
        buttons: [{
            title: "注销当前账号"
        }, {
            title: "直接关闭应用"
        }]
    }, function(e) {
        var index = e.index;
        switch (index) { //case 0: 取消
            case 1: //
                localStorage.clear();
                plus.runtime.restart();
                plus.webview.show('index-loan');
                break;
            case 2: //
                plus.runtime.quit();
                break;
        }
    });
}; 