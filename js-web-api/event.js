// 事件绑定&事件代理
function bindEvent (elem, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }

    elem.addEventListener(type, event => {
        const target = event.target
        if (selector) {
            // 事件代理
            // console.log(target)
            // console.log(selector)
            // console.log(target.matches)
            if (target.matches(selector)) {
                fn.call(target, event)
            }
        } else {
            // 普通事件绑定
            fn.call(target, event)
        }
    })
}

// 普通绑定
const btn1 = document.getElementById('btn1');
bindEvent(btn1, 'click', function(event) {
    event.preventDefault()
    alert(this.innerHTML)
})

// 代理绑定
const div3 = document.getElementById('div3');
bindEvent(div3, 'click', 'a', function(event) {
    event.preventDefault()
    alert(this.innerHTML)
})