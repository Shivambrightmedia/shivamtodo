import { Problem } from '../types';

export const RECURSION_PROBLEMS: Problem[] = [
  {
    id: 'rec-1',
    title: 'Fibonacci Number',
    difficulty: 'Easy',
    category: 'Recursion',
    description: 'Calculate the nth n in the Fibonacci sequence where F(n) = F(n-1) + F(n-2).',
    approach: 'Identify base cases: F(0)=0, F(1)=1. Recursive step: sum of previous two values. Good for understanding multiple recursive calls.',
    complexity: 'Time: O(2^n) without memoization, Space: O(n) recursion depth.',
    example: 'n=4 -> F(3)+F(2) -> (F(2)+F(1)) + (F(1)+F(0)) -> 3',
    diagram: `
       fib(4)
      /      \\
  fib(3)    fib(2)
  /    \\     /   \\
f(2)  f(1) f(1) f(0)
    `,
    code: `/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    public int fib(int n) {
        // Base case: agar n 0 ya 1 hai, toh wahi return kardo
        if (n == 0 || n == 1) {
            return n;
        }
        // Recursive call: pichle 2 numbers ka sum
        int prev1 = fib(n - 1);
        int prev2 = fib(n - 2);
        
        return prev1 + prev2;
    }
}`
  },
  {
    id: 'rec-2',
    title: 'Reverse String',
    difficulty: 'Easy',
    category: 'Recursion',
    description: 'Reverse an array of characters in-place using recursion.',
    approach: 'Swap first and last characters, then recursively call on the inner substring. Base case: string length < 2.',
    complexity: 'Time: O(n), Space: O(n) recursion stack.',
    example: '["h","e","l","l","o"] -> swap "h","o" -> reverse ["e","l","l"]',
    diagram: `
[h, e, l, l, o] (swap h,o)
  \\
   [e, l, l] (swap e,l)
     \\
      [l] (base case)
    `,
    code: `/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private void reverseHelper(char[] chars, int left, int right) {
        // Base case: jab pointers cross kar jayein
        if (left >= right) return;
        
        // Dono characters ko swap karo
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        
        // Andar ke array ke liye recursive call
        reverseHelper(chars, left + 1, right - 1);
    }
    
    public void reverseString(char[] chars) {
        reverseHelper(chars, 0, chars.length - 1);
    }
}`
  },
  {
    id: 'rec-3',
    title: 'Factorial',
    difficulty: 'Easy',
    category: 'Recursion',
    description: 'Standard product of all positive integers less than or equal to n.',
    approach: 'Base case: n=0 or n=1 returns 1. Recursive step: n * factorial(n-1). Foundation of recursive thinking.',
    complexity: 'Time: O(n), Space: O(n).',
    example: '5! = 5 * 4 * 3 * 2 * 1 = 120',
    diagram: `
fact(4) -> 4 * fact(3)
               \\
                3 * fact(2)
                    \\
                     2 * fact(1) -> returns 1
    `,
    code: `/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    public int factorial(int n) {
        // Base case: 0 aur 1 ka factorial 1 hota hai
        if (n <= 1) return 1;
        
        // Recursive step: n * (n-1)!
        return n * factorial(n - 1);
    }
}`
  },
  {
    id: 'rec-4',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Recursion',
    description: 'Find target in sorted array by repeatedly dividing the search interval in half.',
    approach: 'Compare target with mid element. Recurse into left half if target is smaller, right half if larger.',
    complexity: 'Time: O(log n), Space: O(log n) recursion stack.',
    example: 'arr=[1,2,3,4,5], target=4 -> mid=3 -> search [4,5] -> found',
    diagram: `
[1, 2, 3, 4, 5] (mid=3) target=4
         \\
         [4, 5] (mid=4) 
           |
         Found!
    `,
    code: `/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private int searchHelper(int[] nums, int target, int start, int end) {
        // Base case: agar search space khatam ho jaye
        if (start > end) return -1;
        
        int mid = start + (end - start) / 2;
        
        // Agar target mil gaya
        if (nums[mid] == target) {
            return mid;
        }
        
        // Agar target chota hai, left half me dhoondo
        if (nums[mid] > target) {
            return searchHelper(nums, target, start, mid - 1);
        }
        
        // Warna right half me dhoondo
        return searchHelper(nums, target, mid + 1, end);
    }

    public int search(int[] nums, int target) {
        return searchHelper(nums, target, 0, nums.length - 1);
    }
}`
  },
  {
    id: 'rec-5',
    title: 'Sum of Digits',
    difficulty: 'Easy',
    category: 'Recursion',
    description: 'Find the sum of digits of a non-negative integer.',
    approach: 'Extract last digit using % 10. Recurse with n / 10. Base case: n < 10.',
    complexity: 'Time: O(log10 n), Space: O(log10 n).',
    example: '123 -> 3 + Sum(12) -> 3 + 2 + Sum(1) -> 6',
    diagram: `
sum(123) -> 3 + sum(12)
                 \\
                  2 + sum(1)
                       \\
                        return 1
    `,
    code: `/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    public int sumOfDigits(int n) {
        // Base case: agar n 10 se chota hai, wahi digit return kardo
        if (n < 10) return n;
        
        int rem = n % 10;
        int remNum = n / 10;
        
        // Last digit aur bache hue n ka sum
        return rem + sumOfDigits(remNum);
    }
}`
  },
  {
    id: 'rec-6',
    title: 'Merge Sort',
    difficulty: 'Medium',
    category: 'Recursion',
    description: 'Divide and conquer sorting algorithm.',
    approach: 'Divide array into two halves, recursively sort them, then merge the sorted halves. Teaches nested recursion and post-processing.',
    complexity: 'Time: O(n log n), Space: O(n).',
    example: '[3,1,4,2] -> sort [3,1] and [4,2] -> [1,3] and [2,4] -> merge [1,2,3,4]',
    diagram: `
     [3,1,4,2]
      /     \\
  [3,1]    [4,2]
   / \\      / \\
 [3] [1]  [4] [2]
   \\ /      \\ /
  [1,3]    [2,4]
      \\    /
    [1,2,3,4]
    `,
    code: `import java.util.ArrayList;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private void mergeHalves(int[] nums, int start, int mid, int end) {
        ArrayList<Integer> tempList = new ArrayList<>();
        int i = start;
        int j = mid + 1;
        
        // Dono halves ko compare karke chota element temp me dalo
        while (i <= mid && j <= end) {
            if (nums[i] <= nums[j]) {
                tempList.add(nums[i++]);
            } else {
                tempList.add(nums[j++]);
            }
        }
        
        // Baki bache hue elements ko dalo
        while (i <= mid) tempList.add(nums[i++]);
        while (j <= end) tempList.add(nums[j++]);
        
        // Original array me wapas copy karo
        for (int i = start; i <= end; i++) {
            nums[i] = tempList.get(i - start);
        }
    }
    
    public void mergeSort(int[] nums, int start, int end) {
        // Base case: single element
        if (start >= end) return;
        
        int mid = start + (end - start) / 2;
        
        // Left aur right half ko recursively sort karo
        mergeSort(nums, start, mid);
        mergeSort(nums, mid + 1, end);
        
        // Dono sorted halves ko merge kardo
        mergeHalves(nums, start, mid, end);
    }
}`
  },
  {
    id: 'rec-7',
    title: 'Tower of Hanoi',
    difficulty: 'Medium',
    category: 'Recursion',
    description: 'Move n disks from source to destination rod following rules.',
    approach: 'Move n-1 disks to auxiliary rod, move nth disk to destination, move n-1 disks from auxiliary to destination.',
    complexity: 'Time: O(2^n), Space: O(n).',
    example: '3 disks -> 7 moves required.',
    diagram: `
Move(3, A, C)
 ├── Move(2, A, B)
 ├── Move Disk 3 to C
 └── Move(2, B, C)
    `,
    code: `/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    public void moveDisks(int n, char src, char aux, char dest) {
        // Base case: sirf 1 disk hai toh direct move kardo
        if (n == 1) {
            System.out.println("Move disk 1 from " + src + " to " + dest);
            return;
        }
        
        // N-1 disks ko source se auxiliary me rakho
        moveDisks(n - 1, src, dest, aux);
        
        // Badi disk ko destination pe rakho
        System.out.println("Move disk " + n + " from " + src + " to " + dest);
        
        // Un N-1 disks ko auxiliary se wapas destination pe rakho
        moveDisks(n - 1, aux, src, dest);
    }
}`
  },
  {
    id: 'rec-8',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Recursion',
    description: 'Ways to reach nth step if you can take 1 or 2 steps.',
    approach: 'Similar to Fibonacci. way(n) = way(n-1) + way(n-2). Base cases: n=1 -> 1, n=2 -> 2.',
    complexity: 'Time: O(2^n), Space: O(n).',
    example: 'n=3 -> (1,1,1), (1,2), (2,1) -> 3 ways',
    diagram: `
        step(4)
      /         \\
  step(3)     step(2)
  /     \\
step(2) step(1)
    `,
    code: `import java.util.Arrays;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private int countWays(int step, int[] memo) {
        // Base case: 0 ya 1 step bache hain toh 1 hi tarika hai
        if (step <= 1) return 1;
        
        // Agar pehle compute kiya hua hai
        if (memo[step] != -1) {
            return memo[step];
        }
        
        // 1 step lo + 2 step lo
        int ways1 = countWays(step - 1, memo);
        int ways2 = countWays(step - 2, memo);
        
        memo[step] = ways1 + ways2;
        return memo[step];
    }
    
    public int climbStairs(int n) {
        int[] memo = new int[n + 1];
        Arrays.fill(memo, -1);
        return countWays(n, memo);
    }
}`
  },
  {
    id: 'rec-9',
    title: 'Count Inversions',
    difficulty: 'Hard',
    category: 'Recursion',
    description: 'Count pairs in array where i < j and arr[i] > arr[j].',
    approach: 'Use Merge Sort. When left half element > right half element, all remaining elements in left half form inversions.',
    complexity: 'Time: O(n log n), Space: O(n).',
    example: '[2, 4, 1, 3, 5] -> 3 inversions (2>1, 4>1, 4>3)',
    diagram: `
[2, 4]  merged with  [1, 3, 5]
  |                    |
 2 > 1? YES -> Inversions += (remaining in left)
 4 > 3? YES -> Inversions += (remaining in left)
    `,
    code: `/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private int mergeAndCountInversions(int[] nums, int start, int mid, int end) {
        int[] temp = new int[end - start + 1];
        int i = start, j = mid + 1;
        int k = 0, invCount = 0;
        
        // Dono halves ko compare karo
        while (i <= mid && j <= end) {
            if (nums[i] <= nums[j]) {
                temp[k++] = nums[i++];
            } else {
                // Agar right chota hai, toh inversion hai
                temp[k++] = nums[j++];
                // Left ke bache hue sabhi elements right wale se bade honge
                invCount += (mid + 1 - i); 
            }
        }
        
        while (i <= mid) temp[k++] = nums[i++];
        while (j <= end) temp[k++] = nums[j++];
        
        for (int i = start; i <= end; i++) {
            nums[i] = temp[i - start];
        }
        return invCount;
    }

    private int mergeSortAndCount(int[] nums, int start, int end) {
        int totInv = 0;
        if (start < end) {
            int mid = start + (end - start) / 2;
            
            // Left aur right half ke inversions
            totInv += mergeSortAndCount(nums, start, mid);
            totInv += mergeSortAndCount(nums, mid + 1, end);
            
            // Merge karte waqt ke inversions
            totInv += mergeAndCountInversions(nums, start, mid, end);
        }
        return totInv;
    }
    
    public int countInversions(int[] nums) {
        return mergeSortAndCount(nums, 0, nums.length - 1);
    }
}`
  },

];