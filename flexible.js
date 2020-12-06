// 慕课网m端适配方案
;(function (win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }


    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function (d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));

function changeNum(num) {
    if (typeof num !== 'number') {
        throw new Error('请传入数字');
        return false;
    }

    // 切割小数点
    num = num + '';

    let index = 0, i = 0;

    for (; i < num.length; i++) {
        if (num[i] === '.') {
            index = i;
        }
    }

    // 开始 100.2
    let start = num.slice(0, index);
    // 结束
    let end = num.slice(index, -1);

    let reson = [];

    //  console.log(start.length)

    let firstStart = '', j = start.length;
    // 判断是否为三位数的倍数

    // 第一位
    let newStart = start.slice(0, j % 3);
    console.log(newStart, start)
    start = start.replace(newStart, '');
    // Math.floor(j % 3) === j % 3 ?
    for (; j >= 0; j--) {
        // console.log(j)
        // 遍历出符合的项
        if (j % 3 === 0 && j !== start.length) {
            console.log(j, '123')
            reson.push(j)
        }
    }

    // 存储被切割的字符串
    let sliceStr = [];
    // 反转数组
    reson = reson.reverse();
    // 遍历符合项切割数组
    for (let k = 0; k < reson.length; k++) {
        console.log(reson[k], reson[k + 1])
        sliceStr.push(start.slice(reson[k], reson[k + 1]))
    }
    // 返回新的数组
    let newNum = '';

    if (newStart) {
        newNum = newStart + ',' + sliceStr.join(',') + end;
    } else {
        newNum = sliceStr.join(',') + end;
    }

    return newNum

}
let str  = changeNum(10000.23);

// 方法二
/*
   slice() 方法可从已有的数组中返回选定的元素,截取数组的一个方法
*/
function toThousandsNum(num) {
    var num = (num || 0).toString(),
        result = '';

    while (num.length > 3) {
        //此处用数组的slice方法，如果是负数，那么它规定从数组尾部开始算起的位置
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    // 如果数字的开头为0,不需要逗号
    if (num){
    result = num + result
    }
    return result;
}