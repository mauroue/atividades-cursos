/*
 * @lc app=leetcode id=26 lang=javascript
 *
 * [26] Remove Duplicates from Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {

    //iterar por todos os itens do array
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== nums[k])
            nums[++k] = nums[i];
    }
    return ++k;
};
// @lc code=end

// depois pega o item seguinte e aloca no lugar do item removido