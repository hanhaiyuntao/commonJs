/**
 * Created by 24028 on 2018/11/1.
 */
//1-    正责截取空字符串,用于非空校验
function myTrim(str) {
    let reg = /^\s+|\s+$/g;
    return str.replace(reg, "");
}
console.log(myTrim('    abcd    '));



//2-    按钮样式是否含有,有的话去除,没有的话添加并执行查询
function checkboxChoose() {
    $(document).on('click', '.checkboxSp', function () {
        var $this = $(this);
        if ($this.hasClass('chooseSp')) {

            $this.removeClass('chooseSp');
            //return;
        } else {

            $this.addClass('chooseSp');
            // return;
        }
        try {
            if (null != searchEvent) {
                searchEvent();
            }
        } catch (e) {

        }
    });
}

/*
*3 阻止冒泡
 */
//阻止冒泡得到引用事件
function getEvent() {
    if (window.event) { return window.event; }
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent
                || arg0.constructor == KeyboardEvent)
                || (typeof (arg0) == "object" && arg0.preventDefault
                && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}
function eventStop() {
    var e = getEvent();
    if (window.event) {
        e.returnValue=false;//阻止自身行为
        e.cancelBubble = true;//阻止冒泡
    } else if (e.preventDefault) {
        e.preventDefault();//阻止自身行为
        e.stopPropagation();//阻止冒泡
    }
}


//4-  获取url后的参数

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}



