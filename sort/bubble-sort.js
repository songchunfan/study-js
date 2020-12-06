// 冒泡排序;时间复杂度O(n*n)
let BubbleSort = (arr, flag = 0) => {
    let len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) { 
            if (arr[j] > arr[j + 1]) { 
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }

    return flag ? arr.reverse() : arr;
}

let arr = [2,9,6,7];
console.log(BubbleSort(arr))