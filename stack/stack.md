使用场景

场景一：十进制转二进制

场景二：有效的括号

场景三：函数调用堆栈

LeetCode 20题

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s.length % 2 === 1) {
        return false;
    }
    const stack = [];
    for (let i = 0; i < s.length; i += 1) {
        const c = s[i];
        if (c === '(' || c === '[' || c === '{') { 
            stack.push(c);
        } else {
            const t = stack[stack.length - 1];
            if (
                (t === '(' && c === ')') ||
                (t === '[' && c === ']') ||
                (t === '{' && c === '}')
            ) {
                stack.pop();
            } else {
                return false
            }
        }
    }
    return stack.length === 0;
};
```

