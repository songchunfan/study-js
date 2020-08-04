const obj1 = {
    age: 20,
    name: '刘德华',
    address: {
        city: 'beijing'
    },
    arr: ['a','b','c']
}

const obj2 = deepClone(obj1)

obj2.address.city = 'shanghai'

/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 */
function deepClone(obj = {}) {
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }

    let result;
    if (obj instanceof Array) {
        result = [];
    } else {
        result = {};
    }

    for (const key in obj) {
        // 保证key不是原型的属性
        if (object.hasOwnProperty(key)) {
            // 递归调用
            result[key] = deepClone(obj[key])
        }
    }

    return result;
}