//5-    转化时间
//json格式时间转化为格式化时间 yyyy-MM-dd HH:mm:ss
var convertDateFuncHMS = function (jsondate) {
    if (jsondate != null && jsondate != "") {
        jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        if (jsondate.indexOf("+") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        } else if (jsondate.indexOf("-") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        }
        var date = new Date(parseInt(jsondate, 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second = date.getMilliseconds() / 1000 < 10 ? "0" + parseInt(date.getMilliseconds() / 1000) : parseInt(date.getMilliseconds() / 1000);
        return date.getFullYear() + "-" + month + "-" + currentDate + hours + ":" + minutes + ":" + second
    } else {
        return "";
    }
};


//json格式时间转化为格式化时间 yyyy MM dd HH mm ss
var convertDateFuncYMDHMS = function (jsondate) {
    if (jsondate != "" && jsondate != null) {
        jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        if (jsondate.indexOf("+") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        } else if (jsondate.indexOf("-") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        }
        var date = new Date(parseInt(jsondate, 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second = date.getMilliseconds() / 1000 < 10 ? "0" + parseInt(date.getMilliseconds() / 1000) : parseInt(date.getMilliseconds() / 1000);
        return date.getFullYear() + '' + month + currentDate + hours + minutes + second
    } else {
        return "";
    }
};



//json格式时间转化为格式化时间 yyyy-MM-dd
var convertDateFunc = function (jsondate) {
    if (jsondate != null && jsondate != "") {
        jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        if (jsondate.indexOf("+") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        } else if (jsondate.indexOf("-") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        }
        var date = new Date(parseInt(jsondate, 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + currentDate;
    } else {
        return "";
    }
};
/**
 * 在原有日期基础上,增加days天数
 * @param {*} date //当前传输日期
 * @param {*} days //增加天数
 */
function addDate(date, days) {
    if(days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var mm = "'" + month + "'";
    var dd = "'" + day + "'";

    //单位数前面加0
    if(mm.length == 3) {
        month = "0" + month;
    }
    if(dd.length == 3) {
        day = "0" + day;
    }

    var time = date.getFullYear() + "-" + month + "-" + day
    return time;
}

var addTime = addDate("2017-07-24", 2);
console.log(addTime);//2017-07-26
/**
*日期做差
*/
function dateSubstract(begin, end) {
    var dateStart = new Date(begin);
    var dateEnd = new Date(end);
    var difValue = (dateEnd - dateStart) / ((1000 * 60 * 60 * 24));
    return difValue;
}
// console.log(dateSubstract('2019-05-08', '2019-05-10'));//2


//6-    设置cookie(用在登录时,checked时保存周期)
/*
 * 记住密码和用户名
 */
//if ($('#remebers').is(':checked')) {
//    setCookie('n', obj.n, 30);
//    setCookie('p', obj.p, 30);
//} else {
//    setCookie('n', obj.n, -1);
//    setCookie('p', obj.p, -1);
//}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


//7-   获取cookie  下次登录时获取cookie
/*setTimeout(function () {
    var n = getCookie('n');
    var p = getCookie('p');
    if (n != null && n != '' && p != null && p != '') {
        $('#remebers').prop('checked', true);
        $('#txt_login_name').val(n);
        $('#txt_login_pwd').val(p);
    }
}, 100);*/
function getCookie(name) {
    var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }

}



//获取cookie值(兼容ios转码)
function GetCookie(cname) {
    var arr,reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        var cvalue = decodeURI(arr[2]);
        return cvalue;
    } else {
        return null;
    }
}



//设置cookie(兼容ios转码)
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    cvalue= encodeURI(cvalue);
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}



//8- 数组排序并去重

let arr1 = [1, 25, 2, 26, 1234, 6, 213];
let arr2 = [2, 6, 2134, 6, 31, 623];
let c = [...new Set([...arr1, ...arr2])].sort((a, b) => {
    return a - b;
});

//9-  ajax获取数据方法
var AjaxF = function (params, ipPort) {
    if (userToken == null || userToken == "" || userToken == undefined) {
        return new {
            success: false,
            message: "身份验证失败",
            data: null
        };
    } else {
        $.ajax({
            url: ipPort,
            type: "get",
            data: { usertoken: usertoken, params: params },
            dataType: "jsonp",
            success: function (data) {
                return new {
                    success: true,
                    message: "success",
                    data: data
                }
            },
            error: function (error) {
                return new {
                    success: false,
                    message: "error",
                    data: error
                }
            }
        });
    }
}
//调用
var objA = {
     property: [],//公司性质
     cityid: [],//办公地点
     setup_date: [],//成立年限
     b_company_scale: []//管理规模
}
var oUrl = 'GetPublicCompanyUpdateTime?jsoncallback=?'
var bigObj = AjaxF(objA,oUrl);
for(let i = 0;i<bigObj.data.length;i++){
    
}




/**对ie的兼容 */
//10- 根据毫秒获取时间【年-月-日】(兼容ie专用)
function GetDateByMillisecond(millisecond) {
    var date = new Date(millisecond.replace('-', '/'));//为了兼容IE　必须将－　换成／
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + currentDate;// + " " + hours + ":"

};

if (typeof handDate == "undefined") {
    var handDate = {};
    handDate.general = 0;  // 通用 yy-mm-dd
    handDate.generalLine = 1;//通用 yyyy-MM-dd HH:mm:ss
    handDate.generalNoLine = 2;//无格式yyyyMMddHHmmss
    handDate.generalTime = 3;//时分秒 HH:mm:ss
}
/**
 * *格式化时间
 * @param {} jsondate 
 * @param {} dateType 参照上面声明的handDate by WHT
 * @returns {} 
 */
var convertDateFunc = function(jsondate,dateType) {
    if (jsondate != null && jsondate != "") {
        jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        if (jsondate.indexOf("+") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        } else if (jsondate.indexOf("-") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        }
        var date = new Date(parseInt(jsondate, 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second = date.getMilliseconds() / 1000 < 10 ? "0" + parseInt(date.getMilliseconds() / 1000) : parseInt(date.getMilliseconds() / 1000);
        var res = 0;
        switch (dateType) {
            case handDate.general://yyyy-mm-dd
                res = date.getFullYear() + "-" + month + "-" + currentDate;
                break;
            case handDate.generalLine://yyyy-MM-dd HH:mm:ss
                res = date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + second;
                break;
            case handDate.generalNoLine:// yyyyMMddHHmmss
                res = date.getFullYear() + '' + month + currentDate + hours + minutes + second;
                break;
            case handDate.generalTime:// HH:mm:ss
                res = hours + ":" + minutes + ":" + second;
                break;
        }
        return res;
    } else {
        return "";
    }
}

convertDateFunc(value,handDate.generalLine)




/**
 * 11-判断某个 Array中;某个对象的值是否存在
 * @param {ary} ary 
 * @param {变量名} d 
 * @param {变量值} v 
 * @returns {} 
 */
function ary_Contins(ary, d, v, dc, vc) {
    var ishave = false;
    ary.forEach(item => {
        if (dc != null) {//条件筛选;
            if (eval((dc != null ? 'item.' : '') + dc) === vc) {
                if (eval((d != null ? 'item.' : '') + d) === v) {
                    ishave = true;
                }
            }
        } else {
            if (eval((d != null ? 'item.' : '') + d) === v) {
                ishave = true;
            }
        }

    });
    return ishave;
}


//11- 输入框数字小数点校验
/**input选择框只能输入数字和小数点*/
$("input").on("keyup",function(){
    var newVal = $(this).val();
    $(this).val(newVal.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,''));
    });


//12- 滚动条底部加载到底部加载更多
    /**判断滚动条是否滚动到底部 */
    document.getElementById('contentContainer').onscroll=function(){
    if(this.scrollTop+this.offsetHeight>=this.scrollHeight){
        pbPageNum++;
    }
}    



//13-    call和apply的区别

function changeStyle(attr, value){
    this.style[attr] = value;
}
var box = document.getElementById('box');
window.changeStyle.call(box, "height", "200px");//改变this指向并调用window方法,传入字符串
window.changeStyle.apply(box, ['height', '200px']);//改变this指向并调用window方法,传入数组




/*
 * 14 -   二元加法（保留精度）
 */
var addition = function (arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
};

/*
 * 二元减法（保留精度）
 */
var subtraction = function (arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度  
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
};

/*
 * 二元乘法（保留精度）
 */
var multiplication = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};

/*
 * 二元除法（保留精度）
 */
var division = function (arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
};



/*
 *15    -函数抖动节流(onmouseover,onresize,onscroll);
 */
/**
 * 
 * @param {} fn 函数名
 * @param {} delay 延迟时间
 * @param {} mustDelay 间隔时间 触发
 * @returns {} 
 */
function delayFn (fn, delay, mustDelay){
     var timer = null;
     var t_start;
     return function(){
         var context = this, args = arguments, t_cur = +new Date();
         //先清理上一次的调用触发（上一次调用触发事件不执行）
         clearTimeout(timer);
         //如果不存触发时间，那么当前的时间就是触发时间
         if(!t_start){
             t_start = t_cur;
         }
         //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
         if(t_cur - t_start >= mustDelay){
             fn.apply(context, args);
             t_start = t_cur;
         }
         //否则延迟执行
         else {
             timer = setTimeout(function(){
                 fn.apply(context, args);
             }, delay);
         }
     };
}
/**
 * 函数节流,减少资源消耗
 */
window.onscroll = delayFn(scrollHead, 100, 100);




/** 16 -  粘贴自动携带版本声明 */
 document.addEventListener('copy', function (event) {
        var clipboardData = event.clipboardData || window.clipboardData;
        if (!clipboardData) { return; }
        var text = window.getSelection().toString();
        if (text) {
            event.preventDefault();
            clipboardData.setData('text/plain', text + '\n\n王海涛版权所有');
        }
    });

    
/**破译禁止复制 */
javascript:document.body.oncopy=null;void(0);

/**17  -js实现页面粘贴图片直接ajax上传实例页面** */

document.addEventListener('paste', function (event) {
    var items = (event.clipboardData || window.clipboardData).items;
    var file = null;
    if (items && items.length) {
        // 搜索剪切板items
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                file = items[i].getAsFile();
                break;
            }
        }
    } else {
        log.innerHTML = '<span style="color:red;">当前浏览器不支持</span>';
        return;
    }
    if (!file) {
        log.innerHTML = '<span style="color:red;">粘贴内容非图片</span>';
        return;
    }
    // 此时file就是我们的剪切板中的图片对象
    // 如果需要预览，可以执行下面代码
    var reader = new FileReader()
    reader.onload = function(event) {
        preview.innerHTML = '<img src="' + event.target.result + '" class="upload-image">';
    }
    reader.readAsDataURL(file);
    // 如果不需要预览，上面这段可以忽略

    // 这里是上传
    var xhr = new XMLHttpRequest();
    // 上传进度
    if (xhr.upload) {
        xhr.upload.addEventListener('progress', function (event) {
            log.innerHTML = '正在上传，进度：' + Math.round(100 * event.loaded / event.total) / 100 + '%';
        }, false);
    }
    // 上传结束
    xhr.onload = function () {
        var responseText = xhr.responseText;
        log.innerHTML = '上传成功，地址是：' + responseText;
    };
    xhr.onerror = function () {
        log.innerHTML = '<span style="color:red;">网络异常，上传失败</span>';
    };
    xhr.open('POST', './upload.php', true);
    xhr.setRequestHeader('FILENAME', encodeURIComponent(file.name));
    xhr.send(file);
});


/*18-   冻结表格头部*/
    function scorllFixHead(ele,eleHeader)
    {
        var pre_scrollTop=0;//滚动条事件之前文档滚动高度
        var pre_scrollLeft=0;//滚动条事件之前文档滚动宽度
        var fixTh =document.getElementById(eleHeader);
        var myWrap= document.getElementById(ele);
        pre_scrollTop = myWrap.scrollTop;
        pre_scrollLeft =myWrap.scrollLeft;
        myWrap.onscroll = function(){
            if(pre_scrollTop != myWrap.scrollTop){
                //滚动了竖直滚动条
                pre_scrollTop=myWrap.scrollTop;
                if(fixTh){
                    fixTh.style.top= myWrap.scrollTop+"px";
                }
            }
            else if(pre_scrollLeft != myWrap.scrollLeft){
                //滚动了水平滚动条
                pre_scrollLeft=myWrap.scrollLeft;
            }
        }
    }


/***18-子级滚动完父级不再执行滚动 */

$.fn.scrollUnique = function() {
    return $(this).each(function() {
        var eventType = 'mousewheel';
        // 火狐是DOMMouseScroll事件
        if (document.mozHidden !== undefined) {
            eventType = 'DOMMouseScroll';
        }
        $(this).on(eventType, function(event) {
            // 一些数据
            var scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = this.clientHeight;

            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);        

            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                this.scrollTop = delta > 0? 0: scrollHeight;
                // 向上滚 || 向下滚
                event.preventDefault();
            }        
        });
    });	
};

