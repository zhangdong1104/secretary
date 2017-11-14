/*
缓存：
        last_window_name 打开本窗口的名字


网址：http://newdocx.appcan.cn/JSSDK/Window  文档->windows

event.stopPropagation();  阻止冒泡
*/
/*
appcan.ready(function(){
    //写html-点击标题栏关闭
    
    click("#Header",function(){
        app.close_window();
    });
});
*/

function set_url(url) 
{
    if(url[0]=='/') 
    {
        var a = "";
    }else{
        var a = "/";ht,l
    }
    
    return "http://xjms.buy23.cn/api"+a+url;
    // return "http://127.0.0.1"+a+url;
}

function click(xz,css,callBack) 
{
        if(typeof(css)=="function") 
        {
            appcan.button(xz, "btn-act",css);
        }else{
            appcan.button(xz, css,callBack);
        }  
        
    /*if(app.get_system()=='ios' || 1) 
    {
        if(typeof(css)=="function") 
        {
            appcan.button(xz, "btn-act",css);
        }else{
            appcan.button(xz, css,callBack);
        }        
    }else{
        if(typeof(css)=="function") 
        {
            //appcan.button(xz, "btn-act",css);
            $(xz).click(css);
        }else{
            //appcan.button(xz, css,callBack);
            $(xz).click(callBack);
        }
    }*/
}



function alert_(obj)
{
    alert(app.json_to_str(obj));
}


