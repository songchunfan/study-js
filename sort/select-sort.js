// 选择排序;时间复杂度O(n*n)
let selectSort = (arr, flag = 0) => {
    let len = arr.length, temp = 0;

    for (let i = 0; i < len - 1; i++) {
        temp = i;
        for (let j = i + 1; j < len; j++) { 
            if (arr[j] < arr[temp]) { 
                temp = j;
            }
        }

        if (temp !== i) {
            [arr[i], arr[temp]] = [arr[temp], arr[i]]
        }
    }

    return flag ? arr.reverse() : arr;
}

let arr = [2,9,6,7];
console.log(selectSort(arr))