"use client";
import { useState } from 'react';
import { Search, ChevronLeft, Code2, Brain, Zap, Terminal, Lightbulb, BookOpen, Map, Sun, Moon } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Recursion' | 'Backtracking';
  description: string;
  approach: string;
  complexity: string;
  example: string;
  diagram: string;
  code: string;
}

const PROBLEMS: Problem[] = [
  // RECURSION
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

  // BACKTRACKING
  {
    id: 'back-1',
    title: 'Permutations',
    difficulty: 'Medium',
    category: 'Backtracking',
    description: 'Find all possible orderings of a distinct integer array.',
    approach: 'Iterate through all elements, pick one, recurse for remaining, then backtrack (unpick) to try other combinations.',
    complexity: 'Time: O(n!), Space: O(n!).',
    example: '[1,2] -> [1,2], [2,1]',
    diagram: `
       []
     /    \\
   [1]    [2]
    |      |
  [1,2]  [2,1]
    `,
    code: `import java.util.ArrayList;
import java.util.List;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private void findPermutations(int[] numbers, List<List<Integer>> ans, int idx) {
        // Agar array ke end tak pahunch gaye
        if (idx == numbers.length) {
            List<Integer> temp = new ArrayList<>();
            for (int num : numbers) temp.add(num);
            ans.add(temp);
            return;
        }
        
        // Har element ke sath swap try karo
        for (int i = idx; i < numbers.length; i++) {
            swapElements(numbers, idx, i); // Do step (Pick)
            
            findPermutations(numbers, ans, idx + 1); // Explore
            
            swapElements(numbers, idx, i); // Undo step (Backtrack)
        }
    }
    
    private void swapElements(int[] numbers, int indexA, int indexB) {
        int tempValue = numbers[indexA];
        numbers[indexA] = numbers[indexB];
        numbers[indexB] = tempValue;
    }
    
    public List<List<Integer>> permute(int[] numbers) {
        List<List<Integer>> ans = new ArrayList<>();
        findPermutations(numbers, ans, 0);
        return ans;
    }
}`
  },
  {
    id: 'back-2',
    title: 'Subsets (Power Set)',
    difficulty: 'Medium',
    category: 'Backtracking',
    description: 'Generate all possible subsets of a set.',
    approach: 'At each element, make two choices: include it or exclude it. Recurse for both paths.',
    complexity: 'Time: O(2^n), Space: O(2^n).',
    example: '[1,2] -> [], [1], [2], [1,2]',
    diagram: `
          []
      /        \\
   [1]          [] (exclude 1)
   / \\         / \\
[1,2] [1]    [2] []
    `,
    code: `import java.util.ArrayList;
import java.util.List;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private void generateSubsets(int[] numbers, List<Integer> path, int idx, List<List<Integer>> ans) {
        // Base case: array khatam
        if (idx >= numbers.length) {
            ans.add(new ArrayList<>(path));
            return;
        }
        
        // Choice 1: Exclude current element
        generateSubsets(numbers, path, idx + 1, ans);
        
        // Choice 2: Include current element
        path.add(numbers[idx]);
        generateSubsets(numbers, path, idx + 1, ans);
        
        // Backtrack: state clean karo
        path.remove(path.size() - 1);
    }
    
    public List<List<Integer>> subsets(int[] numbers) {
        List<List<Integer>> ans = new ArrayList<>();
        generateSubsets(numbers, new ArrayList<>(), 0, ans);
        return ans;
    }
}`
  },
  {
    id: 'back-2-2',
    title: 'Subsets II',
    difficulty: 'Medium',
    category: 'Backtracking',
    description: 'Generate all unique subsets of a set that contains duplicates.',
    approach: 'Sort array. Use loop to iterate. If element is same as previous, skip it to avoid duplicate subsets.',
    complexity: 'Time: O(2^n), Space: O(2^n).',
    example: '[1,2,2] -> [], [1], [1,2], [1,2,2], [2], [2,2]',
    diagram: `
[1, 2, 2]
Loop picking logic:
pick 1 -> [1]
pick 2 -> [1,2] -> [1,2,2]
skip second 2 to avoid dupes!
    `,
    code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private void findUniqueSubsets(int idx, int[] numbers, List<Integer> path, List<List<Integer>> ans) {
        // Har state ek valid subset hai
        ans.add(new ArrayList<>(path));
        
        for (int i = idx; i < numbers.length; i++) {
            // Agar same n pehle aa chuka hai is level pe, toh skip karo
            if (i != idx && numbers[i] == numbers[i - 1]) {
                continue;
            }
            
            path.add(numbers[i]); // Pick
            
            findUniqueSubsets(i + 1, numbers, path, ans); // Explore
            
            path.remove(path.size() - 1); // Backtrack
        }
    }

    public List<List<Integer>> subsetsWithDup(int[] numbers) {
        Arrays.sort(numbers); // Sort karna zaroori hai duplicates sath rakhne ke liye
        List<List<Integer>> ans = new ArrayList<>();
        findUniqueSubsets(0, numbers, new ArrayList<>(), ans);
        return ans;
    }
}`
  },
  {
    id: 'back-3',
    title: 'Combination Sum I',
    difficulty: 'Medium',
    category: 'Backtracking',
    description: 'Find all unique combinations where numbers sum to target. Elements can be used unlimited times.',
    approach: 'Maintain current sum. Pick element, recurse with same index. Backtrack if sum exceeds target.',
    complexity: 'Time: O(2^target), Space: O(target).',
    example: 'nums=[2,3], target=5 -> [2,3]',
    diagram: `
[2,3], target=5
Pick 2 -> Sum=2 (remaining 3)
 |-> Pick 2 again -> Sum=4 (rem 1)
 |    |-> Pick 2 -> Sum=6 (Exceeds! Backtrack)
 |-> Pick 3 -> Sum=5 (Found! Backtrack)
    `,
    code: `import java.util.ArrayList;
import java.util.List;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private void findCombinations(int idx, int rem, int[] nums, List<List<Integer>> ans, List<Integer> path) {
        // Agar array end tak check kar liya
        if (idx == nums.length) {
            if (rem == 0) {
                ans.add(new ArrayList<>(path));
            }
            return;
        }
        
        // Choice 1: Pick the element (agar capacity hai)
        if (nums[idx] <= rem) {
            path.add(nums[idx]);
            
            // Same index pe dobara call kar sakte hain kyunki unlimited supply hai
            findCombinations(idx, rem - nums[idx], nums, ans, path);
            
            path.remove(path.size() - 1); // Backtrack
        }
        
        // Choice 2: Do NOT pick the element, aage badho
        findCombinations(idx + 1, rem, nums, ans, path);
    }
    
    public List<List<Integer>> combinationSum(int[] nums, int targetSum) {
        List<List<Integer>> ans = new ArrayList<>();
        findCombinations(0, targetSum, nums, ans, new ArrayList<>());
        return ans;
    }
}`
  },
  {
    id: 'back-3-2',
    title: 'Combination Sum II',
    difficulty: 'Medium',
    category: 'Backtracking',
    description: 'Find combinations where numbers sum to target. Elements can be used only once. No duplicate combinations.',
    approach: 'Sort array. Iterate through elements. If duplicate, skip. Pick element, recurse with next index.',
    complexity: 'Time: O(2^n), Space: O(n).',
    example: 'nums=[10,1,2,7,6,1,5], target=8 -> [1,1,6], [1,2,5], [1,7], [2,6]',
    diagram: `