/*
app.open_window("index");//打开窗口  参数：窗口名字,动画,动画执行时间
app.close_window();//关闭当前窗口 参数：动画,动画执行时间
app.back_window();//返回上一个窗口

app.open_ajax();//打开ajax访问 默认是允许的
app.close_ajax();//关闭ajax访问
app.ajax(luyou,data,success,error);//路由,数据,成功,失败

app.set_h("token","123456789");//设置缓存  参数：键,值(对象或字符串都可以,函数自动处理) 
app.get_h("token");//得到缓存  如果是缓存的对象,这里得到的处理好的对象

app.str_to_json(str);//将json字符串转换成对象返回
app.json_to_str(json);//将json对象转成json字符串
app.copy(json);//复制json对象,然后返回

app.show("登录成功",1500);//在屏幕中心显示登录成功文字,1.5S后关闭显示 参数：显示文字,显示时间(默认1.5S)

app.get_system() //获取系统类型 ios或android(全小写)

app.get_time_number(str);//将时间字符串转换成时间戳,不传时间,默认转换当前时间
app.get_time_str(number,str);//将时间戳转换成时间对象,不传时间戳,默认转换当前时间 参数：时间戳,分隔符   注意：返回的是对象：其中 .date 是转换后的字符串

app.get_device_id();//获取手机设备id,如果获取失败,返回0~1000随机数

app.set_on_back(callback);//拦截安卓返回按键  按了返回后,出发回调函数
app.set_window_state(callback);//窗口状态变化触发回调 其中,回调参数  e：0-当前窗口回到前台显示  1-当前窗口回到后台  例如:A窗口打开B,当B窗口打开后,A窗口会触发回到后台,关闭B窗口后,A窗口显示到界面上,A会触发回到前台
app.run_script(name_z,name_f,callback);//在指定窗口运行函数 两种传参方式：1,在主窗口运行：主窗口名字,主窗口中要运行的函数名字  2,在浮动窗口运行：主窗口名字,浮动窗口名字,浮动窗口中要运行的函数名字  如果是本窗口运行，可以传"",例如,A窗口打开浮动窗口B,如果B触发A中函数:app.run_script("",""init_a());A触发B中的函数：app.run_script("","","init_b()");

app.md5();//MD5加密

app.create_label(f_obj,type,css);//创建标签 参数：父标签(js对象),类型,样式  例如：app.create_label($("#list")[0],"div","ub ub-ac ub-pc");
app.init_wh(obj,bili);//设置宽、高 比例,一般用于图片设置,  obj:jq对象或选择  bili:宽/高 例如:app.init_wh("#img",75/35);  app.init_wh($("#img"),0.5); 
app.init_img(obj,bili);//同  app.init_wh();

*/
//--------------外部调用----------------
var app = {
    
    //下面的几个参数是由打开窗口的时候传递的
    window_name:"",//本窗口名字
    last_window_name:"",//上一个窗口名字
    role:1,//角色  测试--使用默认1
    status:"zhu",//zhu - fu  主窗口，还是浮动窗口
    //zhu_name:"",//如果是浮动窗口，这里是主窗口名字
    
    _last_open_window_time:false,
    open_window:function(name,open_data,aniId,status) //打开窗口，  窗口名字，打开数据，
    {
        if(this._last_open_window_time) 
        {
            return;
        }
        this._last_open_window_time = true;
        setTimeout("app._last_open_window_time=false",500); //500ms只能打开一个窗口
        
        if(name=="") 
        {
            return;
        }
        var data = {};
        data.data = open_data;
        
        if(app.get_system()=='ios') 
        {
            default_ani = 10;
        }else{
            default_ani = 2;
        }
        
        if(typeof(name)!="object") 
        {
            data.name = name;
            data.aniId = aniId || default_ani;
        }else{
            data = name;
            data.aniId = data.aniId || default_ani;
        }
        
        data.dataType = 0;
        data.animDuration = 300;
        
        if(data.data==undefined) 
        {
            data.data={};
        }
        var url = data.name+'.html';
        
        //--设置页面名字随机 -- 
        var rand_win_name = {
            "03-area-01-list-xxx":true,
            "03-area-02-info-xxx":true,
            
            "03-wang-dian-01-list":true,
            "03-wang-dian-05-info":true,
            "03-jing-ping-01-list-xxx":true,
            "03-jing-ping-03-info-xxx":true,
            "03-tuan-dan-01-user-list":true,
            "03-tuan-dan-03-user-info":true,
            
            "03-user-01-list-xxx":true,
            "03-user-02-info-xxx":true,
            
            "03-yuan-05-info":true,
            "03-yuan-01-list":true,
            
            
            // "02-c-04-order-info-2-new":true,
            // "02-c-04-order-info-2-yi":true,
            
            "02-c-04-order-info-2-new-yi-content":true,
            
        };
        if(rand_win_name[data.name]) 
        {
            data.name = data.name+parseInt(Math.random()*1000)+parseInt(Math.random()*1000);
        }
        data.data.new_window_name = data.name;//新窗口名字
        data.data.last_window_name = app.window_name;//打开窗口的名字
        data.data.role = app.role;
        app.set_h("sys_open_data",data.data);
        
        console.log("-");
        console.log("-");
        console.log("-");
        console.log("-");
        console.log("-");
        console.log("-");
        console.log("                          打开窗口url:",data.data.new_window_name);
        console.log("-");
        console.log("-");
        console.log("-");
        console.log(data.data);
        console.log("-");
        console.log("-");
        
        
        
        //console.log("打开窗口url:",data.data.new_window_name);
        //console.log(data.data,"完整数据:",data);
        
        
        data.data = url;
        this.___open_window(data);
    },
    open_window_x:function(){
        uexWindow.openPresentWindow({
            name:name,
            data:name+'.html',
            animID:10,
            flag:1024
        });
    },
    open_pop:function(name,x,y,w,h){
        var data = {
            new_window_name:name,
            last_window_name:app.window_name,
            role:app.role,
        }
        app.set_h("sys_open_data",data);
        appcan.window.openPopover({
             name:name,
             dataType:0,
             url:name+".html?"+app.window_name, //传入主窗口名字
             top:y,
             left:x,
             width:w,
             height:h,
        });
    },
    close_window:function(text,time) //关闭窗口 动画、执行时间  ： 兼容浮动窗口关闭窗口
    {
        this.close_ajax();
        
        if(app.status == "fu") // 本窗口是浮动窗口 
        {
            if(text==undefined) 
            {
                app.run_script("","app.close_window()");
            }else{
                app.show(text);
                time = time || 800;
                setTimeout(function(){
                    app.run_script("","app.close_window()");
                },time);
            }
        }else{
            if(text == undefined) 
            {
                appcan.window.close(-1);
            }else{
                time = time || 800;
                this.show(text);
                setTimeout("appcan.window.close(-1);",time);
            }
        }
    },
    close_window_none:function(time){
        if(time) 
        {
            setTimeout("app.close_window_none()",time);
            return;
        }
        appcan.window.close({
            aniId:0,
            animDuration:100
        });
    },
    back_window:function(ani,_time) //返回上一个窗口 不关闭本窗口
    {
        ani = ani || 1;
        _time = _time || 300;
        appcan.window.windowBack(ani,_time);//动画 时间
    },
    open_ajax:function() //打开ajax访问，默认是打开的
    {
        this.___ajax_status = true;
    },
    close_ajax:function() //关闭ajax访问,关闭后本页面无法再发起ajax请求
    {
        this.___ajax_status = false;
    },
    ___ajax_status:true,//是否能够发起ajax请求
    ___ajax_one:false,//是否只发起一起ajax请求   true-发其中  false-没有发起
    ajax:function(url,data,success,error,status) //ajax url说明:如果不是http://开始,会自动加载域名
    {
        var that = this;
        if(typeof(url)=="object") 
        {
            data = url.data;
            success = url.success;
            error = url.error;
            url = url.url;
            status =  url.status;
        }
        if(!this.___ajax_status) 
        {
            return false;
        }
        if(typeof(success)!="function") 
        {
            success = function(){};
        }
        if(typeof(error)!="function") 
        {
            error = function(){};
        }
        
        if(!url) 
        {
            return false;
        }
        if(url[0]!="h"||url[1]!="t"||url[2]!="t"||url[3]!="p") 
        {
            url = set_url(url);//自动添加域名
        }
        
        if(status == "one") //处理只发起一次请求的情况
        {
            if(this.___ajax_one) 
            {
                return false;
            }
            this.___ajax_one = true;//发起中
        }
        
        
        
        var temp = {
            url : url,
            type : 'POST',
            data : data,
            dataType:"json",
            headers:{
                 devicetype:"APP",
                 device:that.get_device_id(),
                 token:that.get_h("token"),
                 version:app.get_version(),//版本号
                 name:app.get_system(),//类型
            },
            success : function(data) {
                //alert(typeof data);
                
                app.close_load();
                
                if(data.code == "error") 
                {
                    switch(data.message) 
                    {
                        case '登录验证已经失效': //登陆已失效
                            //app.return_login_page();
                            app.set_h("token",'');
                            app.model.alert("登录验证已经失效,请重启app登录",'','',function(){
                                uexWidgetOne.exit(0);//退出app
                            });
                            return; 
                            break;
                         
                    }
                }
                
                
                
                //--这里可以进一步处理公用返回数据
                success(data,data.data);
                
                that.___ajax_one = false;
            },
            error : function(e) {
                
                app.close_load();
                //异常处理
                error(e);
                
                that.___ajax_one = false;
                that._ajax_dispose_config_reset(url);
            }
        };
        
        //console.log(uexWidgetOne.platformName);
        this._ajax(temp);

    },
    _ajax:function(data){
        //设置接口数据，处理重复点击的情况
        var temp = this._ajax_dispose_config();
        //console.log(temp);
        //alert(event.timeStamp);
        var now_time = this.get_time_number();
        for(var i in temp) 
        {
            if(temp[i].url == data.url) //找到相同的 
            {
                var x = now_time - temp[i].last_time;
                if(temp[i].last_time != 0 && x < temp[i].time ) 
                {
                    return false;
                }
                
                temp[i].last_time = now_time;
            }
        }
        $.ajax(data);
        
        return;
        try{
            var now_time = parseInt(event.timeStamp);
            if(now_time) 
            {
                for(var i in temp) 
                {
                    if(temp[i].url == data.url) //找到相同的 
                    {
                        var x = now_time - temp[i].last_time;
                        if(temp[i].last_time != 0 && x < temp[i].time ) 
                        {
                            return false;
                        }
                        
                        temp[i].last_time = now_time;
                    }
                }
            }
            alert(1);
            $.ajax(data);
            //appcan.ajax(data);
        }catch(e){
            alert(2)
            $.ajax(data);
            //appcan.ajax(data);
        }
        
        return;
        if(uexWidgetOne.platformName=="Simulator") //不是模拟器，就是用appcan
        {
            $.ajax(data);
        }else{
            appcan.ajax(data);
        }
    },
    _ajax_temp:false,
    _ajax_dispose_config:function(){
        if(this._ajax_temp) 
        {
           return this._ajax_temp; 
        }
        default_time = 300;
        
        this._ajax_temp = new Array();
        for(var i in ajax_config_time) 
        {
            if(typeof ajax_config_time[i] == "object") 
            {
                var temp = {
                    url:set_url(ajax_config_time[i].url),
                    time:ajax_config_time[i].time || default_time,
                    last_time:0,
                }
            }else{
                var temp = {
                    url:set_url(ajax_config_time[i].url),
                    time:default_time,
                    last_time:0,
                }
            }
            this._ajax_temp.push(temp);
        }
        
        return this._ajax_temp;
    },
    _ajax_dispose_config_reset:function(url){
        var that = this;
        for(var i in that._ajax_temp) 
        {
            if(that._ajax_temp[i].time > 5000) //只有大于5s的才会还原
            {
                that._ajax_temp[i].last_time = 0;//还原
            }
        }
    },
    
    
    //---系统功能
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
    str_to_json:function(str)
    {
        if(!str) 
        {
            return {};
        }
        return JSON.parse(str);
    },
    json_to_str:function(obj)
    {
        return JSON.stringify(obj);
    },
    copy:function(data)
    {
        return this.str_to_json(this.json_to_str(data));
    },
    _show_x:"0",//0-没有  1-弹窗 2-加载
    show:function(text,time) //系统提示文字
    {
        if(typeof(text)=='object') 
        {
            time = text.time;
            text = text.text;
        }
        this._show_x = 1;
        time = time || 1500;
        uexWindow.toast(0, 5, text, time); //从1开始，，右上到左下
    },
    show_load:function(text,time){ //显示加载
        text = text || "";
        time = time || 0;
        if(!time) 
        {
            this.load_status = true;
        }
        this._show_x = 2;
        uexWindow.toast({
          type:1,
          location:5,
          msg:text,
          duration:time
        });
    },
    close_load:function(){ //关闭加载
        if(this.load_status) 
        {
            uexWindow.closeToast(); 
            return;
            var that = this;
            setTimeout(function(){
                that.load_status = false;
                if(that._show_x == 2) 
                {
                    uexWindow.closeToast(); 
                }              
            },150);
        }
    },
    _system:false,
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
    _version:false,
    get_version:function() //获取系统类型 ios或android(全小写)
    {
        if(!this._version) 
        {
            this._version =  uexWidgetOne.platformVersion;
        }
        return this._version;
    },
    get_device_id:function() //获取手机唯一设备id  如果获取失败，就使用随机数
    {
        
        return 123456; 
        var a = app.get_h("_app_system_device_x");
        if(!a) 
        {
            var a = uexDevice.getInfo('10');
            if(!a) 
            {
                a = parseInt(Math.floor(Math.random()*1000));   
            }
            app.set_h("_app_system_device_x",a);
        }
        return a;
    },
    get_time_number:function(str) //得到时间戳 兼容ios时间格式
    {
        if(str==undefined) 
        {
            return parseInt(new Date().getTime()/1000);
        }else{
            if(app.get_system()=='ios') 
            {
                str = str.replace(/[\-\.\:年月时分秒]/g,"/");
                str= str.replace(/日/,'');                
            }
            // str = "2017/7/20";
            // console.log(str);
            // console.log(parseInt(new Date(str).getTime()/1000));
            return parseInt(new Date(str).getTime()/1000);
        }
    },
    get_time_str:function(data,str) //得到日期 -- 可以传递时间戳  得到的是时间对象
    {
        if(data==undefined) 
        {
            var date = new Date();
        }else{
            if((data+'').length == 10) 
            {
                data = data*1000;
            }
            var date = new Date(data);
        }
        var week = [
            "周日","周一","周二","周三","周四","周五","周六"
        ];
        var temp = {
            y:date.getFullYear(),
            m:date.getMonth()+1,
            d:date.getDate(),
            h:date.getHours(),
            i:date.getMinutes(),
            s:date.getSeconds(),
            w:date.getDay()
        }
        temp.week = week[temp.w];
        if(temp.m<10) temp.m = "0"+temp.m;
        if(temp.d<10) temp.d = "0"+temp.d;
        if(temp.h<10) temp.h = "0"+temp.h;
        if(temp.i<10) temp.i = "0"+temp.i;
        if(temp.s<10) temp.s = "0"+temp.s;
        
        if(str==undefined) 
        {
            temp.date = temp.y+"-"+temp.m+"-"+temp.d+' '+temp.h+":"+temp.i+":"+temp.s;//2017-5-11 22:56:06
        }else{
            temp.date = temp.y+str+temp.m+str+temp.d+' '+temp.h+str+temp.i+str+temp.s;//2017-5-11 22:56:06
        }
        return temp;
    },
    call:function(number) //拨打电话
    {
        if(!number) 
        {
            app.show("调用拨打电话,但是没有设置号码");
            return;
        }
        
        if(uexWidgetOne.platformName=="iOS") 
        {
            app.show_load();
            setTimeout(function(){
                app.close_load();
            },300);
            uexCall.dial(number);
        }else{
            app.model.alert("是否立即拨号:<span class='s-c-green'>"+number+"</span>","",function(){
                uexCall.dial(number);
            });
        }
    },
    ___set_on_back_status:false,
    set_on_back:function(ret_call) //安卓 按了返回键回调处理
    {
        if(app._set_on_back_status) //只能设置一次
        {
            return;
        }
        app._set_on_back_status = true;  
        
        if(app.get_system()=="android") 
        {
            setTimeout(function(){
                uexWindow.setReportKey(0,1);
                uexWindow.onKeyPressed = ret_call;
            },10);            
        }
    },
    set_window_state:function(callBase) //窗口切换前台、后台 手机上才支持 
    {
        alert("set_window_state函数ios不兼容-不能使用");
        return;
        appcan.window.on('resume',function(){
            callBase(0);//前台
        })
        appcan.window.on('pause',function(){
            callBase(1);//后台
        })
    },
    
    
    //---加密-解密
    md5:function(str){
        return appcan.crypto.md5(str);
    },
    base64Decode:function(str){
        return appcan.crypto.base64Decode(str);
    },
    base64Encode:function(str){
        return appcan.crypto.base64Encode(str);
    },
    rc4:function(str){
        return appcan.crypto.rc4(str);
    },
    rc4New:function(str){
        return appcan.crypto.rc4New(str);
    },
    
    //----dom
    create_label:function(obj,type,css,html) //创建标签
    {
        var div = document.createElement(type);
        div.className = css;
        obj.appendChild(div);
        if(html) 
        {
            div.innerHTML = html;
        }
        return div;
    },
    init_wh:function(obj,bili) // 设置标签的宽/高比例，，jq对象
    {
        if(bili==undefined) 
        {
            bili = 4/3;
        }
        if($(obj).length == 0) 
        {
            return false;
        }
        var js_obj = $(obj)[0];
        var h = parseInt(js_obj.clientWidth/bili);
        
        $(obj).css("height",h+'px');
    },
    init_img:function(obj,bili){ //初始化图片比例
        this.init_wh(obj,bili);
    },
    
    //---------------------其他扩展
    input_focus:function(css) //激活输入框,弹出软键盘
    {
       if(uexWidgetOne.platformName=="iOS") //ios
       {    
           setTimeout(function(){ 
               $(css).focus(); 
           },350); 
       }else{                       //安卓
           setTimeout(function(){
               $(css).focus(); 
           },100);
           setTimeout(function(){
               uexWindow.showSoftKeyboard();
           },350);            
       }
    },
    open_scanner:function(type,callback_success){ //扫码,条形码,二维码,扫描  调用后，返回扫码结果数据
        if(callback_success==undefined) 
        {
            callback_success=type;
            type = 1; //1-输入框  2-扫码
        }
        
        var callBack = function(code){
            code = code.replace(" ","");
            if(code) 
            {
                callback_success(code);
            }
        }
        
        if(type == 1) 
        {
            app.model.input("","请输入条码","确认",function(e){
                if(e) 
                {
                    callBack(e);
                }
            },"number");
            /*appcan.window.prompt("请输入条码",""," ",['确认','取消'],function(err,data,dataType,optId){
                if(!err)  
                {
                    // console.log(data);
                    if(data.num==0) 
                    {
                        callBack(data.value);
                    }
                    if(data.index == 0)
                    {
                        callBack(data.data);
                    }
                }
            });*/
        }else{
            var callback = function(error,data) {
              if(!error){
                //alert("data:" + JSON.stringify(data));
                app.play_mp3();
                callBack(data.code);
              }else{
                //alert("failed!");
              }
            };
            uexScanner.open(callback);
        }
        
        /*return;
        if(!app.get_h("sys_test_txm")&&0) 
        {
            var callback = function(error,data) {
              if(!error){
                //alert("data:" + JSON.stringify(data));
                callBack(data.code);
              }else{
                //alert("failed!");
              }
            };
            uexScanner.open(callback);
        }
        else{
            appcan.window.prompt("标题","请输入衣物上面的条形码","0",['确认','取消'],function(err,data,dataType,optId){
                if(!err)  
                {
                    // console.log(data);
                    if(data.num==0) 
                    {
                        callBack(data.value);
                    }
                    if(data.index == 0)
                    {
                        callBack(data.data);
                    }
                }
            });
        }*/
    },
    play_mp3:function(url){
        url = url || "res://saoma.mp3";
        uexAudio.open(url);
        uexAudio.play(0);
    },
    get_location:function(callBack){
        
        return;
        /*callBack({
            lng:"106.50",
            lat:"29.50",
            address:"重庆市渝北区红旗河沟嘉州协信中心",
            province:"重庆市",//省
            city:"重庆市",//市
            area:"渝北区",//区
            street:""//街道
        });*/
        
        app._get_location_status = false;
        uexLocation.openLocation("wgs84",function(error) {
            if(!error){
                //alert("开启成功");
            }else{
                //app.show("定位失败");
            }
        });
        
        uexLocation.onChange = function(lon,lat){
            
            //alert(lon+'-'+lat);
            uexLocation.closeLocation();
            //定位成功
            app.get_location_address(callBack,lon,lat,"wgs84",2);
        }
    },
    _get_location_status:false,
    get_location_address:function(callBack,lo,la,type,status){
        if(app._get_location_status) 
        {
            return;
        }
        app._get_location_status = true;
        var callbackFunction = function (error, data) {
          if(!error){
            //alert(JSON.stringify(data));
            callBack({
                lon:data.location.lng,
                lat:data.location.lat,
                address:data.formatted_address,
                province:data.addressComponent.province,
                city:data.addressComponent.city,
                area:data.addressComponent.district,
                street:data.addressComponent.street+''+data.addressComponent.street_number,
            });
          }else{
            alert(error);
          }
         }
         var params = {
                latitude: lo,
                longitude: la,
                type:"wgs84",
                flag:1
         };
         //alert_(params);
         uexLocation.getAddressByType(params,callbackFunction);
    
    
    
        return;
        if(app._get_location_status) 
        {
            return;
        }
        app._get_location_status = true;
        type = type|| 'wgs84';
        status = status || 1;
        var params = {
            latitude: la,
            longitude: lo,
            type:type,
            flag:status//1-返回地址名字  2-返回详情
        };
        alert_(params);
        uexLocation.getAddressByType(params,function(error,data){
            alert(0);
             if(!error){
                alert(JSON.stringify(data));
              }else{
                alert(error);
              }
            //alert_(data);
            /*callBack({
                lon:lo,
                lat:la,
                address:data.formatted_address,
                province:data.addressComponent.province,
                city:data.addressComponent.city,
                area:data.addressComponent.district,
                street:data.addressComponent.street+''+data.addressComponent.street_number,
            });*/
        });
    },
    
    ___set_scroll_bottom_status:false,
    set_scroll_bottom:function(call_back){ //暂时只能设置body滚动
        //如果是box-scrollbox 模型  采用自带的下拉刷新
        if(this.___set_scroll_bottom_status) 
        {
            app.show("一个页面只能调用一次");
            return;
        }
        this.___set_scroll_bottom_status = true;
        if(typeof(call_back)!='function') 
        {
            app.show("滚动到底部必须设置回调");
            return;
        }
        
        $.scrollbox($("body")).on("scrollbottom",function() { //on scroll bottom,this event will be triggered.you should get data from server
           this.model.set("bottomStatus", "0");
           
           call_back();//回调数据
        }).on("draging",function(status) { //on draging, this event will be triggered.
           this.reset();//下拉还原
        });
        
        return;
    },
    check_phone:function(phone){//检测手机号是否合法
        if(/^1[34578]\d{9}$/.test(phone)){
            return true;
        } else {
            return false;
        }
    },
    return_login_page:function(){
        //返回登陆页面
        
    }
}

