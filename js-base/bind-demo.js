// 手写bind()
Function.prototype.bind1 = function () {
    // 将参数拆解为数组
    const args = Array.prototype.slice.call(arguments)

    const _this = args.shift()

    const self = this

    return function () {
        return self.apply(_this, args)
    }
}

function fn1(a,b,c) {
    console.log('this', this)
    console.log(a,b,c)
    return 'this is fn1'
}

const fn2 = fn1.bind1({x:10}, 10, 20, 30)
const res = fn2()
console.log(res)