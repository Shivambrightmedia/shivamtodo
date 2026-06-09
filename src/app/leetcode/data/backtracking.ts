import { Problem } from '../types';

export const BACKTRACKING_PROBLEMS: Problem[] = [
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