// appcan.ready(function(){
    // app.open_scanner(function(e){
        // alert(e);
    // });    
// })




//--------------封装多窗口通讯---------------
app.set_script = function(callBack){//这里的回调不能传参数  设置 本窗口默认回调初始化函数
    app.set_script_default_call_back = function(){
        setTimeout(callBack,0);
    }
};
/*
 *  三种传参方式
 *  1.不传参数，或传递一个参数，调用上一个页面或指定页面 的set_script中设置的回调函数,这里不能传参数
 *  2.传两个参数，在以第一个窗口为名字的主窗口调用函数
 *  3.传三个参数,在指定主窗口的浮动窗口运行函数
 * 
 *  其他：主窗口名字可以传递last,表示打开本窗口的窗口名字
 * */
app.run_script = function(name1,name2,run_fun) 
{
    console.log("其他窗口运行函数:",name1,',',name2,',',run_fun,"last:",app.last_window_name);
    if(name2==undefined) 
    {
        if(name1==undefined) 
        {
            return;
        }
        app.run_script("last","app.set_script_default_call_back()");
        return;
    }
    if(run_fun==undefined) 
    {
     
        if(name1=="last") //在最后一个窗口运行
        {
            name1 = app.last_window_name;
        }
        appcan.window.evaluateScript({
            name:name1,
            scriptContent:name2
        });
        return;
    }
    appcan.window.evaluatePopoverScript({
        name:name1,
        popName:name2,
        scriptContent:run_fun
    });
};