/**
 * *19-拖动滑块(移动端仿360悬浮小球拖动)
 * @param {} drag:拖动的id
 * @returns {} 
 */
function dragBlock(drag) {
    //限制最大宽高，不让滑块出去
    var maxW = document.body.clientWidth - drag.offsetWidth;
    var maxH = document.body.clientHeight - drag.offsetHeight;
    //手指触摸开始，记录div的初始位置
    drag.addEventListener('touchstart', function (e) {
        var ev = e || window.event;
        var touch = ev.targetTouches[0];
        oL = touch.clientX - drag.offsetLeft;
        oT = touch.clientY - drag.offsetTop;
        beginX = touch.clientX;
        beginY = touch.clientY;
        document.addEventListener("touchmove", defaultEvent, { passive: false });
    }, { passive: false });
    //触摸中的，位置记录
    drag.addEventListener('touchmove', function (e) {
        var ev = e || window.event;
        var touch = ev.targetTouches[0];
        var oLeft = touch.clientX - oL;
        var oTop = touch.clientY - oT;
        if (oLeft < 0) {
            oLeft = 0;
        } else if (oLeft >= maxW) {
            oLeft = maxW;
        }
        if (oTop < 0) {
            oTop = 0;
        } else if (oTop >= maxH) {
            oTop = maxH;
        }
        drag.style.left = oLeft + 'px';
        drag.style.top = oTop + 'px';

    }, { passive: false });
    //触摸结束时的处理
    drag.addEventListener('touchend', function (e) {
        document.removeEventListener("touchmove", defaultEvent);
    }, { passive: false });
    //阻止默认事件
    function defaultEvent(e) {
        e.preventDefault();
    }

}

