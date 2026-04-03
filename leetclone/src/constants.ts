export interface TestCase {
  id: number;
  input: string;
  output: string;
  isSample: boolean;
  isCustom?: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Basic' | 'Easy' | 'Medium' | 'Hard';
  category: string;
  topics?: string[];
  companies?: string[];
  order: number;
  videoId?: string;
  link?: string;
  acceptance: string;
  testCases?: TestCase[];
  description?: string;
}

export const problems: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    topics: ["Array", "Hash Table"],
    companies: ["Amazon", "Microsoft", "Google", "Adobe", "Apple", "Facebook"],
    order: 1,
    acceptance: "51.2%",
    description: "<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p><p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p><p>You can return the answer in any order.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]</pre><p><strong>Example 3:</strong></p><pre><strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]</pre><p><strong>Constraints:</strong></p><ul><li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li><li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li><li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li><li><strong>Only one valid answer exists.</strong></li></ul><p><strong>Follow-up:</strong> Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code> time complexity?</p>",
    testCases: [
      { id: 1, input: "nums = [2,7,11,15], target = 9", output: "[0,1]", isSample: true },
      { id: 2, input: "nums = [3,2,4], target = 6", output: "[1,2]", isSample: true },
      { id: 3, input: "nums = [3,3], target = 6", output: "[0,1]", isSample: true },
      { id: 4, input: "nums = [1,2,3,4,5], target = 10", output: "null", isSample: false },
    ]
  },
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    topics: ["Linked List", "Math"],
    companies: ["Amazon", "Microsoft", "Flipkart", "Morgan Stanley"],
    order: 2,
    acceptance: "42.5%",
    description: "<p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.</p><p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> l1 = [2,4,3], l2 = [5,6,4]\n<strong>Output:</strong> [7,0,8]\n<strong>Explanation:</strong> 342 + 465 = 807.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> l1 = [0], l2 = [0]\n<strong>Output:</strong> [0]</pre><p><strong>Example 3:</strong></p><pre><strong>Input:</strong> l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\n<strong>Output:</strong> [8,9,9,9,0,0,0,1]</pre><p><strong>Constraints:</strong></p><ul><li>The number of nodes in each linked list is in the range <code>[1, 100]</code>.</li><li><code>0 &lt;= Node.val &lt;= 9</code></li><li>It is guaranteed that the list represents a number that does not have leading zeros.</li></ul>",
    testCases: [
      { id: 1, input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", isSample: true },
      { id: 2, input: "l1 = [0], l2 = [0]", output: "[0]", isSample: true },
      { id: 3, input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]", output: "[8,9,9,9,0,0,0,1]", isSample: true },
    ]
  },
  {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Hash Table",
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Microsoft", "Google", "Samsung", "Paytm"],
    order: 3,
    acceptance: "34.8%",
    description: "<p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> s = \"abcabcbb\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The answer is \"abc\", with the length of 3.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> s = \"bbbbb\"\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The answer is \"b\", with the length of 1.</pre><p><strong>Example 3:</strong></p><pre><strong>Input:</strong> s = \"pwwkew\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The answer is \"wke\", with the length of 3.\nNotice that the answer must be a substring, \"pwke\" is a subsequence and not a substring.</pre><p><strong>Constraints:</strong></p><ul><li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li><li><code>s</code> consists of English letters, digits, symbols and spaces.</li></ul>",
    testCases: [
      { id: 1, input: 's = "abcabcbb"', output: "3", isSample: true },
      { id: 2, input: 's = "bbbbb"', output: "1", isSample: true },
      { id: 3, input: 's = "pwwkew"', output: "3", isSample: true },
    ]
  },
  {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Amazon", "Microsoft", "Google", "Uber", "Adobe"],
    order: 4,
    acceptance: "39.1%",
    description: "<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p><p>The overall run time complexity should be <code>O(log (m+n))</code>.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> nums1 = [1,3], nums2 = [2]\n<strong>Output:</strong> 2.00000\n<strong>Explanation:</strong> merged array = [1,2,3] and median is 2.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> nums1 = [1,2], nums2 = [3,4]\n<strong>Output:</strong> 2.50000\n<strong>Explanation:</strong> merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.</pre><p><strong>Constraints:</strong></p><ul><li><code>nums1.length == m</code></li><li><code>nums2.length == n</code></li><li><code>0 &lt;= m &lt;= 1000</code></li><li><code>0 &lt;= n &lt;= 1000</code></li><li><code>1 &lt;= m + n &lt;= 2000</code></li><li><code>-10<sup>6</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>6</sup></code></li></ul>",
    testCases: [
      { id: 1, input: "nums1 = [1,3], nums2 = [2]", output: "2.00000", isSample: true },
      { id: 2, input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000", isSample: true },
    ]
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    topics: ["String", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "Flipkart", "NPCI", "Wipro"],
    order: 5,
    acceptance: "33.4%",
    description: "<p>Given a string <code>s</code>, return the longest palindromic substring in <code>s</code>.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> s = \"babad\"\n<strong>Output:</strong> \"bab\"\n<strong>Explanation:</strong> \"aba\" is also a valid answer.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> s = \"cbbd\"\n<strong>Output:</strong> \"bb\"</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 1000</code></li><li><code>s</code> consist of only digits and English letters.</li></ul>",
    testCases: [
      { id: 1, input: 's = "babad"', output: '"bab"', isSample: true },
      { id: 2, input: 's = "cbbd"', output: '"bb"', isSample: true },
    ]
  },
  {
    id: "zigzag-conversion",
    title: "ZigZag Conversion",
    difficulty: "Medium",
    category: "String",
    topics: ["String"],
    companies: ["Amazon", "Infosys", "Atlassian"],
    order: 6,
    acceptance: "46.7%",
    description: "<p>The string <code>\"PAYPALISHIRING\"</code> is written in a zigzag pattern on a given number of rows like this:</p><pre>P   A   H   N\nA P L S I I G\nY   I   R</pre><p>And then read line by line: <code>\"PAHNAPLSIIGYIR\"</code></p><p>Write the code that will take a string and make this conversion given a number of rows.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> s = \"PAYPALISHIRING\", numRows = 3\n<strong>Output:</strong> \"PAHNAPLSIIGYIR\"</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> s = \"PAYPALISHIRING\", numRows = 4\n<strong>Output:</strong> \"PINALSIGYAHRPI\"\n<strong>Explanation:</strong>\nP     I    N\nA   L S  I G\nY A   H R\nP     I</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 1000</code></li><li><code>s</code> consists of English letters (lower-case and upper-case), <code>','</code> and <code>'.'</code>.</li><li><code>1 &lt;= numRows &lt;= 1000</code></li></ul>",
    testCases: [
      { id: 1, input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"', isSample: true },
      { id: 2, input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"', isSample: true },
    ]
  },
  {
    id: "reverse-integer",
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "Math",
    topics: ["Math"],
    companies: ["Microsoft", "Google", "Adobe", "Samsung"],
    order: 7,
    acceptance: "28.1%",
    description: "<p>Given a signed 32-bit integer <code>x</code>, return <code>x</code> with its digits reversed. If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code>, then return <code>0</code>.</p><p><strong>Assume the environment does not allow you to store 64-bit integers (signed or unsigned).</strong></p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> x = 123\n<strong>Output:</strong> 321</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> x = -123\n<strong>Output:</strong> -321</pre><p><strong>Example 3:</strong></p><pre><strong>Input:</strong> x = 120\n<strong>Output:</strong> 21</pre><p><strong>Constraints:</strong></p><ul><li><code>-2<sup>31</sup> &lt;= x &lt;= 2<sup>31</sup> - 1</code></li></ul>",
    testCases: [
      { id: 1, input: "x = 123", output: "321", isSample: true },
      { id: 2, input: "x = -123", output: "-321", isSample: true },
      { id: 3, input: "x = 120", output: "21", isSample: true },
    ]
  },
  {
    id: "string-to-integer-atoi",
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    category: "String",
    topics: ["String", "Math"],
    companies: ["Amazon", "Microsoft", "Google", "Paytm", "NPCI"],
    order: 8,
    acceptance: "17.2%",
    description: "<p>Implement the <code>myAtoi(string s)</code> function, which converts a string to a 32-bit signed integer (similar to C/C++'s <code>atoi</code> function).</p><p>The algorithm for <code>myAtoi(string s)</code> is as follows:</p><ol><li>Read in and ignore any leading whitespace.</li><li>Check if the next character (if not already at the end of the string) is <code>'-'</code> or <code>'+'</code>. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.</li><li>Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.</li><li>Convert these digits into an integer (i.e. <code>\"123\" -&gt; 123</code>, <code>\"0032\" -&gt; 32</code>). If no digits were read, then the integer is <code>0</code>. Change the sign as necessary (from step 2).</li><li>If the integer is out of the 32-bit signed integer range <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code>, then clamp the integer so that it remains in the range. Specifically, integers less than <code>-2<sup>31</sup></code> should be clamped to <code>-2<sup>31</sup></code>, and integers greater than <code>2<sup>31</sup> - 1</code> should be clamped to <code>2<sup>31</sup> - 1</code>.</li><li>Return the integer as the final result.</li></ol><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> s = \"42\"\n<strong>Output:</strong> 42</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> s = \"   -42\"\n<strong>Output:</strong> -42</pre><p><strong>Example 3:</strong></p><pre><strong>Input:</strong> s = \"4193 with words\"\n<strong>Output:</strong> 4193</pre><p><strong>Constraints:</strong></p><ul><li><code>0 &lt;= s.length &lt;= 200</code></li><li><code>s</code> consists of English letters (lower-case and upper-case), digits (<code>0-9</code>), <code>' '</code>, <code>'+'</code>, <code>'-'</code>, and <code>'.'</code>.</li></ul>",
    testCases: [
      { id: 1, input: 's = "42"', output: "42", isSample: true },
      { id: 2, input: 's = "   -42"', output: "-42", isSample: true },
      { id: 3, input: 's = "4193 with words"', output: "4193", isSample: true },
    ]
  },
  {
    id: "missing-in-array",
    title: "Missing in Array",
    difficulty: "Easy",
    category: "Array",
    topics: ["Array"],
    companies: ["Amazon", "Flipkart", "Morgan Stanley"],
    order: 9,
    acceptance: "45.2%",
    description: "<p>Given an array of size <code>n-1</code> such that it only contains distinct integers in the range of <code>1</code> to <code>n</code>. Find the missing element.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> n = 5, arr = [1,2,3,5]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Given array : 1 2 3 5. Missing element is 4.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> n = 2, arr = [1]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> Given array : 1. Missing element is 2.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; n &le; 10<sup>6</sup></code></li><li><code>1 &le; arr[i] &le; 10<sup>6</sup></code></li></ul><p><strong>Follow-up:</strong> Can you solve it in <code>O(n)</code> time and <code>O(1)</code> auxiliary space?</p>",
    testCases: [
      { id: 1, input: "n = 5, arr = [1,2,3,5]", output: "4", isSample: true },
      { id: 2, input: "n = 2, arr = [1]", output: "2", isSample: true }
    ]
  },
  {
    id: "move-all-zeroes-to-end",
    title: "Move All Zeroes to End",
    difficulty: "Easy",
    category: "Array",
    topics: ["Array", "Two Pointers"],
    companies: ["Google", "Microsoft", "Paytm"],
    order: 10,
    acceptance: "55.1%",
    description: "<p>Given an array <code>arr[]</code> of <code>n</code> positive integers. Push all the zeros of the given array to the right end of the array while maintaining the order of non-zero elements.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> arr = [1, 2, 0, 4, 3, 0, 5, 0]\n<strong>Output:</strong> [1, 2, 4, 3, 5, 0, 0, 0]\n<strong>Explanation:</strong> There are three 0s that are moved to the end.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> arr = [10, 20, 30]\n<strong>Output:</strong> [10, 20, 30]\n<strong>Explanation:</strong> No zeros in array so no change.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; arr.length &le; 10<sup>5</sup></code></li><li><code>0 &le; arr[i] &le; 10<sup>5</sup></code></li></ul><p><strong>Follow-up:</strong> Can you solve it in <code>O(n)</code> time and <code>O(1)</code> auxiliary space?</p>",
    testCases: [
      { id: 1, input: "arr = [1, 2, 0, 4, 3, 0, 5, 0]", output: "[1, 2, 4, 3, 5, 0, 0, 0]", isSample: true },
      { id: 2, input: "arr = [10, 20, 30]", output: "[10, 20, 30]", isSample: true }
    ]
  },
  {
    id: "reverse-words",
    title: "Reverse Words",
    difficulty: "Easy",
    category: "String",
    topics: ["String"],
    companies: ["Amazon", "Microsoft", "Samsung"],
    order: 11,
    acceptance: "48.9%",
    description: "<p>Given a String <code>S</code>, reverse the string without reversing its individual words. Words are separated by dots.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> S = \"i.like.this.program.very.much\"\n<strong>Output:</strong> \"much.very.program.this.like.i\"\n<strong>Explanation:</strong> After reversing the whole string(not individual words), the input string becomes \"much.very.program.this.like.i\".</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> S = \"pqr.mno\"\n<strong>Output:</strong> \"mno.pqr\"\n<strong>Explanation:</strong> After reversing the whole string , the input string becomes \"mno.pqr\".</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; |S| &le; 10<sup>5</sup></code></li></ul>",
    testCases: [
      { id: 1, input: 'S = "i.like.this.program.very.much"', output: '"much.very.program.this.like.i"', isSample: true },
      { id: 2, input: 'S = "pqr.mno"', output: '"mno.pqr"', isSample: true }
    ]
  },
  {
    id: "roman-to-integer",
    title: "Roman to Integer",
    difficulty: "Easy",
    category: "String",
    topics: ["String", "Hash Table"],
    companies: ["Amazon", "Adobe", "Uber"],
    order: 12,
    acceptance: "58.3%",
    description: "<p>Roman numerals are represented by seven different symbols: <code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p><pre><strong>Symbol</strong>       <strong>Value</strong>\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000</pre><p>For example, <code>2</code> is written as <code>II</code> in Roman numeral, just two ones added together. <code>12</code> is written as <code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p><p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:</p><ul><li><code>I</code> can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9. </li><li><code>X</code> can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90. </li><li><code>C</code> can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li></ul><p>Given a roman numeral, convert it to an integer.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> s = \"III\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> III = 3.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> s = \"LVIII\"\n<strong>Output:</strong> 58\n<strong>Explanation:</strong> L = 50, V= 5, III = 3.</pre><p><strong>Example 3:</strong></p><pre><strong>Input:</strong> s = \"MCMXCIV\"\n<strong>Output:</strong> 1994\n<strong>Explanation:</strong> M = 1000, CM = 900, XC = 90 and IV = 4.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 15</code></li><li><code>s</code> contains only the characters <code>('I', 'V', 'X', 'L', 'C', 'D', 'M')</code>.</li><li>It is <strong>guaranteed</strong> that <code>s</code> is a valid roman numeral in the range <code>[1, 3999]</code>.</li></ul>",
    testCases: [
      { id: 1, input: 's = "III"', output: "3", isSample: true },
      { id: 2, input: 's = "LVIII"', output: "58", isSample: true },
      { id: 3, input: 's = "MCMXCIV"', output: "1994", isSample: true }
    ]
  },
  {
    id: "middle-of-a-linked-list",
    title: "Middle of a Linked List",
    difficulty: "Easy",
    category: "Linked List",
    topics: ["Linked List", "Two Pointers"],
    companies: ["Flipkart", "Microsoft", "Wipro"],
    order: 13,
    acceptance: "65.4%",
    description: "<p>Given the <code>head</code> of a singly linked list, return the middle node of the linked list.</p><p>If there are two middle nodes, return the second middle node.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> head = [1,2,3,4,5]\n<strong>Output:</strong> [3,4,5]\n<strong>Explanation:</strong> The middle node of the list is node 3.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> head = [1,2,3,4,5,6]\n<strong>Output:</strong> [4,5,6]\n<strong>Explanation:</strong> Since the list has two middle nodes with values 3 and 4, we return the second one.</pre><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the list is in the range <code>[1, 100]</code>.</li><li><code>1 &lt;= Node.val &lt;= 100</code></li></ul>",
    testCases: [
      { id: 1, input: "head = [1,2,3,4,5]", output: "[3,4,5]", isSample: true },
      { id: 2, input: "head = [1,2,3,4,5,6]", output: "[4,5,6]", isSample: true }
    ]
  },
  {
    id: "reverse-a-doubly-linked-list",
    title: "Reverse a Doubly Linked List",
    difficulty: "Easy",
    category: "Linked List",
    topics: ["Linked List"],
    companies: ["Amazon", "Google", "Infosys"],
    order: 14,
    acceptance: "70.1%",
    description: "<p>Given a doubly linked list of <code>n</code> elements. The task is to reverse the doubly linked list.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> LinkedList: 3 &lt;--&gt; 4 &lt;--&gt; 5\n<strong>Output:</strong> 5 4 3</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> LinkedList: 75 &lt;--&gt; 122 &lt;--&gt; 59 &lt;--&gt; 196\n<strong>Output:</strong> 196 59 122 75</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li><li><code>0 &lt;= value of node &lt;= 10<sup>4</sup></code></li></ul><p><strong>Follow-up:</strong> Can you solve it in <code>O(n)</code> time and <code>O(1)</code> auxiliary space?</p>",
    testCases: [
      { id: 1, input: "head = [3, 4, 5]", output: "[5, 4, 3]", isSample: true },
      { id: 2, input: "head = [75, 122, 59, 196]", output: "[196, 59, 122, 75]", isSample: true }
    ]
  },
  {
    id: "merge-two-sorted-linked-lists",
    title: "Merge two sorted linked lists",
    difficulty: "Medium",
    category: "Linked List",
    topics: ["Linked List", "Recursion"],
    companies: ["Microsoft", "Amazon", "Atlassian"],
    order: 15,
    acceptance: "52.8%",
    description: "<p>Given two sorted linked lists consisting of <code>N</code> and <code>M</code> nodes respectively. The task is to merge both of the list (in-place) and return head of the merged list.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> head1 = [5, 10, 15, 40], head2 = [2, 3, 20]\n<strong>Output:</strong> [2, 3, 5, 10, 15, 20, 40]</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> head1 = [1, 1], head2 = [2, 4]\n<strong>Output:</strong> [1, 1, 2, 4]</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= N, M &lt;= 10<sup>4</sup></code></li><li><code>1 &lt;= Node.data &lt;= 10<sup>5</sup></code></li></ul>",
    testCases: [
      { id: 1, input: "head1 = [5, 10, 15, 40], head2 = [2, 3, 20]", output: "[2, 3, 5, 10, 15, 20, 40]", isSample: true },
      { id: 2, input: "head1 = [1, 1], head2 = [2, 4]", output: "[1, 1, 2, 4]", isSample: true }
    ]
  },
  {
    id: "left-view-of-binary-tree",
    title: "Left View of Binary Tree",
    difficulty: "Medium",
    category: "Tree",
    topics: ["Tree", "BFS", "DFS"],
    companies: ["Amazon", "Flipkart", "Samsung"],
    order: 16,
    acceptance: "44.5%",
    description: "<p>Given a Binary Tree, return Left view of it. Left view of a Binary Tree is set of nodes visible when tree is visited from Left side.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> root = [1, 2, 3, 4, 5, null, null]\n<strong>Output:</strong> [1, 2, 4]</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> root = [1, 2, 3, null, null, 4, 5]\n<strong>Output:</strong> [1, 2, 4]</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= Number of nodes &lt;= 100</code></li><li><code>1 &lt;= Data of a node &lt;= 1000</code></li></ul><p><strong>Follow-up:</strong> Can you solve it in <code>O(n)</code> time and <code>O(h)</code> auxiliary space?</p>",
    testCases: [
      { id: 1, input: "root = [1, 2, 3, 4, 5, null, null]", output: "[1, 2, 4]", isSample: true },
      { id: 2, input: "root = [1, 2, 3, null, null, 4, 5]", output: "[1, 2, 4]", isSample: true }
    ]
  },
  {
    id: "check-for-bst",
    title: "Check for BST",
    difficulty: "Medium",
    category: "Tree",
    topics: ["Tree", "Binary Search Tree"],
    companies: ["Amazon", "Microsoft", "Morgan Stanley"],
    order: 17,
    acceptance: "38.2%",
    description: "<p>Given the root of a binary tree. Check whether it is a BST or not.</p><p>A <strong>valid BST</strong> is defined as follows:</p><ul><li>The left subtree of a node contains only nodes with keys <strong>less than</strong> the node's key.</li><li>The right subtree of a node contains only nodes with keys <strong>greater than</strong> the node's key.</li><li>Both the left and right subtrees must also be binary search trees.</li></ul><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> root = [2, 1, 3]\n<strong>Output:</strong> true</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> root = [5, 1, 4, null, null, 3, 6]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The root node's value is 5 but its right child's value is 4.</pre><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li><li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li></ul>",
    testCases: [
      { id: 1, input: "root = [2, 1, 3]", output: "true", isSample: true },
      { id: 2, input: "root = [2, 1, 3, null, null, null, 5]", output: "false", isSample: true }
    ]
  },
  {
    id: "diameter-of-a-binary-tree",
    title: "Diameter of a Binary Tree",
    difficulty: "Medium",
    category: "Tree",
    topics: ["Tree", "Recursion"],
    companies: ["Google", "Amazon", "Adobe"],
    order: 18,
    acceptance: "49.1%",
    description: "<p>The diameter of a tree (sometimes called the width) is the number of nodes on the longest path between two end nodes.</p><p>The length of a path between two nodes is represented by the number of edges between them.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> root = [1, 2, 3, 4, 5]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 3 is the length of the path [4,2,1,3] or [5,2,1,3].</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> root = [1, 2]\n<strong>Output:</strong> 1</pre><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[1, 10<sup>4</sup>]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li></ul>",
    testCases: [
      { id: 1, input: "root = [1, 2, 3]", output: "3", isSample: true },
      { id: 2, input: "root = [10, 20, 30, 40, 60]", output: "4", isSample: true }
    ]
  },
  {
    id: "lca-in-binary-tree",
    title: "LCA in Binary Tree",
    difficulty: "Medium",
    category: "Tree",
    topics: ["Tree"],
    companies: ["Amazon", "Microsoft", "Flipkart"],
    order: 19,
    acceptance: "41.7%",
    description: "<p>Given a Binary Tree with all unique values and two nodes value, <code>n1</code> and <code>n2</code>. The task is to find the lowest common ancestor of the given two nodes.</p><p>According to the definition of LCA on Wikipedia: \"The lowest common ancestor is defined between two nodes <code>p</code> and <code>q</code> as the lowest node in <code>T</code> that has both <code>p</code> and <code>q</code> as descendants (where we allow <strong>a node to be a descendant of itself</strong>).\"</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], n1 = 5, n2 = 1\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The LCA of nodes 5 and 1 is 3.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], n1 = 5, n2 = 4\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.</pre><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[2, 10<sup>5</sup>]</code>.</li><li><code>-10<sup>9</sup> &lt;= Node.val &lt;= 10<sup>9</sup></code></li><li>All <code>Node.val</code> are <strong>unique</strong>.</li><li><code>p != q</code></li><li><code>p</code> and <code>q</code> will exist in the tree.</li></ul>",
    testCases: [
      { id: 1, input: "root = [1, 2, 3], n1 = 2, n2 = 3", output: "1", isSample: true },
      { id: 2, input: "root = [5, 2, null, 3, 4], n1 = 3, n2 = 4", output: "2", isSample: true }
    ]
  },
  {
    id: "find-the-number-of-islands",
    title: "Find the number of islands",
    difficulty: "Medium",
    category: "Graph",
    topics: ["Graph", "DFS", "BFS"],
    companies: ["Amazon", "Microsoft", "Google", "Uber"],
    order: 20,
    acceptance: "35.6%",
    description: "<p>Given a grid of size n*m (n is the number of rows and m is the number of columns in the grid) consisting of '0's (Water) and '1's(Land). Find the number of islands.</p><p>An <strong>island</strong> is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> grid = [\n  [\"1\",\"1\",\"1\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"0\",\"0\"]\n]\n<strong>Output:</strong> 1</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> grid = [\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"1\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"1\",\"1\"]\n]\n<strong>Output:</strong> 3</pre><p><strong>Constraints:</strong></p><ul><li><code>m == grid.length</code></li><li><code>n == grid[i].length</code></li><li><code>1 &lt;= m, n &lt;= 300</code></li><li><code>grid[i][j]</code> is <code>'0'</code> or <code>'1'</code>.</li></ul>",
    testCases: [
      { id: 1, input: "grid = [[0,1],[1,0],[1,1],[1,0]]", output: "1", isSample: true },
      { id: 2, input: "grid = [[0,1,1,1,0,0,0],[0,0,1,1,0,1,0]]", output: "2", isSample: true }
    ]
  },
  {
    id: "directed-graph-cycle",
    title: "Directed Graph Cycle",
    difficulty: "Medium",
    category: "Graph",
    topics: ["Graph", "Cycle Detection"],
    companies: ["Amazon", "Samsung", "Adobe"],
    order: 21,
    acceptance: "30.4%",
    description: "<p>Given a Directed Graph with <code>V</code> vertices (Numbered from <code>0</code> to <code>V-1</code>) and <code>E</code> edges, check whether it contains any cycle or not.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> V = 4, E = 4, edges = [[0, 1], [1, 2], [2, 3], [3, 3]]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> 3 -&gt; 3 is a cycle.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> V = 3, E = 2, edges = [[0, 1], [1, 2]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> No cycle in the graph.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; V, E &le; 10<sup>5</sup></code></li><li><code>0 &le; u, v &lt; V</code></li></ul>",
    testCases: [
      { id: 1, input: "V = 4, E = 4, edges = [[0, 1], [1, 2], [2, 3], [3, 3]]", output: "true", isSample: true },
      { id: 2, input: "V = 3, E = 2, edges = [[0, 1], [1, 2]]", output: "false", isSample: true }
    ]
  },
  {
    id: "flood-fill-algorithm",
    title: "Flood fill Algorithm",
    difficulty: "Medium",
    category: "Graph",
    topics: ["Graph", "Matrix"],
    companies: ["Google", "Microsoft", "Flipkart"],
    order: 22,
    acceptance: "51.2%",
    description: "<p>An image is represented by a 2-D array of integers, each integer representing the pixel value of the image.</p><p>Given a coordinate <code>(sr, sc)</code> representing the starting pixel (row and column) of the flood fill, and a pixel value <code>newColor</code>, \"flood fill\" the image.</p><p>To perform a \"flood fill\", consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on. Replace the color of all of the aforementioned pixels with the newColor.</p><p>Return the modified image.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2\n<strong>Output:</strong> [[2,2,2],[2,2,0],[2,0,1]]\n<strong>Explanation:</strong> From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.\nNote the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2\n<strong>Output:</strong> [[2,2,2],[2,2,2]]</pre><p><strong>Constraints:</strong></p><ul><li><code>m == image.length</code></li><li><code>n == image[i].length</code></li><li><code>1 &lt;= m, n &lt;= 50</code></li><li><code>0 &lt;= image[i][j], newColor &lt; 2<sup>16</sup></code></li><li><code>0 &lt;= sr &lt; m</code></li><li><code>0 &lt;= sc &lt; n</code></li></ul>",
    testCases: [
      { id: 1, input: "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2", output: "[[2,2,2],[2,2,0],[2,0,1]]", isSample: true },
      { id: 2, input: "image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2", output: "[[2,2,2],[2,2,2]]", isSample: true }
    ]
  },
  {
    id: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    topics: ["Array", "Binary Search"],
    companies: ["Amazon", "Microsoft", "Google", "Paytm"],
    order: 23,
    acceptance: "38.9%",
    description: "<p>Given a sorted and rotated array <code>A</code> of <code>N</code> distinct elements which is rotated at some point, and given an element <code>key</code>. The task is to find the index of the given element <code>key</code> in the array <code>A</code>.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> A = [5, 6, 7, 8, 9, 10, 1, 2, 3], key = 10\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> 10 is found at index 5.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> A = [3, 5, 1, 2], key = 6\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> 6 is not present in the array.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; N &le; 10<sup>7</sup></code></li><li><code>0 &le; A[i] &le; 10<sup>8</sup></code></li><li><code>1 &le; key &le; 10<sup>8</sup></code></li></ul><p><strong>Follow-up:</strong> Can you solve it in <code>O(log N)</code> time?</p>",
    testCases: [
      { id: 1, input: "A = [5, 6, 7, 8, 9, 10, 1, 2, 3], key = 10", output: "5", isSample: true },
      { id: 2, input: "A = [3, 1, 2], key = 1", output: "1", isSample: true }
    ]
  },
  {
    id: "k-th-element-of-two-arrays",
    title: "K-th element of two Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    topics: ["Array", "Binary Search"],
    companies: ["Google", "Microsoft", "Uber"],
    order: 24,
    acceptance: "25.1%",
    description: "<p>Given two sorted arrays <code>arr1</code> and <code>arr2</code> of size <code>N</code> and <code>M</code> respectively and an element <code>K</code>. The task is to find the element that would be at the <code>k</code>th position of the final sorted array.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> arr1 = [2, 3, 6, 7, 9], arr2 = [1, 4, 8, 10], k = 5\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The final sorted array would be 1, 2, 3, 4, 6, 7, 8, 9, 10. The 5th element is 6.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> arr1 = [100, 112, 256, 349, 770], arr2 = [72, 86, 113, 119, 265, 445, 892], k = 7\n<strong>Output:</strong> 256\n<strong>Explanation:</strong> The final sorted array would be 72, 86, 100, 112, 113, 119, 256, 265, 349, 445, 770, 892. The 7th element is 256.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= N, M &lt;= 10<sup>5</sup></code></li><li><code>1 &lt;= arr1[i], arr2[i] &lt;= 10<sup>6</sup></code></li><li><code>1 &lt;= K &lt;= N + M</code></li></ul><p><strong>Follow-up:</strong> Can you solve it in <code>O(log(N) + log(M))</code> time and <code>O(1)</code> auxiliary space?</p>",
    testCases: [
      { id: 1, input: "arr1 = [2, 3, 6, 7, 9], arr2 = [1, 4, 8, 10], k = 5", output: "6", isSample: true },
      { id: 2, input: "arr1 = [100, 112, 256, 349, 770], arr2 = [72, 86, 113, 119, 265, 445, 892], k = 7", output: "256", isSample: true }
    ]
  },
  {
    id: "0-1-knapsack-problem",
    title: "0 - 1 Knapsack Problem",
    difficulty: "Medium",
    category: "Dynamic Programming",
    topics: ["Dynamic Programming"],
    companies: ["Amazon", "Flipkart", "Morgan Stanley"],
    order: 25,
    acceptance: "32.4%",
    description: "<p>You are given weights and values of <code>N</code> items, put these items in a knapsack of capacity <code>W</code> to get the maximum total value in the knapsack.</p><p>Note that we have only <strong>one quantity of each item</strong>. In other words, given two integer arrays <code>val[0..N-1]</code> and <code>wt[0..N-1]</code> which represent values and weights associated with <code>N</code> items respectively. Also given an integer <code>W</code> which represents knapsack capacity, find out the maximum value subset of <code>val[]</code> such that sum of the weights of this subset is smaller than or equal to <code>W</code>. You cannot break an item, either pick the complete item or don't pick it (0-1 property).</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> N = 3, W = 4, values = [1,2,3], weight = [4,5,1]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> There are two items which have weight less than or equal to 4. If we select the item with weight 4, the possible value is 1. If we select the item with weight 1, the possible value is 3. So the maximum possible value is 3.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> N = 3, W = 3, values = [1,2,3], weight = [4,5,6]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> No item has weight less than or equal to 3.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; N &le; 1000</code></li><li><code>1 &le; W &le; 1000</code></li><li><code>1 &le; wt[i] &le; 1000</code></li><li><code>1 &le; v[i] &le; 1000</code></li></ul>",
    testCases: [
      { id: 1, input: "N = 3, W = 4, values = [1,2,3], weight = [4,5,1]", output: "3", isSample: true },
      { id: 2, input: "N = 3, W = 3, values = [1,2,3], weight = [4,5,6]", output: "0", isSample: true }
    ]
  },
  {
    id: "geeks-training",
    title: "Geek's Training",
    difficulty: "Medium",
    category: "Dynamic Programming",
    topics: ["Dynamic Programming", "2D DP"],
    companies: ["Amazon", "Samsung"],
    order: 26,
    acceptance: "45.8%",
    description: "<p>Geek is going for <code>N</code> days training program. He can perform any one of these three activities: Running, Fighting, and Learning Practice. Each activity has some point on each day. As Geek wants to improve all his skills, he can't do the same activity on two consecutive days. Help Geek to maximize his total points.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> N = 3, points = [[1,2,5],[3,1,1],[3,3,3]]\n<strong>Output:</strong> 11\n<strong>Explanation:</strong> Geek will learn a new move and earn 5 point then he will do running and earn 3 point and then he will do fighting and earn 3 points. Total points earned = 5 + 3 + 3 = 11.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> N = 3, points = [[10,40,70],[20,50,80],[30,60,90]]\n<strong>Output:</strong> 210\n<strong>Explanation:</strong> Geek will learn a new move and earn 70 point then he will do fighting and earn 50 point and then he will learn a new move and earn 90 points. Total points earned = 70 + 50 + 90 = 210.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; N &le; 10<sup>5</sup></code></li><li><code>1 &le; points[i][j] &le; 100</code></li></ul>",
    testCases: [
      { id: 1, input: "N = 3, points = [[1,2,5],[3,1,1],[3,3,3]]", output: "11", isSample: true },
      { id: 2, input: "N = 3, points = [[10,40,70],[20,50,80],[30,60,90]]", output: "210", isSample: true }
    ]
  },
  {
    id: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    topics: ["Array", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "Google", "Adobe"],
    order: 27,
    acceptance: "34.2%",
    description: "<p>Given an integer array <code>nums</code>, find a subarray that has the largest product, and return the product.</p><p>The test cases are generated so that the answer will fit in a <strong>32-bit</strong> integer.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> nums = [2,3,-2,4]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> [2,3] has the largest product 6.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> nums = [-2,0,-1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The result cannot be 2, because [-2,-1] is not a subarray.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; nums.length &le; 2 * 10<sup>4</sup></code></li><li><code>-10 &le; nums[i] &le; 10</code></li><li>The product of any prefix or suffix of <code>nums</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</li></ul>",
    testCases: [
      { id: 1, input: "nums = [2,3,-2,4]", output: "6", isSample: true },
      { id: 2, input: "nums = [-2,0,-1]", output: "0", isSample: true }
    ]
  },
  {
    id: "activity-selection",
    title: "Activity Selection",
    difficulty: "Medium",
    category: "Greedy",
    topics: ["Greedy"],
    companies: ["Flipkart", "Morgan Stanley", "Wipro"],
    order: 28,
    acceptance: "55.6%",
    description: "<p>Given <code>N</code> activities with their start and finish day given in array <code>start[ ]</code> and <code>end[ ]</code>. Select the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a given day.</p><p><strong>Note:</strong> The start time and end time of two activities may coincide.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> N = 2, start = [2, 1], end = [2, 2]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> A person can perform only one of the given activities.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> N = 4, start = [1, 3, 2, 5], end = [2, 4, 3, 6]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> A person can perform activities 1, 2 and 4.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; N &le; 2*10<sup>5</sup></code></li><li><code>1 &le; start[i] &le; end[i] &le; 10<sup>9</sup></code></li></ul>",
    testCases: [
      { id: 1, input: "N = 2, start = [2, 1], end = [2, 2]", output: "1", isSample: true },
      { id: 2, input: "N = 4, start = [1, 3, 2, 5], end = [2, 4, 3, 6]", output: "4", isSample: true }
    ]
  },
  {
    id: "job-sequencing-problem",
    title: "Job Sequencing Problem",
    difficulty: "Medium",
    category: "Greedy",
    topics: ["Greedy"],
    companies: ["Amazon", "Microsoft", "Infosys"],
    order: 29,
    acceptance: "42.1%",
    description: "<p>Given a set of <code>N</code> jobs where each job <code>i</code> has a deadline and profit associated with it. Each job takes 1 unit of time to complete and only one job can be scheduled at a time. We earn the profit if and only if the job is completed by its deadline. Find the number of jobs done and the maximum profit.</p><p><strong>Note:</strong> Jobs will be given in the form (Jobid, Deadline, Profit) associated with that Job.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> N = 4, Jobs = [(1,4,20),(2,1,10),(3,1,40),(4,1,30)]\n<strong>Output:</strong> 2 60\n<strong>Explanation:</strong> Job1 and Job3 can be done with maximum profit of 60 (20+40).</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> N = 5, Jobs = [(1,2,100),(2,1,19),(3,2,27),(4,1,25),(5,1,15)]\n<strong>Output:</strong> 2 127\n<strong>Explanation:</strong> 2 jobs can be done with maximum profit of 127 (100+27).</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; N &le; 10<sup>5</sup></code></li><li><code>1 &le; Deadline &le; N</code></li><li><code>1 &le; Profit &le; 500</code></li></ul>",
    testCases: [
      { id: 1, input: "N = 4, Jobs = [(1,4,20),(2,1,10),(3,1,40),(4,1,30)]", output: "2 60", isSample: true },
      { id: 2, input: "N = 5, Jobs = [(1,2,100),(2,1,19),(3,2,27),(4,1,25),(5,1,15)]", output: "2 127", isSample: true }
    ]
  },
  {
    id: "the-celebrity-problem",
    title: "The Celebrity Problem",
    difficulty: "Medium",
    category: "Stack",
    topics: ["Stack", "Two Pointers"],
    companies: ["Amazon", "Microsoft", "Google", "Flipkart"],
    order: 30,
    acceptance: "39.5%",
    description: "<p>A celebrity is a person who is known to all but does not know anyone at a party. If you go to a party of <code>N</code> people, find if there is a celebrity in the party or not. A square <code>NxN</code> matrix <code>M</code> is used to represent people at the party such that if an element of row <code>i</code> and column <code>j</code> is set to 1 it means ith person knows jth person. Here <code>M[i][i]</code> will always be 0.</p><p>Return the index of the celebrity, if there is no celebrity return -1.</p><p><strong>Note:</strong> Follow 0 based indexing.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> N = 3, M = [[0,1,0],[0,0,0],[0,1,0]]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> 0th and 2nd person both know 1. Therefore, 1 is the celebrity.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> N = 2, M = [[0,1],[1,0]]\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> The two people at the party both know each other. None of them is a celebrity.</pre><p><strong>Constraints:</strong></p><ul><li><code>2 &le; N &le; 3000</code></li><li><code>0 &le; M[i][j] &le; 1</code></li></ul><p><strong>Follow-up:</strong> Can you solve it in <code>O(N)</code> time and <code>O(1)</code> space?</p>",
    testCases: [
      { id: 1, input: "N = 3, M = [[0,1,0],[0,0,0],[0,1,0]]", output: "1", isSample: true },
      { id: 2, input: "N = 2, M = [[0,1],[1,0]]", output: "-1", isSample: true }
    ]
  },
  {
    id: "stock-span-problem",
    title: "Stock span problem",
    difficulty: "Medium",
    category: "Stack",
    topics: ["Stack"],
    companies: ["Amazon", "Samsung", "Adobe"],
    order: 31,
    acceptance: "48.3%",
    description: "<p>The stock span problem is a financial problem where we have a series of <code>n</code> daily price quotes for a stock and we need to calculate the span of stock's price for all <code>n</code> days. The span <code>S[i]</code> of the stock's price on a given day <code>i</code> is defined as the maximum number of consecutive days just before the given day, for which the price of the stock on the current day is less than or equal to its price on the given day.</p><p>For example, if an array of 7 days prices is given as <code>{100, 80, 60, 70, 60, 75, 85}</code>, then the span values for corresponding 7 days are <code>{1, 1, 1, 2, 1, 4, 6}</code>.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> N = 7, price = [100, 80, 60, 70, 60, 75, 85]\n<strong>Output:</strong> [1, 1, 1, 2, 1, 4, 6]\n<strong>Explanation:</strong> Traversing the given input span for 100 will be 1, 80 is smaller than 100 so the span is 1, 60 is smaller than 80 so the span is 1, 70 is greater than 60 so the span is 2 and so on. Hence the output will be 1 1 1 2 1 4 6.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> N = 6, price = [10, 4, 5, 90, 120, 80]\n<strong>Output:</strong> [1, 1, 2, 4, 5, 1]\n<strong>Explanation:</strong> Traversing the given input span for 10 will be 1, 4 is smaller than 10 so the span will be 1, 5 is greater than 4 so the span will be 2 and so on. Hence, the output will be 1 1 2 4 5 1.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; N &le; 10<sup>5</sup></code></li><li><code>1 &le; C[i] &le; 10<sup>5</sup></code></li></ul>",
    testCases: [
      { id: 1, input: "N = 7, price = [100, 80, 60, 70, 60, 75, 85]", output: "[1, 1, 1, 2, 1, 4, 6]", isSample: true },
      { id: 2, input: "N = 6, price = [10, 4, 5, 90, 120, 80]", output: "[1, 1, 2, 4, 5, 1]", isSample: true }
    ]
  },
  {
    id: "k-sized-subarray-maximum",
    title: "K Sized Subarray Maximum",
    difficulty: "Hard",
    category: "Sliding Window",
    topics: ["Array", "Deque", "Sliding Window"],
    companies: ["Amazon", "Google", "Flipkart", "Atlassian"],
    order: 32,
    acceptance: "28.7%",
    description: "<p>Given an array <code>arr[]</code> of size <code>N</code> and an integer <code>K</code>. Find the maximum for each and every contiguous subarray of size <code>K</code>.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> N = 9, K = 3, arr = [1, 2, 3, 1, 4, 5, 2, 3, 6]\n<strong>Output:</strong> [3, 3, 4, 5, 5, 5, 6]\n<strong>Explanation:</strong> \n1st contiguous subarray = [1 2 3] max = 3\n2nd contiguous subarray = [2 3 1] max = 3\n3rd contiguous subarray = [3 1 4] max = 4\n4th contiguous subarray = [1 4 5] max = 5\n5th contiguous subarray = [4 5 2] max = 5\n6th contiguous subarray = [5 2 3] max = 5\n7th contiguous subarray = [2 3 6] max = 6</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> N = 10, K = 4, arr = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13]\n<strong>Output:</strong> [10, 10, 10, 15, 15, 90, 90]\n<strong>Explanation:</strong> \n1st contiguous subarray = [8 5 10 7], max = 10\n2nd contiguous subarray = [5 10 7 9], max = 10\n3rd contiguous subarray = [10 7 9 4], max = 10\n4th contiguous subarray = [7 9 4 15], max = 15\n5th contiguous subarray = [9 4 15 12], max = 15\n6th contiguous subarray = [4 15 12 90], max = 90\n7th contiguous subarray = [15 12 90 13], max = 90</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; N &le; 10<sup>5</sup></code></li><li><code>1 &le; K &le; N</code></li><li><code>0 &le; arr[i] &le; 10<sup>7</sup></code></li></ul>",
    testCases: [
      { id: 1, input: "N = 9, K = 3, arr = [1, 2, 3, 1, 4, 5, 2, 3, 6]", output: "[3, 3, 4, 5, 5, 5, 6]", isSample: true },
      { id: 2, input: "N = 10, K = 4, arr = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13]", output: "[10, 10, 10, 15, 15, 90, 90]", isSample: true }
    ]
  },
  {
    id: "smallest-positive-missing",
    title: "Smallest Positive Missing",
    difficulty: "Medium",
    category: "Hashing",
    topics: ["Array", "Hashing", "Sorting"],
    companies: ["Amazon", "Microsoft", "Samsung", "Paytm"],
    order: 33,
    acceptance: "31.2%",
    description: "<p>You are given an array <code>arr[]</code> of <code>N</code> integers. The task is to find the smallest positive number missing from the array.</p><p><strong>Note:</strong> Positive number starts from 1.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> N = 5, arr = [1,2,3,4,5]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> Smallest positive missing number is 6.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> N = 5, arr = [0,-10,1,3,-20]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> Smallest positive missing number is 2.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; N &le; 10<sup>6</sup></code></li><li><code>-10<sup>6</sup> &le; arr[i] &le; 10<sup>6</sup></code></li></ul><p><strong>Follow-up:</strong> Can you solve it in <code>O(N)</code> time and <code>O(1)</code> auxiliary space?</p>",
    testCases: [
      { id: 1, input: "N = 5, arr = [1,2,3,4,5]", output: "6", isSample: true },
      { id: 2, input: "N = 5, arr = [0,-10,1,3,-20]", output: "2", isSample: true }
    ]
  },
  {
    id: "largest-subarray-with-0-sum",
    title: "Largest subarray with 0 sum",
    difficulty: "Medium",
    category: "Hashing",
    topics: ["Array", "Hashing"],
    companies: ["Amazon", "Microsoft", "Morgan Stanley"],
    order: 34,
    acceptance: "43.9%",
    description: "<p>Given an array having both positive and negative integers. The task is to compute the length of the largest subarray with sum 0.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> N = 8, A = [15,-2,2,-8,1,7,10,23]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> The largest subarray with sum 0 is -2 2 -8 1 7.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> N = 3, A = [1, 2, 3]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> There is no subarray with 0 sum.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; N &le; 10<sup>5</sup></code></li><li><code>-1000 &le; A[i] &le; 1000</code></li></ul>",
    testCases: [
      { id: 1, input: "N = 8, A = [15,-2,2,-8,1,7,10,23]", output: "5", isSample: true },
      { id: 2, input: "N = 3, A = [-1,1,-1]", output: "2", isSample: true }
    ]
  },
  {
    id: "n-queen-problem",
    title: "N-Queen Problem",
    difficulty: "Hard",
    category: "Backtracking",
    topics: ["Backtracking"],
    companies: ["Amazon", "Microsoft", "Google", "Adobe"],
    order: 35,
    acceptance: "22.5%",
    description: "<p>The n-queens puzzle is the problem of placing <code>n</code> queens on a <code>(n&times;n)</code> chessboard such that no two queens can attack each other. Given an integer <code>n</code>, find all distinct solutions to the n-queens puzzle.</p><p>Each solution contains distinct board configurations of the n-queens' placement, where the solutions are a permutation of <code>[1,2,3..n]</code> in increasing order, here the number in the <i>ith</i> place denotes that the <i>ith</i>-column queen is placed in the row with that number. For eg below figure represents a chessboard [3 1 4 2].</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> n = 4\n<strong>Output:</strong> [[2, 4, 1, 3], [3, 1, 4, 2]]\n<strong>Explanation:</strong> These are the 2 possible solutions for 4x4 chessboard.</pre><p><strong>Example 2:</strong></p><pre><strong>Input:</strong> n = 1\n<strong>Output:</strong> [[1]]\n<strong>Explanation:</strong> Only one queen can be placed in the single cell available.</pre><p><strong>Constraints:</strong></p><ul><li><code>1 &le; n &le; 10</code></li></ul>",
    testCases: [
      { id: 1, input: "n = 4", output: "[[2, 4, 1, 3], [3, 1, 4, 2]]", isSample: true },
      { id: 2, input: "n = 1", output: "[[1]]", isSample: true }
    ]
  },
  {
    id: "solve-the-sudoku",
    title: "Solve the Sudoku",
    difficulty: "Hard",
    category: "Backtracking",
    topics: ["Backtracking", "Matrix"],
    companies: ["Amazon", "Microsoft", "Flipkart"],
    order: 36,
    acceptance: "26.8%",
    description: "<p>Given an incomplete Sudoku configuration in terms of a <code>9 x 9</code> 2-D square matrix (<code>grid[][]</code>), the task is to find a solved Sudoku. For simplicity, you may assume that there will be only one unique solution.</p><p>A sudoku solution must satisfy all of the following rules:</p><ol><li>Each of the digits <code>1-9</code> must occur exactly once in each row.</li><li>Each of the digits <code>1-9</code> must occur exactly once in each column.</li><li>Each of the digits <code>1-9</code> must occur exactly once in each of the 9 <code>3x3</code> sub-boxes of the grid.</li></ol><p>Zeros in the grid indicates blanks, which are to be filled with some number between 1-9. You need to print the solved grid.</p><p><strong>Example 1:</strong></p><pre><strong>Input:</strong> grid = [[3, 0, 6, 5, 0, 8, 4, 0, 0], [5, 2, 0, 0, 0, 0, 0, 0, 0], [0, 8, 7, 0, 0, 0, 0, 3, 1], [0, 0, 3, 0, 1, 0, 0, 8, 0], [9, 0, 0, 8, 6, 3, 0, 0, 5], [0, 5, 0, 0, 9, 0, 6, 0, 0], [1, 3, 0, 0, 0, 0, 2, 5, 0], [0, 0, 0, 0, 0, 0, 0, 7, 4], [0, 0, 5, 2, 0, 6, 3, 0, 0]]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The solved sudoku is:\n3 1 6 5 7 8 4 9 2\n5 2 9 1 3 4 7 6 8\n4 8 7 6 2 9 5 3 1\n2 6 3 4 1 5 9 8 7\n9 7 4 8 6 3 1 2 5\n8 5 1 7 9 2 6 4 3\n1 3 8 9 4 7 2 5 6\n6 9 2 3 5 1 8 7 4\n7 4 5 2 8 6 3 1 9</pre><p><strong>Constraints:</strong></p><ul><li><code>grid.length == 9</code></li><li><code>grid[i].length == 9</code></li><li><code>0 &le; grid[i][j] &le; 9</code></li></ul>",
    testCases: [
      { id: 1, input: "grid = [[3, 0, 6, 5, 0, 8, 4, 0, 0], [5, 2, 0, 0, 0, 0, 0, 0, 0], [0, 8, 7, 0, 0, 0, 0, 3, 1], [0, 0, 3, 0, 1, 0, 0, 8, 0], [9, 0, 0, 8, 6, 3, 0, 0, 5], [0, 5, 0, 0, 9, 0, 6, 0, 0], [1, 3, 0, 0, 0, 0, 2, 5, 0], [0, 0, 0, 0, 0, 0, 0, 7, 4], [0, 0, 5, 2, 0, 6, 3, 0, 0]]", output: "true", isSample: true },
      { id: 2, input: "grid = [[3, 6, 6, 5, 0, 8, 4, 0, 0], [5, 2, 0, 0, 0, 0, 0, 0, 0], [0, 8, 7, 0, 0, 0, 0, 3, 1], [0, 0, 3, 0, 1, 0, 0, 8, 0], [9, 0, 0, 8, 6, 3, 0, 0, 5], [0, 5, 0, 0, 9, 0, 6, 0, 0], [1, 3, 0, 0, 0, 0, 2, 5, 0], [0, 0, 0, 0, 0, 0, 0, 7, 4], [0, 0, 5, 2, 0, 6, 3, 0, 0]]", output: "false", isSample: true }
    ]
  }
];