Sorted: [1, 1, 2, 5, 6, 7, 10]
Pick 1
 |-> Pick 1 -> Sum=2
 |    |-> Pick 6 -> Sum=8 (Found!)
 |-> Skip second 1 to avoid duplicate combos!
    `,
    code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private void findUniqueCombinations(int idx, int rem, int[] nums, List<List<Integer>> ans, List<Integer> path) {
        if (rem == 0) {
            ans.add(new ArrayList<>(path));
            return;
        }
        
        for (int i = idx; i < nums.length; i++) {
            // Duplicates ko ignore karo is recursion level pe
            if (i > idx && nums[i] == nums[i - 1]) continue;
            
            // Agar element required sum se bada hai, aage check karne ka fayda nahi
            if (nums[i] > rem) break;
            
            path.add(nums[i]); // Pick
            
            // Agle index se recurse karo (ek element ek hi baar allowed hai)
            findUniqueCombinations(i + 1, rem - nums[i], nums, ans, path);
            
            path.remove(path.size() - 1); // Backtrack
        }
    }
    
    public List<List<Integer>> combinationSum2(int[] nums, int targetSum) {
        List<List<Integer>> ans = new ArrayList<>();
        Arrays.sort(nums); // Sort karna zaroori hai duplicates avoid karne ke liye
        findUniqueCombinations(0, targetSum, nums, ans, new ArrayList<>());
        return ans;
    }
}`
  },
  {
    id: 'back-4',
    title: 'N-Queens',
    difficulty: 'Hard',
    category: 'Backtracking',
    description: 'Place N queens on an NxN chessboard so no two queens threaten each other.',
    approach: 'Place queen in a row, check validity (column, diagonals). If valid, move to next row. If no position works, backtrack.',
    complexity: 'Time: O(n!), Space: O(n^2).',
    example: '4-Queens -> 2 valid solutions.',
    diagram: `
. Q . .
. . . Q
Q . . .
. . Q .
(Valid State)
    `,
    code: `import java.util.ArrayList;
import java.util.List;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private void placeQueens(int col, char[][] board, List<List<String>> ans, 
               int[] leftRow, int[] upDiag, int[] lowDiag, int n) {
        
        // Agar saare columns fill ho gaye
        if (col == n) {
            ans.add(constructBoardLayout(board));
            return;
        }
        
        // Har row me queen place karke check karo
        for (int row = 0; row < n; row++) {
            
            // Hashing arrays se O(1) me check karo ki cell safe hai ya nahi
            if (leftRow[row] == 0 && 
                lowDiag[row + col] == 0 && 
                upDiag[n - 1 + col - row] == 0) {
                
                // Queen rakho
                board[row][col] = 'Q'; 
                leftRow[row] = 1;
                lowDiag[row + col] = 1;
                upDiag[n - 1 + col - row] = 1;
                
                // Agle column ke liye recurse karo
                placeQueens(col + 1, board, ans, leftRow, upDiag, lowDiag, n);
                
                // Backtrack: Queen hatao aur hash arrays ko reset karo
                board[row][col] = '.';
                leftRow[row] = 0;
                lowDiag[row + col] = 0;
                upDiag[n - 1 + col - row] = 0;
            }
        }
    }
    
    private List<String> constructBoardLayout(char[][] board) {
        List<String> boardStr = new ArrayList<>();
        for (int i = 0; i < board.length; i++) {
            boardStr.add(new String(board[i]));
        }
        return boardStr;
    }
    
    public List<List<String>> solveNQueens(int n) {
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = '.'; // Empty board
            }
        }
        List<List<String>> ans = new ArrayList<>();
        
        // O(1) safe check ke liye hash arrays
        int[] leftRow = new int[n];
        int[] upDiag = new int[2 * n - 1];
        int[] lowDiag = new int[2 * n - 1];
        
        placeQueens(0, board, ans, leftRow, upDiag, lowDiag, n);
        return ans;
    }
}`
  },
  {
    id: 'back-5',
    title: 'Word Search',
    difficulty: 'Medium',
    category: 'Backtracking',
    description: 'Find if a word exists in a character grid.',
    approach: 'DFS from each cell matching first char. Mark cell as visited, check neighbors, then unmark (backtrack) if path fails.',
    complexity: 'Time: O(N * 3^L), Space: O(L) where L is word length.',
    example: 'Grid=[["A","B"],["C","D"]], word="AC" -> Found',
    diagram: `
A - B
|
C - D
Find "AC":
A -> (try B) fails
  -> (try C) succeeds -> Found!
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
    private boolean dfs(char[][] board, String word, int r, int c, int idx) {
        // Agar pura word match ho gaya
        if (idx == word.length()) return true;
        
        // Boundaries check karo aur character match nahi kar raha toh false
        if (r < 0 || c < 0 || 
            r >= board.length || c >= board[0].length || 
            board[r][c] != word.charAt(idx)) {
            return false;
        }
        
        char temp = board[r][c];
        board[r][c] = '*'; // Cell ko visited mark karo
        
        // 4 directions me jao (Up, Down, Left, Right)
        boolean found = dfs(board, word, r + 1, c, idx + 1) ||
                            dfs(board, word, r - 1, c, idx + 1) ||
                            dfs(board, word, r, c + 1, idx + 1) ||
                            dfs(board, word, r, c - 1, idx + 1);
                     
        board[r][c] = temp; // Backtrack: Original state restore karo
        return found;
    }
    
    public boolean exist(char[][] board, String word) {
        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col < board[0].length; col++) {
                // Agar first character mil jaye, wahan se DFS start karo
                if (board[row][col] == word.charAt(0)) {
                    if (dfs(board, word, row, col, 0)) {
                        return true;
                    }
                }
            }
        }
        return false; // Kahin match nahi hua
    }
}`
  },
  {
    id: 'back-6',
    title: 'Palindrome Partitioning',
    difficulty: 'Medium',
    category: 'Backtracking',
    description: 'Split string such that every substring is a palindrome.',
    approach: 'Try every possible cut. If substring is palindrome, recurse on remainder. Backtrack to try different cuts.',
    complexity: 'Time: O(n * 2^n), Space: O(n).',
    example: '"aab" -> ["a","a","b"], ["aa","b"]',
    diagram: `
"aab"
Cut "a" (Pal!) -> rem "ab" -> Cut "a" (Pal!) -> rem "b" -> Cut "b" => [a,a,b]
Cut "aa" (Pal!) -> rem "b" -> Cut "b" => [aa,b]
    `,
    code: `import java.util.ArrayList;
import java.util.List;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private boolean checkIsPalindrome(String str, int start, int end) {
        while (start <= end) {
            if (str.charAt(start++) != str.charAt(end--)) {
                return false;
            }
        }
        return true;
    }
    
    private void findPartitions(int idx, String s, List<String> path, List<List<String>> ans) {
        // String end ho gayi, toh valid partition ban chuka hai
        if (idx == s.length()) {
            ans.add(new ArrayList<>(path));
            return;
        }
        
        // Har possible cut ko check karo
        for (int i = idx; i < s.length(); i++) {
            if (checkIsPalindrome(s, idx, i)) {
                // Agar yeh part palindrome hai, isko path me add karo
                path.add(s.substring(idx, i + 1));
                
                // Baki bachi string ke liye recurse karo
                findPartitions(i + 1, s, path, ans);
                
                // Backtrack: is cut ko hatao dusra try karne ke liye
                path.remove(path.size() - 1);
            }
        }
    }
    
    public List<List<String>> partition(String s) {
        List<List<String>> ans = new ArrayList<>();
        findPartitions(0, s, new ArrayList<>(), ans);
        return ans;
    }
}`
  },
  {
    id: 'back-7',
    title: 'Rat in a Maze',
    difficulty: 'Medium',
    category: 'Backtracking',
    description: 'Find paths from (0,0) to (n-1,n-1) in a grid with obstacles.',
    approach: 'Move U, D, L, R. If move valid, mark as part of path and recurse. If blocked, backtrack.',
    complexity: 'Time: O(3^(n^2)), Space: O(n^2).',
    example: 'Maze with 1s (path) and 0s (walls).',
    diagram: `
[S] [1] [0]
[1] [1] [1]
[0] [1] [E]
Paths: DDRR, RDD
    `,
    code: `import java.util.ArrayList;
import java.util.List;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private void findMazePaths(int r, int c, int[][] maze, int n, List<String> ans, String pathStr, int[][] vis) {
        // Agar destination (bottom-right) pahunch gaye
        if (r == n - 1 && c == n - 1) {
            ans.add(pathStr);
            return;
        }
        
        // Downward move (D)
        if (r + 1 < n && vis[r + 1][c] == 0 && maze[r + 1][c] == 1) {
            vis[r][c] = 1;
            findMazePaths(r + 1, c, maze, n, ans, pathStr + "D", vis);
            vis[r][c] = 0; // Backtrack
        }
        
        // Left move (L)
        if (c - 1 >= 0 && vis[r][c - 1] == 0 && maze[r][c - 1] == 1) {
            vis[r][c] = 1;
            findMazePaths(r, c - 1, maze, n, ans, pathStr + "L", vis);
            vis[r][c] = 0; // Backtrack
        }
        
        // Right move (R)
        if (c + 1 < n && vis[r][c + 1] == 0 && maze[r][c + 1] == 1) {
            vis[r][c] = 1;
            findMazePaths(r, c + 1, maze, n, ans, pathStr + "R", vis);
            vis[r][c] = 0; // Backtrack
        }
        
        // Upward move (U)
        if (r - 1 >= 0 && vis[r - 1][c] == 0 && maze[r - 1][c] == 1) {
            vis[r][c] = 1;
            findMazePaths(r - 1, c, maze, n, ans, pathStr + "U", vis);
            vis[r][c] = 0; // Backtrack
        }
    }
    
    public List<String> findPath(int[][] maze, int n) {
        List<String> ans = new ArrayList<>();
        int[][] vis = new int[n][n];
        
        // Agar starting cell block nahi hai
        if (maze[0][0] == 1) {
            findMazePaths(0, 0, maze, n, ans, "", vis);
        }
        return ans;
    }
}`
  },
  {
    id: 'back-8',
    title: 'Sudoku Solver',
    difficulty: 'Hard',
    category: 'Backtracking',
    description: 'Fill a 9x9 Sudoku grid satisfying all rules.',
    approach: 'Find empty cell, try digits 1-9. If digit valid, recurse. If grid unsolvable, backtrack and try next digit.',
    complexity: 'Time: O(9^(n*n)), Space: O(n*n).',
    example: 'Classic 9x9 grid with partially filled cells.',
    diagram: `
Try '1' in cell -> check row, col, 3x3 box
 If valid -> Recurse to next cell
 If dead-end -> backtrack, change to '.' try '2'
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
    private boolean checkPlacementValid(char[][] board, int r, int c, char digit) {
        for (int i = 0; i < 9; i++) {
            // Check current column
            if (board[i][c] == digit) return false; 
            // Check current row
            if (board[r][i] == digit) return false; 
            // Check 3x3 sub-box
            if (board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == digit) {
                return false; 
            }
        }
        return true;
    }
    
    private boolean solveSudokuRecursive(char[][] board) {
        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col < board[0].length; col++) {
                
                // Agar cell khali hai
                if (board[row][col] == '.') {
                    
                    // 1 se 9 tak digits try karo
                    for (char digit = '1'; digit <= '9'; digit++) {
                        
                        if (checkPlacementValid(board, row, col, digit)) {
                            board[row][col] = digit; // Place digit
                            
                            // Agar aage ka grid solve ho gaya successfully
                            if (solveSudokuRecursive(board)) {
                                return true;
                            }
                            
                            // Warna Backtrack karo
                            board[row][col] = '.';
                        }
                    }
                    return false; // Koi bhi digit fit nahi hua, wrong path
                }
            }
        }
        return true; // Pura grid bhar gaya bina violation ke
    }
    
    public void solveSudoku(char[][] board) {
        solveSudokuRecursive(board);
    }
}`
  },
  {
    id: 'back-9',
    title: 'Knight\'s Tour',
    difficulty: 'Hard',
    category: 'Backtracking',
    description: 'Visit every square on an NxN chessboard exactly once using valid Knight moves.',
    approach: 'From current cell, try all 8 valid Knight moves. Recurse. If stuck, backtrack and try another move.',
    complexity: 'Time: O(8^(n^2)), Space: O(n^2).',
    example: '8x8 board -> Returns valid matrix sequence.',
    diagram: `
Knight Moves:
 . * . * .
 * . . . *
 . . K . .
 * . . . *
 . * . * .
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
    private boolean isCellSafeForKnight(int targetX, int targetY, int[][] board, int n) {
        // Boundaries ke andar ho aur cell khali ho (-1 matlab empty)
        return (targetX >= 0 && targetX < n && targetY >= 0 && targetY < n && board[targetX][targetY] == -1);
    }
    
    private boolean findKnightTourPath(int currentX, int currentY, int moveNum, int[][] board, int[] dr, int[] dc, int n) {
        // Agar saare cells cover ho gaye (n * n moves ho gayi)
        if (moveNum == n * n) return true;
        
        // Knight ki 8 possible L-shape moves try karo
        for (int k = 0; k < 8; k++) {
            int nx = currentX + dr[k];
            int ny = currentY + dc[k];
            
            if (isCellSafeForKnight(nx, ny, board, n)) {
                board[nx][ny] = moveNum; // Jump karo aur move n likho
                
                // Agli move ke liye recurse karo
                if (findKnightTourPath(nx, ny, moveNum + 1, board, dr, dc, n)) {
                    return true; // Pura tour complete ho gaya
                } else {
                    board[nx][ny] = -1; // Backtrack: Yeh jump fail ho gayi
                }
            }
        }
        return false;
    }
    
    public int[][] knightTour(int n) {
        int[][] board = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = -1; // -1 represents empty square
            }
        }
        
        // Knight ki standard L-shape moves
        int[] dr = {2, 1, -1, -2, -2, -1, 1, 2};
        int[] dc = {1, 2, 2, 1, -1, -2, -2, -1};
        
        board[0][0] = 0; // Starting position pehla move
        
        findKnightTourPath(0, 0, 1, board, dr, dc, n);
        return board;
    }
}`
  },
  {
    id: 'back-10',
    title: 'M Coloring Problem',
    difficulty: 'Medium',
    category: 'Backtracking',
    description: 'Color a graph using at most M colors such that no two adjacent vertices have the same color.',
    approach: 'Assign color to node. Check if valid (no neighbor has same color). Recurse for next node. Backtrack if no color works.',
    complexity: 'Time: O(M^N), Space: O(N).',
    example: 'Graph + M colors -> Return True/False',
    diagram: `
Node(1)[C1] --- Node(2)[C2]
 |
Node(3)[C2]
(No neighbors have same color)
    `,
    code: `import java.util.List;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private boolean isColorSafe(int node, List<Integer>[] adj, int[] colors, int n, int c) {
        // Check karo ki graph me koi neighbor node same color ka toh nahi hai
        for (int neighborNode : adj[node]) {
            if (colors[neighborNode] == c) {
                return false;
            }
        }
        return true;
    }
    
    private boolean solveGraphColoring(int currentNode, List<Integer>[] adj, int[] colors, int n, int m) {
        // Saare nodes ko color kar diya
        if (currentNode == n) return true;
        
        // 1 se m tak har color try karo
        for (int c = 1; c <= m; c++) {
            
            if (isColorSafe(currentNode, adj, colors, n, c)) {
                colors[currentNode] = c; // Color assign karo
                
                // Agle node pe move karo
                if (solveGraphColoring(currentNode + 1, adj, colors, n, m)) {
                    return true;
                }
                
                // Backtrack: Yeh color fail ho gaya, remove karo
                colors[currentNode] = 0; 
            }
        }
        return false; // Koi bhi color valid nahi tha is node ke liye
    }

    public boolean graphColoring(List<Integer>[] adj, int m, int n) {
        int[] colors = new int[n];
        // 0 value ka matlab hai abhi koi color nahi diya gaya
        return solveGraphColoring(0, adj, colors, n, m);
    }
}`
  },
  {
    id: 'back-11',
    title: 'Word Break (print all ways)',
    difficulty: 'Hard',
    category: 'Backtracking',
    description: 'Find all possible sentences that can be formed by adding spaces in a string, using words from a dictionary.',
    approach: 'Take prefix of string. If prefix in dictionary, recurse on suffix. Keep tracking the sentence. If string empty, add sentence to result.',
    complexity: 'Time: O(2^N) in worst case, Space: O(N^2) for recursive stack and strings.',
    example: 's="catsanddog", dict=["cat","cats","and","sand","dog"] -> ["cats and dog", "cat sand dog"]',
    diagram: `
"catsanddog"
 -> "cat" + recurse("sanddog") 
    -> "cat" + "sand" + recurse("dog")
       -> "cat" + "sand" + "dog" (Valid!)
 -> "cats" + recurse("anddog")
    -> "cats" + "and" + recurse("dog")
       -> "cats" + "and" + "dog" (Valid!)
    `,
    code: `import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

/*
Variables Purpose:
- ans/paths: Stores the final results to be returned.
- path/temp: Stores the current state/combination during exploration.
- memo/vis/hash: Caches results or tracks visited states to avoid redundant work.
- n/idx/start/end: Keeps track of current position or bounds.
- nums/board/maze: Input data being processed.
*/
class Solution {
    private void findWordBreaks(String s, Set<String> dict, String path, List<String> ans) {
        // Agar string khatam ho gayi, valid sentence mil gaya
        if (s.length() == 0) {
            ans.add(path.trim());
            return;
        }
        
        // String ke har possible prefix ko check karo
        for (int i = 1; i <= s.length(); i++) {
            String prefix = s.substring(0, i);
            
            // Agar prefix dictionary me hai
            if (dict.contains(prefix)) {
                
                // Prefix ko sentence me add karo aur bachi hui string ke liye recurse karo
                String newPath = path + prefix + " ";
                String suffix = s.substring(i);
                
                findWordBreaks(suffix, dict, newPath, ans);
                // Backtracking is implicit here as string concat creates new instance
            }
        }
    }
    
    public List<String> wordBreak(String s, List<String> dict) {
        List<String> ans = new ArrayList<>();
        Set<String> set = new HashSet<>(dict); // O(1) lookup ke liye
        
        findWordBreaks(s, set, "", ans);
        return ans;
    }
}`
  }
];