dragBlock(pdfIcon);//调用拖动方法



/***20- jq原理 */

//$是定义的F的new的实例

    var $ = function(selector, context){
        return new F(selector, context)
    };
//$.fn是F的prototype
// $.fn  //多个使用,例如show  $('p').bold();
//$.extend()方法作用就是合并另个对象，有相同的则覆盖，没有相同的则添加,引用方法: $.minValue(20,30);
// $.fn.extend必须得加元素才能生效,//实例化对象后添加jquery的成员函数 $("p").alertWhileClick
   $.fn = F.prototype;

//在F的原型上定义方法   
F.prototype.hide = function(){
    this.element.style.display = 'none';
};

var $ = function(selector, context) {
    return new F(selector, context);
};
var F = function(selector, context) {
    return this.init(selector, context);
};

$.fn = F.prototype;

$.fn.init = function(selector, context) {
    // ...
    return this;
};
$.fn.each = function(fn) {
   // ...
};
$.fn.hide = function() {
   // ...
};
$.fn.init.prototype = $.fn


$.fn.css = function() {}
$.fn.attr = function() {}
$.fn.data = function() {}

//合并方法成对象
$.fn.extend({
    css: function() {},
    attr: function() {},
    data: function() {},
    // ...
});
//立即执行函数
(function(str){
    alert(str)
})('output')
//相当于
funtion OutPutFun(str){
    alert(str);
}
OutPutFun("output");

