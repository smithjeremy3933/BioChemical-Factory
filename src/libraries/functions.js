module.exports = {
          
    mergeSortLogPriority(arr) {
        if (arr.length === 1) return arr;
      
        let center = Math.floor(arr.length / 2);
        let left = arr.slice(0,center);
        let right = arr.slice(center);
      
        return merge(mergeSort(left), mergeSort(right));
    },

    merge(left, right) {
        const results = [];
        while (left.length && right.length) {
          if (left[0].logPriority < right[0].logPriority) {
            results.push(left.shift());
          } else {
            results.push(right.shift());
          }
        }
        return [...results, ...left, ... right];
    },
    selectionSortLogPriority (arr) {
        for (let i = 0; i < arr.length; i++) {
          let indexOfMin = i;
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[indexOfMin].logPriority < arr[j].logPriority) {
              indexOfMin = j;
            }
          }
          if (indexOfMin !== i) {
            let lesser = arr[indexOfMin];
            arr[indexOfMin] = arr[i];
            arr[i] = lesser;
          }
        }
      
        return arr;
    }
}