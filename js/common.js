define(['_', 'layer', 'config', 'common'], function(_, layer, config) {
    return {
        //系统提醒
        msg: function(msg, icon, timer) {
            timer = (timer == undefined ? 1500 : timer*1000);
            layer.msg(msg, {
                icon: icon,
                anim: 0,
                time: timer
            });
        },
        //系统弹出提醒
        alert: function(msg, icon, callback) {
            layer.msg(msg, {
                title: '',
                icon: icon,
                shade: 0.3,
                shadeClose: false,
                btnAlign: 'c',
                btn: ['我知道了'],
                time: 9999999,
                yes: function(idx) {
                    if(callback)
                        callback();
                    layer.close(idx);
                }
            });
        },
        confrim: function(msg, callback) {
            var my = this;
            layer.msg(msg, {
                time: 9999999,
                icon: 3,
                shade: 0.3,
                shadeClose: false,
                btn: ['确 定', '取 消'],
                yes: function(index) {
                    if(callback)
                        callback();
                    layer.close(index);
                }

            });
        },
        //打开新窗体
        open: function(url, params, aniShow) {
            var my = this;
            if(!my.isBrowser) { //app跳转
                if(!aniShow) {
                    var anType = ['slide-in-right', 'slide-in-left', 'slide-in-top', 'slide-in-bottom', 'fade-in', 'zoom-out', 'zoom-fade-out', 'pop-in'];
                    var anIdx = Math.floor((Math.random() * anType.length));
                    if(mui.os.ios)
                        aniShow = anType[anType.length - 1];
                    else
                        aniShow = anType[0];

                }
                mui.openWindow({
                    id: url,
                    url: url,
                    extras: params,
                    createNew: false,
                    show: {
                        autoShow: true, //页面loaded事件发生后自动显示，默认为true
                        aniShow: aniShow, //anType[anIdx], //页面显示动画，默认为”slide-in-right“；
                        duration: 200 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                    },
                    waiting: {
                        autoShow: false, //自动显示等待框，默认为true
                        title: config.dictionary.strings.LOADING, //等待对话框上显示的提示内容
                        options: {
                            //back:'none',
                            background: 'rgba(0,0,0,0.75)',
                            round: 5,
                            loading: {
                                //icon: '/img/loading-png.png',
                                height: '50px',
                                display: 'inline'
                            }
                        }
                    },
                })
            } else { //浏览器跳转
                var newUrl = url;
                var newParams;
                if(params != null) {
                    newParams = my.jsonCom.jsonToUrlParam(params);
                    url += "?" + newParams;
                }
                //加随机参数清缓存
                if(url.indexOf('?') == -1)
                    url += '?_=' + (new Date().getTime());
                else
                    url += '&_=' + (new Date().getTime());
                top.location.href = url;
            }
        },
        //关闭窗体
        close: function() {
            if(!this.isBrowser) {
                var ws = plus.webview.currentWebview();
                plus.webview.close(ws);
            } else
                history.back();
        },
        exit: function() {
            plus.runtime.quit();
        },
        //双击返回退出APP
        backExit: function() {
            var my = this;
            if(!my.isBrowser) {
                var _clickNum = 0;
                mui.init({
                    beforeback: function() {
                        _clickNum++;
                        if(_clickNum > 1) {
                            plus.runtime.quit();
                        } else {
                            my.msg("再按一次退出应用");
                        }
                        setTimeout(function() {
                            _clickNum = 0;
                        }, 1000);
                        return false;
                    }
                });
            }
        },
        //获取当前页面ID
        currPageId: function(callback) {
            if(sysCom.isBrowser)
                callback(location.href);
            else {
                mui.plusReady(function() {
                    callback(plus.webview.getLaunchWebview().getURL());
                });
            }
        },
        //获取页面参数
        getParam: function(key, callback) {
            if(!sysCom.isBrowser) {
                mui.plusReady(function() {
                    var wv = plus.webview.currentWebview();
                    var value = wv[key];
                    callback(value);
                });
            } else {
                var value = urlCom.getParam(key);
                callback(value);
            }
        },
        //获取URL所有参数
        GetUrlParms: function() {
            var args = new Object();
            var query = location.search.substring(1); //获取查询串
            var pairs = query.split("&"); //在逗号处断开
            for(var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('='); //查找name=value
                if(pos == -1) continue; //如果没有找到就跳过
                var argname = pairs[i].substring(0, pos); //提取name
                var value = pairs[i].substring(pos + 1); //提取value
                args[argname] = decodeURIComponent(value); //存为属性
            }
            return args;
        },
        //是否是普通浏览器打开
        isBrowser: !mui.os.plus,
        //loading弹出层
        loading: function() {
            var box = $('#loading-layout');
            if(box.length == 0) {
                $('body').append('<div id="loading-layout"><div class="loading"></div></div>');
                box = $('#loading-layout');
            }
            var box_loading = $('#loading-layout .loading');
            var width = box.width();
            var height = box.height();
            var width_loading = box_loading.width();
            var height_loading = box_loading.height();
            $('#loading-layout .loading').css('top', (height - height_loading) / 2 + 'px')
            $('#loading-layout .loading').css('left', (width - width_loading) / 2 + 'px')
            box.show();
        },
        //关闭弹出层
        loadingClose: function(timer) {
            setTimeout(function() {
                $('#loading-layout').remove();
            }, (timer ? timer : 0))
        },
        /******* http 请求 *******/
        //请求 get
        ajax: function(type, url, params, callback, callbackErr, el) {
            var my = this;
            if(!config.appCONFIG.netStatus) {
                my.msg(config.dictionary.strings.NO_NET_POST)
                if(callbackErr)
                    callbackErr(config.dictionary.strings.NO_NET_POST);
                return false;
            }
            var el_txt = '';
            var timer;
            var timer_sec = 0;
            if(el) {
                el_txt = $(el).text();
                $(el).attr('disabled', true).text('正在提交');
                timer = setInterval(function() {
                    if(timer_sec < 3) {
                        $(el).text($(el).text() + '.');
                        timer_sec++;
                    } else {
                        $(el).text('正在提交');
                        timer_sec = 0;
                    }
                }, 500);
            }
            //my.loading();
            $.ajax({
                url: url,
                type: type, //GET
                async: true, //或false,是否异步
                data: params,
                timeout: 15000, //超时时间
                dataType: 'jsonp',
                jsonp: "theFunction",
                success: function(data, textStatus, jqXHR) {
                    callback(data);
                },
                error: function(xhr, textStatus) {
                    if(textStatus == "error")
                        my.msg(config.dictionary.strings.SERVER_ERROR);
                    else if(textStatus == "timeout")
                        my.msg(config.dictionary.strings.TIMEOUT);
                    else {
                        //console.log(xhr.responseText)
                        var jsonXhr = JSON.parse(xhr.responseText);
                        //令牌错误重新登陆
                        if(jsonXhr.ExceptionMessage == config.dictionary.strings.INVALID_TOKEN) {
                            my.msg(config.dictionary.strings.INVALID_TOKEN_ERR);
                        } else {
                            my.msg("error：" + jsonXhr.ExceptionMessage);
                        }
                    }
                    if(callbackErr)
                        callbackErr(xhr, textStatus);
                },
                complete: function() {
                    //my.loadingClose();
                    if(el) {
                        $(el).text(el_txt)
                        $(el).removeAttr('disabled');
                        clearInterval(timer);
                    }
                }
            })
        },
        //系统自动更新
        update: function() {
            if(window.plus) {
                this.updateCheck();
            } else {
                document.addEventListener('plusready', this.updateCheck, false);
            }
        },
        //系统升级检测
        updateCheck: function() {
            var appVer = ''; //app版本
            var newVer = ''; //最新版本
            //获得当前版本
            plus.runtime.getProperty(plus.runtime.appid, function(inf) {
                appVer = inf.version;
                $('.copyright').html('现金秘书' + appVer);
                //console.log(1)
                //发起新版本请求检测
                var update_url = config.urlCONFIG.get_appupdate + "/version.txt?bust=" + (new Date().getTime());
                //console.log(update_url)
                $.get(update_url, {}, function(res) {
                    var data = JSON.parse(res);
                    newVer = data.version;
                    fileType = 'wgt';
                    if(appVer != newVer && parseInt(appVer.replaceAll('\\.', '')) < parseInt(newVer.replaceAll('\\.', ''))) {
                        var waiting = plus.nativeUI.showWaiting("有新版本啦，正在下载更新 0%...", {
                            width: '100%',
                            height: '100%',
                            //back: 'none',
                            round: 1,
                        });

                        //下载更新包                 
                        var file_downing = plus.downloader.createDownload(config.urlCONFIG.get_appupdate + "/wgt/" + newVer + "." + fileType + "?_=" + (new Date().getTime()), {
                            filename: "_doc/update/"
                        }, function(d, status) {
                            if(status == 200) {
                                var _filename = d.filename;
                                // 安装更新包
                                plus.runtime.install(_filename, {}, function() {
                                    //更新完毕删除更新包
                                    plus.io.resolveLocalFileSystemURL(_filename, function(entity) {
                                        entity.remove();
                                    }, function(error) {
                                        debugCom.log(error.message);
                                    });
                                    //如果是安卓自动重启应用，ios需要手动重启应用
                                    if(mui.os.android) {
                                        waiting.setTitle('更新完成，正在重新打开应用...');
                                        setTimeout(function() {
                                            plus.nativeUI.closeWaiting();
                                            plus.runtime.restart();
                                        }, 1000)
                                    } else {
                                        plus.nativeUI.closeWaiting();
                                        mui.alert('更新完成，请彻底结束应用并重新打开！', '', function() {
                                            //plus.runtime.restart();
                                        })
                                    }

                                }, function(e) {
                                    waiting.setTitle('更新失败:' + e.message);
                                    setTimeout(function() {
                                        plus.nativeUI.closeWaiting();
                                    }, 2000);
                                });
                            } else {
                                mui.toast('下载更新包出现问题:' + status)
                            }
                        });
                        //下载百分比
                        file_downing.addEventListener("statechanged", function() {
                            var per = parseInt(file_downing.downloadedSize / file_downing.totalSize * 100);
                            per = (per == NaN ? 0 : per);
                            waiting.setTitle("有新版本啦，正在下载更新 " + per + "%");
                        }, false);
                        //开始下载
                        file_downing.start();
                    }

                });
            })
        },
        /********验证********/
        validaCom: {
            //验证正则
            _regex: {
                mobile: /^1+\d{10}$/,
                isIDCard: /^\d{17}[\d|X|x]$|^\d{15}$/,
                email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
            },
            //验证手机
            isMobile: function(txt) {
                return this._regex.mobile.test(txt);
            },
            //验证邮箱
            isEmail: function(txt) {
                return this._regex.email.test(txt);
            },
            //身份证验证
            isIDCard: function(txt) {
                return this._regex.isIDCard.test(txt);
            },
        },
        /********json操作********/
        jsonCom: {
            //将json转成url参数
            jsonToUrlParam: function(param, key) {
                var my = this;
                var paramStr = "";
                if(param instanceof String || param instanceof Number || param instanceof Boolean) {
                    paramStr += "&" + key + "=" + encodeURIComponent(param);
                } else {
                    $.each(param, function(i) {
                        var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                        paramStr += '&' + my.jsonToUrlParam(this, k);
                    });
                }
                return paramStr.substr(1);
            },
            //将url参数转成json
            urlParamToJson: function(url) {
                if(url.indexOf("?") > -1) {
                    var string_a = url.split('?')[1];
                    if(string_a.length > 0) {
                        var string = string_a.split('&');
                        var res = {};
                        for(var i = 0; i < string.length; i++) {
                            var str = string[i].split('=');
                            res[str[0]] = str[1];
                        }
                        return res;
                    } else
                        return null;
                } else
                    return null;

            }
        },
        /********数据存储********/
        dataCom: {
            set: function(key, data) {
                localStorage.setItem(key, data);
            },
            get: function(key) {
                return localStorage.getItem(key);
            },
            remove: function(key) {
                localStorage.removeItem(key)
            },
            clear: function() {
                localStorage.clear();
            }
        },
        /*********** 网络监测 *************/
        netCom: {
            init: function() {
                var my = this;
                //网络检测
                mui.plusReady(function() {
                    if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
                        config.netStatus = false;
                        layer.msg(config.dictionary.strings.NO_NET);
                    }
                    document.addEventListener("netchange", my.change, false);
                });
            },
            change: function() {
                var my = this;
                mui.plusReady(function() {
                    //获取当前网络类型
                    var nt = plus.networkinfo.getCurrentType();
                    switch(nt) {
                        case plus.networkinfo.CONNECTION_ETHERNET:

                        case plus.networkinfo.CONNECTION_WIFI:

                        case plus.networkinfo.CONNECTION_CELL2G:

                        case plus.networkinfo.CONNECTION_CELL3G:

                        case plus.networkinfo.CONNECTION_CELL4G:
                            if(!config.netStatus) {
                                layer.msg(config.dictionary.strings.YES_NET);
                            }
                            config.netStatus = true;
                            break;
                        default:
                            if(config.netStatus) {
                                layer.msg(config.dictionary.strings.NO_NET);
                            }
                            config.netStatus = false;
                            break;
                    }
                });
            }
        },
        /*********** 用户信息 *************/
        account: {
            getUser: function() {
                var datauser = localStorage.getItem('user');
                if(datauser) {
                    return JSON.parse(datauser);
                } else {
                    return null;
                }
            }
        }
    }
});