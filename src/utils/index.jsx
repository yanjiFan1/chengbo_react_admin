/**
 * 工具方法
 * @author yanji
 * date: 2019/10/17
*/
module.exports ={
    queryString:() => {
        let _queryString = {};
        const _query = window.location.search.substr(1);
		const _vars = _query.split('&');
        _vars.forEach((v, i) => {
            const _pair = v.split('=');
            if (!_queryString.hasOwnProperty(_pair[0])) {
                _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
            } else if (typeof _queryString[_pair[0]] === 'string') {
                const _arr = [ _queryString[_pair[0]], decodeURIComponent(_pair[1])];
                _queryString[_pair[0]] = _arr;
            } else {
                _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
            }
        });
        return _queryString;
    },

    //获取url中的参数
    getParams: function (urls) {
        var reg = /(\w+)=([^&]+)/g,
            params = {},
			result = [],
			url = urls || window.location.href;

        url = (url.split('?')[1] || '');

        while(result = reg.exec(url)) {
            params[result[1]] = result[2];
        }

        return params;
    },

    // 是否包含英文
    includeEn:function(str){
        if(!str) return false;
        if(str.search(/[a-zA-Z]+/)>-1)
            return true
        return false
    },

    // 只包含中文,和空格
    onlyCn: function(str){
        return /^[\u4e00-\u9fa5\s]+$/.test(str)
    },

	// 只包含中文和英文
    includeEnAndCn: function(str){
        return !/^[\u4e00-\u9fa5\s]+$/.test(str)&&!/^[A-Za-z\s]+$/.test(str)&&!/[^a-zA-z\s\u4e00-\u9fa5]+/.test(str)
    },

    includeOtherVarchar:function(str){
        return /[^a-zA-z\s\u4e00-\u9fa5]+/.test(str)
    },

    // 身份证校验
    isIdNumber:str=>/^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/.test(str),

    // 只允许输入英文字母、数字、空格、中文（=@#）
    canInput:str=>{
        return str.replace(/[^\w=@#^\u4E00-\u9FA5 ]/ig,"")
    },

    // 去除一头一尾
    empty:str=>str.replace(/^\s+|\s+$/g,""),

    //去除所有空格
    emptyAll:str=>str.replace(/\s/g,''),

    //判断是否是手机号
    mobile: function (mobile) {
        /* 号码段来自 http://t.cn/Rv6QvRr */
        return /^(1)\d{10}$/.test(mobile);
    },

    //判断是否是email
    email: function (email) {
        return email.includes('@')
    },

    //中国身份证号判断
    idNumber:function (str) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(str)
    },

    //外国身份证号判断
    foreignIdNumber:function (str) {
       return str.length < 18 ? true : false;
    },

    // 全屏展示
    launchFullscreen: function(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen){
            element.msRequestFullscreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen();
        }
    },

    // 退出全屏
    exitFullscreen: function() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
    },

    // 校验是否有全屏状态节点
    hasFullElement: function() {
        var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
        if (isFull === undefined) isFull = false;
        return isFull;
    },

    // 获取全屏状态节点
    getFullElement: function() {
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        return fullscreenElement;
    },

    // 将数字每千分位逗号隔开 12345 --> 12,345
    toThousands: function(num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
}