/**21 --- 防止用户点击过快*/
   var isClick = true;
        var num = 0;
        function add(){
            if(isClick){
              isClick = false;
              console.log(num++);


                setTimeout(function(){
                    isClick = true;
                }, 1000);
            }

        }

var isClick = true;//防止用户点击过快
$(".loginBtn").click(function () {
    if (isClick) {
        isClick = false;
        UserLogin();//在ajax的complete中置换:isClick = true
    }
});


/**22 --快速排序 */
//找基准
//遍历数据,大于基准放在left,小于基准放在right
//递归
function quickSort(arr){
    if(arr.length<=1){
        return arr;
    }
    var left = [];
    var right = [];
    var baseDot = Math.round(arr.length / 2);
    var base = arr.splice(baseDot, 1)[0];

        console.log(base)
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < base) {
                left.push(arr[i])
            }else {
                right.push(arr[i])
            }
        }

        return quickSort(left).concat([base], quickSort(right));
}
    var arr1 = [9,5,8,3,1,2,4];
    console.log(quickSort(arr1))
/***重构代码正则封装 */
let checkType=(function(){
    let rules={
        email(str){
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        },
        mobile(str){
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        },
        tel(str){
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        },
        number(str){
            return /^[0-9]$/.test(str);
        },
        english(str){
            return /^[a-zA-Z]+$/.test(str);
        },
        text(str){
            return /^\w+$/.test(str);
        },
        chinese(str){
            return /^[\u4E00-\u9FA5]+$/.test(str);
        },
        lower(str){
            return /^[a-z]+$/.test(str);
        },
        upper(str){
            return /^[A-Z]+$/.test(str);
        }
    };
    //暴露接口
    return function (str,type){
        //如果type是函数，就扩展rules，否则就是验证数据
        if(type.constructor===Function){
            rules[str]=type;
        }
        else{
            return rules[type]?rules[type](str):false;
        }
    }
})();

console.log(checkType('188170239','mobile'));

checkType('money',function (str) {
    return /^[0-9]+(.[0-9]{2})?$/.test(str)
});
//使用金额校验规则
console.log(checkType('18.36','money'));

/***数据库数据转表****/
//https://www.easy-mock.com/project/5b3c364310a1f82172313f40
//success代码
    var dateArr = [];
    for(var i = 0;i<obj.data.length;i++){
        dateArr.push(obj.data[i].enddate);
    }
    var newdateArr = [...new Set(dateArr)];
    var th='<td>--</td>'
    for(var i = 0;i<newdateArr.length;i++){
        th+='<td>'+newdateArr[i]+'</td>'
    }
    $("#csTh").html(th);
    var firstName=obj.data[0].holdclass;
    var td='<td>'+obj.data[0].holdclass+'</td>';
    for(var i = 0;i<obj.data.length;i++){
        if  (firstName==obj.data[i].holdclass){
            td+='<td>'+obj.data[i].sum+'</td>';
            if(i==obj.data.length-1){
                $("#csTbody").append('<tr>'+td+'</tr>');//最后一次添加的数据
            }
        }
        else {
            $("#csTbody").append('<tr>'+td+'</tr>');
             firstName=obj.data[i].holdclass;
            td='<td>'+obj.data[i].holdclass+'</td>';          
            td+='<td>'+obj.data[i].sum+'</td>';
        }
    }