//--------------模态窗----------------------
app.model = {
    _close_callBack:function(){
        
    },
    open:function(id){
        $("#"+id).css("display","block");
    },
    close:function(e){
        $(".s-model").css("display","none");
        this._close_callBack();
    },
    init:function(){
        var obj = $(".s-model-bg");
        if(obj.length!=0) 
        {
            var that = this;
            click($(obj),"",function(){
                that.close();
            });
        }
    },
    alert:function(text,but_text,callBack,callBack1) 
    {
        var that = this;
        but_text = but_text || '确认';
        
        callBack = callBack || function(){};
        callBack1 = callBack1||function(){};
        if(callBack=="close"||callBack=="close_window"||callBack=="close-window") 
        {
            callBack = function(){
                app.close_window();
            }
            callBack1  = function(){
                app.close_window();
            }
        }
        
        var str = ''
        //+ '<div class="s-model" style="display: block;">'
            + '<div class="s-model-bg"></div>'
            + '<div class="s-model-content s-ht" style="width:88%;margin-left:6%;top:32%;border-radius: .3em;">'
                + '<div style="margin-top:2.5em;" class="s-tc s-fs-98">'+text+'</div>'
                + '<div class="ub-center s-model-button" >'+but_text+'</div>'
            + '</div>'
       //  + '</div>'
       
       var obj = app.create_label(document.body,"div","s-model");
       obj.innerHTML = str;
       $(obj).css("display","block");
       click($(obj).find(".s-model-button"),function(){
           $(obj).remove();
           callBack();
           callBack1();
       });
       click($(obj).find(".s-model-bg"),"",function(){
           $(obj).remove();
           callBack1();
       });
    },
    alerts:function(text,but_text,callBack) 
    {
        callBack = callBack || function(){};
        var that = this;
        if(but_text.length!=2) 
        {
            alert("调用错误,这里必须传两个参数");
            reutrn;
        }
        var but1 = but_text[0];
        var but2 = but_text[1];
        var str = ''
      /*  //+ '<div class="s-model" style="display: block;">'
            + '<div class="s-model-bg"></div>'
            + '<div class="s-model-content s-ht" style="width:88%;margin-left:6%;top:30%;border-radius: .3em;">'
                + '<div style="margin-top:2.5em;" class="s-tc s-fs-98">'+text+'</div>'
                + '<div class="ub-center s-model-button" >'+but_text+'</div>'
            + '</div>'
       //  + '</div>'
       */
        //'<div class="s-model" style="display: block;">'
       +     '<div class="s-model-bg"></div>'
       +     '<div class="s-model-content s-ht" style="width:88%;margin-left:6%;top:32%;border-radius: .3em;">'
       +         '<div style="margin-top:2.5em;" class="s-tc s-fs-98">'+text+'</div>'
       +         '<div class="ub">'
       +             '<div class="s-model-but-2-but ub-center s-model-b-4 s-on-act" data-index="0">'+but1+'</div>'
       +             '<div class="s-model-fg"></div>'
       +             '<div class="s-model-but-2-but ub-center s-model-b-3 ub-f1 s-on-act" data-index="1">'+but2+'</div>'
       +         '</div>'
       +     '</div>'
       //+ '</div>'
       
       var obj = app.create_label(document.body,"div","s-model");
       obj.innerHTML = str;
       $(obj).css("display","block");
       click($(obj).find(".s-model-but-2-but"),function(){
           $(obj).remove();
           
           var index = $(this).data("index");
           
           callBack(index);
       });
       click($(obj).find(".s-model-bg"),"",function(){
           $(obj).remove();
       });
    },
    _input:{
        input_obj:"",
        obj:"",
        but_obj:"",
        callBack:"",//点击之后的回调
        init_status:false,//初始化状态
    },
    input_callBack:function(){
        this._input_callBack(app.get_h("ipt_temp"));
    },
    _input_callBack:"",
    input:function(value,text,but_text,callBack,type) //默认值，提示文字，按钮文字,点击确定后的回调
    {
        console.log(text,but_text);
        app.set_h("ipt_temp",{
            name:app.window_name,
            type:app.status,
            value:value,
            text:text,
            but_text:but_text,
            itype:type,
        });
        
        app.open_pop("z-input",0,0,0,0);
        this._input_callBack = callBack;
        
        
        return;
        if(!this._input.init_status) 
        {
            this._input.init_status = true;
            var str = ''
             //   + ' <div class="s-model" id="model-info" style="display: none;"> '
                    + ' <div class="s-model-bg"></div> '
                    + ' <div class="s-model-content s-ht" style="width:88%;margin-left:6%;top:32%;border-radius: .3em;padding-top:.8em;"> '
                        + ' <div class="s-model-ipt"><input placeholder="" class="s-tc" id="model-ipt-address" /></div> '
                        + ' <div class="ub-center s-model-button s-on-act" style="">确认</div> '
                    + ' </div> '
             //   + ' </div> '
            this._input.obj = app.create_label(document.body,"div","s-model",str);
            $(this._input.obj).css("display","none");
            this._input.input_obj = $(this._input.obj).find("input")[0];
            this._input.but_obj = $(this._input.obj).find(".s-model-button")[0];
            
            click($(this._input.obj).find(".s-model-bg"),"",function(){
                $(that._input.obj).css("display","none");
            });
            
            var that = this;
            click(this._input.but_obj,function(e){
                var val = $(that._input.input_obj).val();
                if(val) 
                {
                    this._callBack(val);
                    //callBack(val);
                }
                
                $(that._input.obj).css("display","none");
            });
            
            
            return this.input(value,text,but_text,callBack,type);
        }
        
        this._input.but_obj._callBack = callBack;
        
        
        type = type || '';
        $(this._input.input_obj).attr("type",type);
        
        but_text = but_text||"确认";
        
        $(this._input.input_obj).val(value);
        $(this._input.input_obj).attr("placeholder",text);
        $(this._input.but_obj).html(but_text);
        this._input.callBack = callBack;
        $(this._input.obj).css("display","block");
    }
    
    
    
    
}