export default function LeetCodeClient() {
  const [activeTab, setActiveTab] = useState<'Recursion' | 'Backtracking'>('Recursion');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const SDE_ORDER = [
    // Recursion (keeping original order)
    'Fibonacci Number',
    'Reverse String',
    'Factorial',
    'Binary Search',
    'Sum of Digits',
    'Merge Sort',
    'Tower of Hanoi',
    'Climbing Stairs',
    'Count Inversions',
    // Backtracking (SDE Sheet Order)
    'Permutations',
    'N-Queens',
    'Sudoku Solver',
    'M Coloring Problem',
    'Rat in a Maze',
    'Word Break (print all ways)',
    // Other Backtracking
    'Subsets (Power Set)',
    'Subsets II',
    'Combination Sum I',
    'Combination Sum II',
    'Word Search',
    'Palindrome Partitioning',
    "Knight's Tour"
  ];

  const filteredProblems = PROBLEMS.filter(p => 
    p.category === activeTab && 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    let indexA = SDE_ORDER.indexOf(a.title);
    let indexB = SDE_ORDER.indexOf(b.title);
    if (indexA === -1) indexA = 999;
    if (indexB === -1) indexB = 999;
    return indexA - indexB;
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (selectedProblem) {
    return (
      <div className={`leetcode-wrapper ${theme}`}>
        <div className="problem-detail-view">
          <header className="detail-header">
            <button onClick={() => setSelectedProblem(null)} className="back-btn-modern">
              <ChevronLeft size={20} />
              <span>GO BACK</span>
            </button>
            <div className="title-area">
              <span className={`difficulty-indicator ${selectedProblem.difficulty.toLowerCase()}`}>
                {selectedProblem.difficulty}
              </span>
              <h1 className="detail-title">{selectedProblem.title}</h1>
            </div>
          </header>

          <div className="detail-grid">
            <div className="info-column">
              <section className="detail-section glass-card-modern">
                <div className="section-title">
                  <Terminal size={18} />
                  <h2>PROBLEM DESCRIPTION</h2>
                </div>
                <p className="section-content">{selectedProblem.description}</p>
              </section>

              <section className="detail-section glass-card-modern">
                <div className="section-title">
                  <Lightbulb size={18} />
                  <h2>CORE APPROACH</h2>
                </div>
                <p className="section-content">{selectedProblem.approach}</p>
              </section>

              <div className="side-by-side">
                <section className="detail-section glass-card-modern">
                  <div className="section-title">
                    <BookOpen size={18} />
                    <h2>EXAMPLE</h2>
                  </div>
                  <div className="example-box">
                    <code className="section-content">{selectedProblem.example}</code>
                  </div>
                </section>

                <section className="detail-section glass-card-modern">
                  <div className="section-title">
                    <Zap size={18} />
                    <h2>COMPLEXITY</h2>
                  </div>
                  <p className="section-content highlight-text">{selectedProblem.complexity}</p>
                </section>
              </div>

              <section className="detail-section glass-card-modern">
                <div className="section-title">
                  <Map size={18} />
                  <h2>VISUAL DIAGRAM (ASCII)</h2>
                </div>
                <pre className="diagram-box">
                  <code>{selectedProblem.diagram}</code>
                </pre>
              </section>

            </div>

            <div className="code-column">
              <section className="detail-section glass-card-modern code-card">
                <div className="section-title">
                  <Code2 size={18} />
                  <h2>JAVA IMPLEMENTATION</h2>
                </div>
                <pre className="code-block">
                  <code>{selectedProblem.code}</code>
                </pre>
              </section>
            </div>
          </div>
        </div>

        <style jsx>{`
          .leetcode-wrapper {
            --bg: #000000;
            --text: #ffffff;
            --text-muted: rgba(255, 255, 255, 0.5);
            --card-bg: #080808;
            --border: #1a1a1a;
            --code-bg: #050505;
            --code-text: #d4d4d4;
            --highlight: #ffffff;
            --btn-hover: #111111;
            
            min-height: 100vh;
            background: var(--bg);
            color: var(--text);
            padding-top: 64px;
            transition: all 0.3s ease;
            overflow-x: hidden;
            width: 100vw;
            box-sizing: border-box;
          }
          
          .leetcode-wrapper.light {
            --bg: #f9fafb;
            --text: #111827;
            --text-muted: rgba(17, 24, 39, 0.6);
            --card-bg: #ffffff;
            --border: #e5e7eb;
            --code-bg: #f3f4f6;
            --code-text: #1f2937;
            --highlight: #000000;
            --btn-hover: #e5e7eb;
          }

          .problem-detail-view {
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            padding: 4rem 2rem;
            animation: slideUp 0.4s ease-out;
            box-sizing: border-box;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .detail-header {
            margin-bottom: 3rem;
          }
          .back-btn-modern {
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text);
            padding: 0.6rem 1.2rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 800;
            font-size: 0.75rem;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s;
            margin-bottom: 2rem;
          }
          .back-btn-modern:hover {
            border-color: var(--highlight);
            background: var(--btn-hover);
          }
          .title-area {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .difficulty-indicator {
            font-size: 0.7rem;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .difficulty-indicator.easy { color: #10b981; }
          .difficulty-indicator.medium { color: #f59e0b; }
          .difficulty-indicator.hard { color: #ef4444; }
          .detail-title {
            font-size: 3rem;
            font-weight: 900;
            letter-spacing: -1px;
            margin: 0;
            color: var(--text);
          }
          .detail-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 1.5rem;
            align-items: start;
            min-width: 0;
          }
          .info-column, .code-column {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            min-width: 0;
          }
          .side-by-side {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
          .glass-card-modern {
            background: var(--card-bg);
            border: 1px solid var(--border);
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            box-sizing: border-box;
            max-width: 100%;
          }
          .code-card {
            padding: 0;
            overflow: hidden;
            background: var(--card-bg);
          }
          .code-card .section-title {
            padding: 1.5rem 1.5rem 0;
          }
          .code-block {
            padding: 1.5rem;
            margin: 0;
            overflow-x: auto;
            background: var(--code-bg);
            border-top: 1px solid var(--border);
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            color: var(--code-text);
            box-sizing: border-box;
            width: 100%;
            display: block;
          }
          .diagram-box {
            background: var(--code-bg);
            color: var(--code-text);
            padding: 1.5rem;
            border-radius: 6px;
            border: 1px dashed var(--border);
            font-family: 'Consolas', monospace;
            font-size: 0.85rem;
            overflow-x: auto;
            box-sizing: border-box;
            width: 100%;
            display: block;
          }
          .section-title {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.25rem;
            color: var(--text-muted);
          }
          .section-title h2 {
            font-size: 0.75rem;
            font-weight: 900;
            letter-spacing: 1px;
            margin: 0;
            color: var(--text);
          }
          .section-content {
            font-size: 1rem;
            line-height: 1.7;
            color: var(--text);
            opacity: 0.9;
            margin: 0;
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
          }
          .example-box {
            background: var(--code-bg);
            padding: 1.25rem;
            border-left: 2px solid var(--highlight);
          }
          .highlight-text {
            color: var(--highlight);
            font-weight: 700;
          }
          @media (max-width: 1024px) {
            .detail-grid { grid-template-columns: 1fr; }
            .side-by-side { grid-template-columns: 1fr; }
            .detail-title { font-size: 2.2rem; }
          }
          @media (max-width: 768px) {
            .problem-detail-view { padding: 1.5rem 1rem; margin-top: -1rem; }
            .detail-title { font-size: 1.8rem; }
            .glass-card-modern { padding: 1.25rem; }
            .code-block, .diagram-box { padding: 1rem; font-size: 0.8rem; }
            .title-area { gap: 0.25rem; }
          }
          @media (max-width: 480px) {
            .problem-detail-view { padding: 1rem 0.5rem; }
            .detail-title { font-size: 1.5rem; line-height: 1.2; }
            .glass-card-modern { padding: 1rem; border-radius: 6px; }
            .code-block, .diagram-box { padding: 0.75rem; font-size: 0.75rem; border-radius: 4px; }
            .back-btn-modern { width: 100%; justify-content: center; padding: 0.75rem; margin-bottom: 1.5rem; }
            .section-content { font-size: 0.9rem; }
            .info-column, .code-column { gap: 1rem; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`leetcode-wrapper ${theme}`}>
      <header className="leetcode-header">
        <div className="header-content">
          <div className="title-group">
            <Code2 size={32} className="title-icon" />
            <h1 className="main-title">LEETCODE</h1>
          </div>
          <div className="header-right">
            <p className="subtitle">EXPLANATIONS & MUST-DO DSA SETS</p>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="leetcode-content">
        <div className="controls">
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'Recursion' ? 'active' : ''}`}
              onClick={() => setActiveTab('Recursion')}
            >
              <Brain size={18} />
              RECURSION
            </button>
            <button 
              className={`tab-btn ${activeTab === 'Backtracking' ? 'active' : ''}`}
              onClick={() => setActiveTab('Backtracking')}
            >
              <Zap size={18} />
              BACKTRACKING
            </button>
          </div>

          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="SEARCH PROBLEMS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="problems-grid">
          {filteredProblems.map((problem) => (
            <div 
              key={problem.id} 
              onClick={() => setSelectedProblem(problem)}
              className="problem-card clickable"
            >
              <div className="card-top">
                <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
                <Terminal size={16} className="link-icon" />
              </div>
              <h3 className="problem-title">{problem.title}</h3>
              <p className="card-desc-short">{problem.description.substring(0, 80)}...</p>
              <div className="card-footer">
                <span className="category-tag">VIEW DETAILS & DIAGRAM →</span>
              </div>
            </div>
          ))}
          {filteredProblems.length === 0 && (
            <div className="empty-state">
              <p>NO PROBLEMS FOUND FOR "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .leetcode-wrapper {
          --bg: #000000;
          --text: #ffffff;
          --header-bg: #050505;
          --card-bg: #0a0a0a;
          --border: #1a1a1a;
          --input-bg: #111111;
          --card-hover: #111111;
          --highlight: #ffffff;
          
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          padding-top: 64px;
          transition: all 0.3s ease;
        }
        
        .leetcode-wrapper.light {
          --bg: #f9fafb;
          --text: #111827;
          --header-bg: #ffffff;
          --card-bg: #ffffff;
          --border: #e5e7eb;
          --input-bg: #f3f4f6;
          --card-hover: #f3f4f6;
          --highlight: #000000;
        }

        .leetcode-header {
          padding: 4rem 2rem 2rem;
          border-bottom: 1px solid var(--border);
          background: var(--header-bg);
        }
        .header-content { 
          max-width: 1200px; 
          margin: 0 auto; 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-end; 
          flex-wrap: wrap;
          gap: 1rem;
        }
        .title-group { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
        .title-icon { color: var(--text); }
        .main-title { font-size: 3.5rem; font-weight: 900; letter-spacing: 4px; margin: 0; color: var(--text); }
        .header-right { display: flex; align-items: center; gap: 1.5rem; }
        .subtitle { font-size: 0.9rem; font-weight: 700; letter-spacing: 2px; opacity: 0.5; margin: 0; color: var(--text); }
        
        .theme-toggle {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .theme-toggle:hover {
          background: var(--input-bg);
          border-color: var(--text);
        }

        .leetcode-content { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem; }
        .controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; gap: 2rem; flex-wrap: wrap; }
        .tabs { display: flex; gap: 1rem; }
        .tab-btn {
          background: var(--input-bg);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 0.8rem 1.5rem;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.2s;
        }
        .tab-btn:hover { border-color: var(--text); }
        .tab-btn.active { background: var(--text); color: var(--bg); border-color: var(--text); }
        
        .search-bar { flex: 1; max-width: 400px; display: flex; align-items: center; gap: 1rem; background: var(--input-bg); padding: 0.8rem 1.2rem; border: 1px solid var(--border); border-radius: 4px; }
        .search-icon { opacity: 0.4; color: var(--text); }
        .search-input { background: transparent; border: none; color: var(--text); font-size: 0.9rem; font-weight: 600; width: 100%; outline: none; }
        
        .problems-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .problem-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .problem-card:hover { border-color: var(--text); transform: translateY(-5px); background: var(--card-hover); }
        .difficulty-badge { font-size: 0.65rem; font-weight: 900; padding: 0.3rem 0.7rem; letter-spacing: 1px; text-transform: uppercase; border-radius: 4px;}
        .difficulty-badge.easy { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981;}
        .difficulty-badge.medium { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid #f59e0b;}
        .difficulty-badge.hard { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444;}
        
        .problem-title { font-size: 1.25rem; font-weight: 800; margin: 0; line-height: 1.4; color: var(--text); }
        .card-desc-short { font-size: 0.85rem; opacity: 0.7; line-height: 1.6; margin: 0; color: var(--text); }
        .category-tag { font-size: 0.7rem; font-weight: 900; color: var(--text); letter-spacing: 1px; }
        .empty-state { grid-column: 1 / -1; text-align: center; padding: 4rem; border: 1px dashed var(--border); opacity: 0.5; color: var(--text); }
        
        @media (max-width: 768px) {
          .leetcode-header { padding: 3rem 1.5rem 1.5rem; }
          .main-title { font-size: 2.5rem; }
          .tabs { flex-direction: column; width: 100%; }
          .tab-btn { justify-content: center; width: 100%; }
          .header-content { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .header-right { width: 100%; justify-content: space-between; align-items: center; }
          .controls { flex-direction: column; align-items: stretch; gap: 1.25rem; }
          .search-bar { max-width: 100%; width: 100%; }
          .leetcode-content { padding: 2rem 1.5rem; }
        }
        @media (max-width: 480px) {
          .leetcode-header { padding: 2rem 1rem 1.5rem; }
          .main-title { font-size: 2rem; }
          .subtitle { font-size: 0.75rem; }
          .leetcode-content { padding: 1.5rem 1rem; }
          .problems-grid { grid-template-columns: 1fr; }
          .problem-card { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