//慎用iframe
//当子界面`有用到document属性时候,有bug,需要调用window.parent去请求例如微信支付
 window.parent.document.addEventListener('WeixinJSBridgeReady', comnfirmPay, false);
window.parent.WeixinJSBridge.invoke





/********判断浏览器类型 进行不同网页跳转*********/
function goPAGE() {

    //先获取当前链接 是PC 还是mobile
    var ntpe = null;
    if (window.location.href.indexOf('pc') != -1) {
        ntpe = 'pc';
    }

    if (window.location.href.indexOf('mobile') != -1) {
        ntpe = 'mobile';
    }


    //如果是移动端浏览器
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        //如果地址是PC端的 进行url转换
        if (ntpe == 'pc') {
            window.location = window.location.href.replace('pc', 'mobile');
        }
        else if (ntpe == null) {
            window.location = '/mobile/index.html';
        }
    }
    //如果是电脑端浏览器
    else {
        //如果地址是mobile的 进行url转换
        if (ntpe == 'mobile') {
            window.location = window.location.href.replace('mobile', 'pc');
        }
        else if (ntpe == null) {
            window.location = '/pc/index.html';
        }
    }
}



/*正则匹配去掉扒站工具标签  tppabs=\"[a-zA-z]+://[^\s]*\"   tppabs="h[^"]*" */

/**************Node.js******************** */
//express是更改
//body-parser作用是对post请求的请求体进行解析,解析req.body的数据,解析成功后覆盖原来的req.body,失败为{};


/****************websockets************************ */

io.sockets.on('connection', function(socket) {//获取连接
    //new user login
    socket.on('login', function(nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            //socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login');//全局获取到消息sockets
        };
    });
    //user leaves
    socket.on('disconnect', function() {
        if (socket.nickname != null) {
            //users.splice(socket.userIndex, 1);
            users.splice(users.indexOf(socket.nickname), 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');//除去当前的所有聊天
        }
    });
    //new message get
    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });
    //new image get
    socket.on('img', function(imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
    });
});
/**声明new的变化 */

var one= new CS();
//1 var one={};创建一个空的one对象
//2 one._proto_ = CS.prototype  将空对象的_proto_成员指向CS的prototype对象
//3 CS.call(one) 将CS的this指针替换成one,然后调用CS原型上的方法


/********************iframe中父子元素相互调用的方法***********************/

//子调父
window.parent.test()
//父调子
var childWindow = $("#windowPage")[0].contentWindow; //表示获取了嵌入在iframe中的子页面的window对象
var sumC = $("#windowPage")[0];
var childT0 = $(sumC).attr("src").indexOf('T0');
if (childT0 != -1) {
     try {
         childWindow.refreshFocusTable(msg); //调用子页面中的subFunction方法。左上角//ToIndex 首页 左侧 所有信号列表
     } catch (e) {

     }
 }
/**
 * 将复制t1的宽度给t2(仅复制宽度)
 * @param {*} t1 jQuery对象表格内部
 * @param {*} t2 jQuery对象表头
 */
function copyTableWidth(t1,t2){
    var t1_td_length = t1.find('tr').eq(0).find('th').length;
    var t2_td_length = t2.find('tr').eq(0).find('th').length;

    if(t1_td_length===t2_td_length){
        for(var i=0;i<t1_td_length;i++){
            t2.find('th').eq(i).width(t1.find('td').eq(i).width());
        }
    }
}

//在table的ajax请求后的complete调用方法 copyTableWidth($("#tableBody"),$("#tableHead"));








/****************数据库传输json格式问题(该传输字符串还是json)********************/

