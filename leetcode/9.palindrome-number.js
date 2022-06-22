/*
 * @lc app=leetcode id=9 lang=javascript
 *
 * [9] Palindrome Number
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  let str = String(x);
  let j = str.length;
  for (let i = 0; i < j / 2; i++) {
    if (str[i] !== str[j - 1 - i]) {
      return false;
    }
  }
  return true;
};
// @lc code=end