//---------------内部封装------------------
app.___open_type = false;//打开下一个窗口使用的动画
app.___open_window = function(data){ //打开窗口
    
    if(!app.___open_type&&app.get_system()=="ios") 
    {
        /*if(data.name == "02-c-16-tuan-dan-qu-yi" || "02-c-08-qu-yi" == data.name)
        {
            uexWindow.openPresentWindow({
                name:data.name,
                data:data.name+'.html',
                animID:10,
                flag:1024
            });
            
            return;        
        }*/
        data.type = 1024;//ios滑动关闭
    }
    appcan.window.open(data);
};
app.__ready = new Array();
app.ready = function(callBack){
    this.__ready[this.__ready.length] = callBack;
};
app.init = function(){
    appcan.ready(function(){
        app.__init_style();
        
        appcan.window.setWindowScrollbarVisible(0);//隐藏滚动条 -- 手机上有效
        
        //--开启打开窗口
        click("[data-url]","",function(){
            app.open_window($(this).data('url'));
        });
        //--关闭窗口
        click(".close-window",function(){
            app.close_window();
        });
        //--开启拨打电话
        click(".call",function(){
            app.call(this.innerHTML);
            event.stopPropagation();
        });
        
        
        
        app.open_data = app.get_h("sys_open_data");
        if(app.open_data) 
        {
            app.window_name = app.open_data.new_window_name;
            app.last_window_name = app.open_data.last_window_name;
            app.role = app.open_data.role;            
        }

        
        setTimeout(function(){
            app.model.init();//模态窗初始化
        },500);//全部加载完成，500ms后运行其他模块加载
        
        //;
        //处理判断是否是浮动窗口
        setTimeout(function(){
            var data = uexWindow.getUrlQuery();
            if(data) 
            {
                app.zhu_name = data;
                app.status = "fu";
            }else{
                app.status = "zhu";
            }
        },100);
        
        
        //--最后才处理ready事件
        for(var i in app.__ready) 
        {
            app.__ready[i]();
        }
        
        
        app._ios_auto_scroll();
    });
};
/*
app.set_init = function(callBack){ //设置页面初始化
    appcan.ready(function(){
        callBack();
        app.set_window_state(function(e){
            if(e==0) 
            {
                callBack();
            }
        });
    });
};*/
app.__init_style = function(){ //初始化样式
    //Header
    
    if($("#Header").length!=0&&$(".scrollbox").length!=0) 
    {
        var h = $("#Header")[0].clientHeight;
        $(".scrollbox").css("paddingTop",h+'px');
    }
    
    var obj = {};
    obj = $(".js-style-h");//长宽比例需要初始化的 其中 这个元素的data-style="244(宽)/358(高)",如果没有，就 默认1
    if(obj.length!=0) 
    {
        for(var i =0; i < obj.length; i++) 
        {
            var temp = $(obj[i])[0];
            var bl = $(temp).data("style");
            if(!bl) 
            {
                bl=1;    
            }else{
                bl = bl.split("/");
                bl = parseInt(bl[0])/(parseInt(bl[1]));
                if(isNaN(bl)) 
                {
                   bl =  1;
                   //console.log("异常:初始化失败,参数异常,默认为1(app.init_style)");
                }
            }
            var h = parseInt($(obj[i])[0].clientWidth*bl);
            $(obj[i]).css("height",h+'px');
        }
    }
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
app.set_view = function(obj,condition,status){//设置显示-隐藏
    if(!condition||condition==undefined||condition==null||condition==0||condition=='0.00') 
    {
        var str = "none !important";
    }else{
        var str = "block !important";
    }
    status = status || false;
    if(status) 
    {
        // alert(str);
        if(str=="none !important") 
        {
            str = "block !important";
        }else{
            str = "none !important";
        }
        //alert(str);
    }
    
    $(obj).css("display",str)
    
}
app.get_html = function(status,data){
    var obj = $("[data-html]");
    
    data = data || {};
    for(var i =0; i < obj.length; i++) 
    {
        var name = obj[i].tagName;
        if(name=="INPUT") 
        {
            data[$(obj[i]).data("html")] = obj[i].value;
        }else if(status){
            data[$(obj[i]).data("html")] = obj[i].innerHTML;
        }
    }
    
    return data;
}
app.create_list = function(data,callBack){ //创建列表处理
    for(var i in data) 
    {
        callBack(data[i]);
    }
};
app.alert = function(text,callBack){
    appcan.window.alert({
        title:'提示',
        content:text,
        buttons:'确定',
        callback:callBack
    });
}
app.fy = {  //默认从第一页开始
    init:function(data){ //只是初始化,不能运行    必须以数组的方式分页
        this.inits(data);
    },
    _fy_data:new Array(),
    inits:function(data)  //
    {
        var that = this;
        
        for(var i in data) 
        {
            var temp = data[i];
            if(!temp.start || typeof(temp.start) != 'function') 
            {
                app.show(i+"没有设置回调：start");
                return;
            }
            if(!temp.success || typeof(temp.success) != 'function') 
            {
                app.show(i+"没有设置回调：success");
                return;
            }
            if(!temp.error || typeof(temp.error) != 'function') 
            {
                app.show(i+"没有设置回调：error");
                return;
            }
            if(!temp.end || typeof(temp.end) != 'function') 
            {
                app.show(i+"没有设置回调：end");
                return;
            }
            if(!temp.first || typeof(temp.first) != 'function') 
            {
                app.show(i+"没有设置回调：first");
                return;
            }
            
            if(!temp.data || typeof(temp.data) != "object") 
            {
                temp.data = {};
            }
            if(!temp.url) 
            {
                app.show(i+"没有设置路由：error");
                return;
            }
        }
        
        that._fy_data = data;
        
        app.set_scroll_bottom(function(){
            app.fy._run();
        });
    },
    ___run_index:0,
    run:function(i,data){ //data，可以传递本次需要修改数据
        this.___run_index++;
        
        var temp = this._fy_data[i];
        
        this.___fy_ajax_data = app.copy(temp.data); //分页参数
        if(data!=undefined) 
        {
            for(var i in data) 
            {
                this.___fy_ajax_data[i] = data[i];
            }
        }
        
        this.___fy_ajax_data.run_index = this.___run_index;
        this.___fy_ajax_data.p = 0;
        //this.___fy_ajax_data.index = this.___run_index;
        this.____fy_data_number = 0;
        
        this.___fy_url = temp.url;
        this.___fy_success = temp.success;
        this.___fy_end = temp.end;
        //this.___fy_start();//开始分页
        temp.first();
        this.___fy_start = temp.start;
        this.___fy_error = temp.error;
        this.___fy_callBack = temp.callBack || 'none';
        
        this._run();
    },
    ___fy_url:"",
    ___fy_success:"",
    ___fy_end:"",
    ___fy_error:"",
    ___fy_start:"",
    ___fy_ajax_data:"",//分页
    ____last_run_index:-1,
    ____ajax_status:false,
    ____fy_data_number:0,
    _run:function(){  //设置好分页参数后，调用这里进行分页
        //分页默认从第一页开始
        // alert(this.____last_run_index+":"+this.___run_index);
        if(this.____last_run_index != this.___run_index) 
        {
            this.____ajax_status = false;
        }
        if(this.____ajax_status) //正在进行ajax请求，这里不触发
        {
           return; 
        }
        this.____ajax_status = true;
        
        
        this.___fy_ajax_data.p++;
        var that = this;
        
        var index = this.___run_index;//当前分页类型运行数字
        this.____last_run_index = this.___run_index;
        app.ajax(this.___fy_url,this.___fy_ajax_data,function(e){
            if(index!=that.___run_index) 
            {
                return;
            }
            // if(e.page.size == e.page.number) 
            // {
                // this.___fy_ajax_data = false;
            // }
            
            if(e.code == 'success') 
            {
                if(typeof(that.___fy_callBack)=="function") 
                {
                    that.___fy_callBack(e); //回调
                }
                
                //console.log(e);
                var data = e.data.list;
                var arr = new Array();
                for(var i in data) 
                {
                    arr[arr.length] = data[i];
                }
                //if(arr.length!=0) 
                {
                    that.____fy_data_number += arr.length;
                    that.___fy_success(arr,arr.length,e.data);
                }
                if(arr.length < e.data.page.size) 
                {
                    that.___fy_end(that.____fy_data_number);//结束
                }else{
                    that.____ajax_status = false;
                }
            }else{
                that.___fy_error();
            }
        },function(){
            if(index!=this.___run_index) 
            {
                return;
            }
            that.____ajax_status = false;
            
            //--网络错误
            that.___fy_error();
        });
    }
    
}
app.set_max_img = function(){
    var _max_img_status = false;
    $(document).on("click",".sr-max-img-show",
    //click(".sr-max-img-show",'',
    function(){
        if(_max_img_status) 
        {
            return false;
        }
        _max_img_status = true;
        event.stopPropagation();
        
        var src = $(this).attr("src");
        //console.log(src);
        
        var obj = $(".model-max-img");
        if(obj.length == 0) 
        {
            var str = ''
                //+ ' <div class="s-model" style="display: block;"> '
                    + ' <div class="s-model-bg"></div> '
                    + ' <div class="ub ub-ver" style="position: absolute;left:0;top:0;background: white;width:90%;height:85%;margin:5%; z-index: 99998;"> '
                        + ' <div class="ub-f1 max-img-div"><img style="width:100%;height:100%;float:left;" src="" /></div> '
                        + ' <div class="s-h3 ub-center s-b-t s-ht s-on-bc close">关闭</div> '
                    + ' </div> '
                //+ ' </div> '
            var obj = app.create_label(document.body,"div","s-model model-max-img",str);
            
            click($(obj).find(".close"),"",function(){
                event.stopPropagation();
                setTimeout(function(){
                    $(obj).find(".max-img-div img").attr("src","");
                    $(obj).css("display","none");
                    _max_img_status = false;
                },150);
            })
        }
        $(obj).find(".max-img-div img").attr("src",src);
        $(obj).css("display","block");
        
        if(!obj._status) 
        {
            obj._status = true;
            var div = $(obj).find(".max-img-div")[0];
            var h = div.clientHeight;
            $(obj).find(".max-img-div img").css("height",h+'px');            
        }
    });
}
app.magnify_image = function(obj) 
{
    if(!obj) 
    {
        return false;
    }
    if(typeof obj == "object") 
    {
        var src = $(obj).attr("src")
    }else{
        var src = obj;
    }
    
    var obj = $(".model-max-img-new");
    if(obj.length == 0) 
    {
        var str = ''
            //+ ' <div class="s-model" style="display: block;"> '
                + ' <div class="s-model-bg"></div> '
                + ' <div class="ub ub-ver" style="position: absolute;left:0;top:0;background: white;width:90%;height:85%;margin:5%; z-index: 99998;"> '
                    + ' <div class="ub-f1 max-img-div"><img style="width:100%;height:100%;float:left;" src="" /></div> '
                    + ' <div class="s-h3 ub-center s-b-t s-ht s-on-bc close">关闭</div> '
                + ' </div> '
            //+ ' </div> '
        var obj = app.create_label(document.body,"div","s-model model-max-img-new",str);
        
        click($(obj).find(".close"),"",function(){
            event.stopPropagation();
            setTimeout(function(){
                $(obj).find(".max-img-div img").attr("src","");
                $(obj).css("display","none");
                
                setTimeout(function(){
                    obj._show_status = false;
                },150);
                
            },150);
        })
    }
    if(obj._show_status) 
    {
        return;
    }
    obj._show_status = true;
    
    $(obj).find(".max-img-div img").attr("src",src);
    $(obj).css("display","block");
    
    if(!obj._status) //只初始化一次
    {
        obj._status = true;
        var div = $(obj).find(".max-img-div")[0];
        var h = div.clientHeight;
        $(obj).find(".max-img-div img").css("height",h+'px');            
    }
}
//自动加载ios滚动条相关
app._ios_auto_scroll = function(){
    if(app.get_system()!='ios') 
    {
        return false;
    }
    var objs =  $("[data-ios='list']");
    if(objs.length == 0) 
    {
        return false;
    }
    
    var fixed_objs = $("[data-ios='fixed']");
    if(fixed_objs.length == 0) 
    {
        return false;
    }
    var h = 0;
    for(var i =0; i < fixed_objs.length; i++) 
    {
        h+= fixed_objs[i].clientHeight;
    }
    if(h==0) 
    {
        return false;
    }
    h = document.body.clientHeight - h;
    $(objs).css({
        "height":h+'px',
        '-webkit-overflow-scrolling':'touch',
        'width':'100%',
        'overflow-y':'scroll',
        'overflow-x': 'hidden'
    }); 
    
    
    app.set_scroll_bottom = function(callBack){
        $('[data-ios="list"]').scroll(function(){
            //console.log(this.scrollHeight,'-',this.scrollTop,'-',this.clientHeight)
            if(this.scrollHeight < this.clientHeight+this.scrollTop+10) 
            {
                var a = new Date().getTime();
                if(this._time - a >150) 
                {
                    return;
                }
                console.log("滚动到底部");
                callBack();
            }
        });
    }
    
}


app.init();


//1.
var sys_text_h_temp = false;
function set_text(text,css) //设置文字显示     输入文字，和css,返回一行显示数据
{
    css = css || "s-icon-11 ub-center s-yuan";
    text = text || "洗";
    if(typeof(text)=="object") 
    {
        if(text.goods_way != undefined) 
        {
            text = text.goods_way;
        }else if(text.way != undefined) 
        {
            text = text.way;
        }else {
            text = "洗 ";
        }
    }
    
    if(text=="团"||text=='团单') 
    {
        return __set_text("团",css,"#41a4d3");
    }
    
    if(!sys_text_h_temp)
    {
        sys_text_h_temp = app.get_h("sys_yi_type").way;
        if(!sys_text_h_temp) 
        {
            return __set_text(text[0],css,"#309380"); 
        }
    }
    for(var i in sys_text_h_temp) 
    {
        if(sys_text_h_temp[i].name == text) 
        {
            return __set_text(sys_text_h_temp[i].text,css,sys_text_h_temp[i].background_color);
        }
    }
    return __set_text(text[0],css,"#309380"); 
}
function __set_text(text,css,color) 
{
    return '<div class="'+css+'" style="color:white;background-color:'+color+';"><div class="s-fs-6">'+text+'</div></div>';
}







var picker = { //data 必须传二维数组，如果只有一列，那么第一个数组只有0才有数据
    data:new Array(),
    fu_callBack:function(){
        var data = app.get_h("sys_picker_data");
        
        if(typeof(data)=="object") 
        {
            this._fu_callBack(data.type,data.start,data.end,data.text);
        }else{
            this._fu_callBack(data)
        }
    },
    _fu_callBack:function(){
        
    },
    init:function(title,data,callBack_affirm,callBack_change,index){
      callBack_change = callBack_change || function(){};
      
      var picker1 = new Picker({
        data: data,
        title:title?title:"",
        selectedIndex:index
      });
      // var objs = $(".picker-mask");
      // var obj = objs[objs.length-1];//最后一个
      // click(obj,function(){
          // picker1.hide();
      // });
      picker1.on('picker.select', function (selectedVal, selectedIndex) {
        //console.log("选择：",selectedVal,selectedIndex);
        callBack_affirm(selectedVal);
      });
      picker1.on('picker.change', function (index, selectedIndex) {
        //console.log("改变：",index,selectedIndex); //滑动改变后调用  selectedIndex：改变后的value
        callBack_change(selectedIndex);
      });
      /*picker1.on('picker.valuechange', function (selectedVal, selectedIndex) {
        //console.log("改变2：",selectedVal,selectedIndex);
        
      });
      */
     // console.log(picker1);
      this.data[this.data.length] = picker1;
      
      /*console.log(app.window_name);
      if(app.window_name == "z-pack-1") 
      {
          picker1.show();
      }*/
      picker1.show();
      
    },
    show:function(index){
        index = index || 0;
        this.data[index].show();
    }
}

function open_pick() 
{
    app.open_pop('z-pack-1');//打开pack浮动窗口
}
function set_pick(text,callBack) 
{
    app.set_h("sys_pick_title",text);
    picker._fu_callBack = callBack;
}

function get_date() 
{
    var a = app.get_time_number();//今日凌晨时间戳]
    var b = app.get_time_str(a);
    var time = app.get_time_number(b.y+'-'+b.m+'-'+b.d);
    //console.log(time);
    var arr = new Array();
    for(var i = 0; i < 7; i++) 
    {
        arr[i] = app.get_time_str(time);
        
        arr[i].value = time;//时间戳
        arr[i].text = /*arr[i].y+'-'+*/arr[i].m+'-'+arr[i].d+'('+arr[i].week+')'
        
        time+=86400;//增加一天
    }
    
    return arr;
}
function set_time_pick(title,callBack_success,callBack_change,status)  //设置时间选择，，石使用默认的
{
    callBack_change = callBack_change||function(){};
    callBack_success = callBack_success||function(){};
    title = title || "";
    status = status || '1';//1-默认有立即选项  其他的话没有
    
    var time_data = app.get_h("sys_time_data");
    if(time_data) 
    {
        ___set_time_pick(title,time_data,callBack_success,callBack_change,status);
    }else{
        app.ajax("/s/api/order/get/qu/yu/time",{},function(e){
            /*picker.init("",[get_date(),e.data.list],function(e){
                callBack_success(e);
            });
            // picker.show();
            app.set_h("sys_time_data",e.data.list);
            */
            ___set_time_pick(title,e.data.list,callBack_success,callBack_change,status);
            app.set_h("sys_time_data",e.data.list); 
        });
    }
}
function ___set_time_pick(title,data,callBack_success,callBack_change,status) 
{
    var d = get_date();
    var d1 = new Array();
    if(status=='1') 
    {
        d1[0] = {
            text:"立即",
            value:"0"
        }
        for(var i in d) 
        {
            d1[i*1+1] = d[i];
        }
    }else{
        d1 = d;
    }
    //console.log(d1,data);
    picker.init(title,[d1,data],function(e){
        //callBack_success(e); //处理时间选择，返回两个时间戳
        //console.log(e);
        var start = 0;
        var end = 0;
        
        if(e[0]=="立即"||e[0]==0) 
        {
            var type = "1";
            var text = "立即取衣";
        }else{
            var type = "2";
            for(var i in data) 
            {
                //console.log("xx",data,e[1]);
                if(data[i].value == e[1]) 
                {
                    //console.log("选择的内容：",data[i]);
                    start = data[i].start*1+e[0]*1;
                    end = data[i].end*1+e[0]*1;
                    
                    var t = app.get_time_str(e[0]);
                    var text = t.y+'-'+t.m+'-'+t.d + '('+t.week+') '+ data[i].content;
                    //console.log(text);
                }
            }
        }
        callBack_success(type,start,end,text);
    },function(e){
        callBack_change(e);
    });
}

function set_time_text(obj,start,end) 
{
    if(end==undefined) 
    {
        end = start;
        start = obj;
        obj = "";
    }
    
    var t = app.get_time_str(start);
    var t1 = app.get_time_str(end);
    var text = t.y+'-'+t.m+'-'+t.d+'('+t.week+') '+t.h+':'+t.i+'~'+t1.h+':'+t1.i;
    if(obj) 
    {
        $(obj).html(text);
    }
    
    return text;
}



function add_yi_type(type,name) //增加衣服的属性  属性名称，姓名   支持：type,serve,flaw,color,brand
{
    
}


function open_order_info(id,type) //打开订单详情
{
    type = type || 'id';
    if(type!="code" && type != "id") 
    {
        alert("参数异常-open_order_info()");
        return;
    }
    
    app.open_window("02-c-04-order-info-2-new",{
        id:id,
        type:type,
        "code":id
    });
}
function open_order_yi_info(id,type) //搜索衣服 
{
    type = type || 'id';
    if(type!="code" && type != "id") 
    {
        alert("参数异常-open_order_info()");
        return;
    }
    
    app.open_window("02-c-04-order-info-2-yi",{
        id:id,
        type:type,
        "code":id
    });
}

var div_move = {
    x:0,
    y:0,
    init:function(id,click_call) 
    {
        var obj = $(id)[0];
        
        if(click_call)
        {
            click(id,function(){
                click_call();
            });
        } 
        
        
        var that = this;
        obj.addEventListener("touchstart",function(event){
            
            // var left = event.target.offsetLeft;
            // var top = event.target.offsetTop;
            // that.x = event.targetTouches[0].pageX-left;
            // that.y = event.targetTouches[0].pageY-top;
//             
            // app.show(event.targetTouches[0].pageX+'-'+event.target.offsetLeft);
//             
            // alert_(event.targetTouches[0].pageX);
            
            
            var a = event.targetTouches[0].target.clientHeight/2;
            that.x = a;
            that.y = a;
            
            
            
            //window.style.overflow='hidden'
            //document.documentElement.style.overflow='hidden';
        });
        obj.addEventListener("touchmove",function(event){
            var left = event.targetTouches[0].clientX-that.x; 
            var top = event.targetTouches[0].clientY-that.y; 
            
            this.style.left = left+'px';
            this.style.top = top+'px';
            
            event.preventDefault();
            return false;
        });
        obj.addEventListener("touchend",function(event){
            //document.documentElement.style.overflow='auto';
        });
        obj.addEventListener("touchcancel",function(event){
            //document.documentElement.style.overflow='auto';
        });
    }
}

function update_number(index) 
{
    //更新数字
    var type = app.get_h("sys_type");
    var win_name = "y-"+type+"-main";
    
    app.run_script(win_name,"count_main.update("+index+")");
}

function qian_dao() 
{
    // app.get_location(function(data){
        // app.ajax("login");
    // });
}


function add_type_color_serve_brand(type,name) //type,表名字 
{
    app.ajax("/s/add/type/brand/serve",{
        "type":type,
        name:name
    })
}

var ajax_config_time = [
    {
        //接单
        "url":"/s/api/index/shou/recv/sms",
        "time":5000,
    },
    {
        //预约下单
        "url":"/s/api/index/add/user/order",
        "time":15000,
    },
    {
        //直接下单
        "url":"/s/api/index/xia/dan",
        "time":15000,
    },
    {
        //接单
        "url":"/s/api/index/shou/recv",
        "time":15000,
    },
    {
        //取消订单
        "url":"/s/api/index/order/cancel",
        "time":15000,
    },
    {
        //派单
        "url":"/s/api/order/pai",
        "time":15000,
    },
    {
        //收衣订单，取衣服
        "url":"/s/api/add/yi/new",
        "time":15000,
    },
    {
        //提交客户确认
        "url":"/s/api/index/order/user/affirm",
        "time":15000,
    },
    {
        //验衣保存
        "url":"/s/api/index/order/yan",
        "time":15000,
    },
    {
        //添加收衣架
        "url":"/s/api/index/order/yi/jia",
        "time":15000,
    },
    {
        //拆分订单
        "url":"/s/api/index/order/cai",
        "time":15000
    },
    {
        //网点订单接单
        "url":"/s/api/index/point/qu/yi/jie/dan",
        "time":15000,
    },
    {
        //网点收衣订单保存
        "url":"/s/api/index/point/qu/yi/save",
        "time":15000,
    },
    {
        //非本门店衣服,添加收衣架
        "url":"/s/api/chang/shop/recv/chang/yi/jia",
        "time":15000,
    },
    {
        //修改预约时间
        "url":"/s/api/index/shou/edit/time",
        "time":15000,
    },
    {
        //到访不遇
        "url":"/s/api/index/order/send/mag",
        "time":15000,
    },
    {
        //检查验证码
        "url":"/s/api/index/shou/recv/check/sms",
        "time":15000,
    },
    {
        //送衣订单，接单
        "url":"/s/api/index/order/send/jie",
        "time":15000,
    },
    {
        //修改送衣时间
        "url":"/s/api/index/song/edit/time",
        "time":15000,
    },
    {
        //待客付款
        "url":"/s/api/user/pay/order",
        "time":15000,
    },
    {
        //网点
        "url":"/s/api/index/point/order/yi/save",
        "time":15000,
    },
    {
        //团单-直接下单
        "url":"/s/api/index/xia/dan",
        "time":15000,
    },
    {
        //处理售后
        "url":"/s/api/order/shou/dispose",
        "time":15000,
    },
    {
        //添加外包订单
        "url":"/s/api/wai/order/add",
        "time":15000,
    },
    {
        //衣服、收衣袋打包
        "url":"/s/api/chang/shop/add/order",
        "time":15000,
    },
    {
        //待客充值
        "url":"/s/api/user/check/recharge",
        "time":15000,
    },
    
    
    
    
    
    
    
    
    //-----------司机
    {
        //收衣
        "url":"/s/api/diver/plant/recv/yi/save",
        "time":15000,
    },
    {
        //发车
        "url":"api/fache",
        "time":15000,
    },
    {
        //提交门店
        "url":"/s/api/diver/select/post/store",
        "time":1000,
    },
    {
        //司机接单
        "url":"/s/api/diver/store/order/recv/order",
        "time":1000,
    },
    {
        //提交工厂
        "url":"/s/api/diver/store/order/post/plant",
        "time":1000,
    }
    
    
    
    
    
    
    
    
    
];


//-----------------其他说明----------------
/*
 * animId:动画类型Id
    0: 无动画
    1: 从左向右推入
    2: 从右向左推入
    3: 从上向下推入
    4: 从下向上推入
    5: 淡入淡出
    6: 左翻页
    7: 右翻页
    8: 水波纹
    9: 由左向右切入
     10: 由右向左切入
      11: 由上先下切入
      12: 由下向上切入
      13: 由左向右切出
      14: 由右向左切出
      15: 由上向下切出
      16: 由下向上切出
 * 
 */