//平时一般传输的是json,但是使用base64加密困难
//特殊时候传输字符串,需要用JSON.parse或者eval,但是eval解析成json的时候,会识别并执行js代码,而JSON.parse会报错
//JSON.stringfy()很少使用

/***************验证码重新发送效果*******************/
function settime($obj, time) {
    if (time == 0) {
      $obj.attr("disabled", false); 
      $obj.css("background", "#f38401").css("cursor", "pointer");
      $obj.text("获取手机验证码"); 
      return; 
    } else { 
      $obj.attr("disabled", true);  
      $obj.css("color", "#ccc").css("cursor", "not-allowed");
      $obj.css("border-color", "#ccc") 
      $obj.text("重新发送(" + time + ")");
      time--; 
    } 
    setTimeout(function () { settime($obj, time) }, 1000) 
  }
  $("#getPhoneCode").click(function(){
    settime($("#getPhoneCode"),60);
  })




/*微信
=======
/*微信小程序
在js中引用公共方法*/
//1-          在根目录下新建一个utils文件夹，新建util.js在这里我们可以将通用的方法写在这
//是否为中文
function IsChinese(str) {
  var reg = /^[\u0391-\uFFE5]+$/;
  return Regular(str, reg);
}
module.exports = {
  IsChinese: IsChinese,
}
//2-在引用的js中
//test.js
var util = require('../../utils/util.js');
Page({
    onLoad: function () {
    console.log("判断是否为中文:"+util.IsChinese('测试'));
    }
})

//在wxml中引用公共方法的

在utils中信建wxs
var filters = {
  /**
   * 判断值的颜色(直接输出)
   * @param {} val 
   * @returns {} upColor 上升颜色  downColor 下降颜色 =0 ''
   */
  trendColor:function(val){
    if (val != 'null' && val != '') {
      if (val > 0) {
        return 'upColor';
      } else if (val < 0) {
        return 'downColor';
      } else {
        return '';
      }
    } else {
      return ''
    }
  }
}
module.exports = {
  trendColor: filters.trendColor
}

//在引用界面引用
<wxs module="filters" src="../../utils/math.wxs" />
<view class="td {{filters.trendColor(item.c_return_annual)}}">{{item.c_return_annual}}%</view>


//在wx.request接口中跳转
setTimeout(function(){
  wx.switchTab({
    url: '/pages/user/user'
  })
},2000)


//微信小程序不支持长按识别二维码,但可以支持小程序二维码
<image  class="qrCode"  src="https://img.fetow.com/Public/Index/images/shewm.jpg"  
    data-src="https://img.fetow.com/Public/Index/images/shewm.jpg" catchtap = "previewImage" ></image>

  /*长按图片识别*/
  previewImage:function(event){
    var current = event.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  }
//在微信小程序中签入网页(必须新建一个界面作为载体)
<web-view src="https://www.hanhaiyuntao.top//"></web-view>



//小程序生命周期授权

//1/设定index为首页,在app.js中进行校验授权checkUserInfoAuth();成功返回首页,失败返回授权界面(新界面)
//2/在index中的onshow中调用 app.checkUserInfoAuth();onshow为界面刚初始化时候或者从后台进入前台显示时





/***node+express+mysql    cnpm install express */


/**********************VUE************************/

/**定义路由路径 webpack提供的require.ensure(),这样可以实现按需加载，并且你可以将多个相同类的组件打包成一个文件*/
//1/const Index = r => require.ensure([], () => r(require('@/components/index')), 'Index')
//Vue.use(Router)
//
//
//
//
//2/scoped样式范围内有缺点,添加class无法应用,需删除scoped或者在js中直接更改style
//
//
//3/更改原有数组并且实现双向绑定时,需用this.$set(ARR,INDX,'改变后文字')
//
//
//4/在第一个 tick 里，获取不到输入框，自然也获取不到焦点
//this.$nextTick(function(){
//    document.getElementById("keywords").focus()
//})
//
//
//5/在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中














//*************************数据库内容********************************
//1/新建数据库时,数据库属性字符集更改为utf8 -- UTF-8 Unicode
//2/数据表的类型,数字是int,中英文一律写成varchar








