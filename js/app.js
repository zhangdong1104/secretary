

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
	var thi = this;
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
};

//ajax
app.ajax = function(url,datas){
	url = app.set_url(url);
	mui.ajax({
			type:"post",
			url:url,
			async:true,
			datatype:'json',
			data:datas,
			headers:{
				token:thi.get('token'),
				user:thi.get_h('user'),
			},
			success:function(data){
				return data;
			}
		});
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