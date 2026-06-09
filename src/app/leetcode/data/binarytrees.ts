import { Problem } from '../types';

export const BINARY_TREE_PROBLEMS: Problem[] = [
  {
    id: 'bt-1',
    title: 'Inorder',
    difficulty: 'Easy',
    category: 'Binary Trees',
    description: 'Traverse a binary tree in Inorder fashion (Left, Root, Right).',
    approach: 'Recursively visit the left subtree, process the current node, then recursively visit the right subtree.',
    complexity: 'Time: O(N), Space: O(H) where H is the height of the tree.',
    example: 'Tree: [1,null,2,3] -> [1,3,2]',
    diagram: `
    1
     \\
      2
     /
    3
Output: [1, 3, 2]
    `,
    code: `import java.util.ArrayList;
import java.util.List;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    private void traverse(TreeNode root, List<Integer> result) {
        if (root == null) return;
        traverse(root.left, result);  // Left
        result.add(root.val);         // Root
        traverse(root.right, result); // Right
    }

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        traverse(root, result);
        return result;
    }
}`
  },
  {
    id: 'bt-2',
    title: 'Preorder',
    difficulty: 'Easy',
    category: 'Binary Trees',
    description: 'Traverse a binary tree in Preorder fashion (Root, Left, Right).',
    approach: 'Process the current node, recursively visit the left subtree, then recursively visit the right subtree.',
    complexity: 'Time: O(N), Space: O(H) where H is the height of the tree.',
    example: 'Tree: [1,null,2,3] -> [1,2,3]',
    diagram: `
    1
     \\
      2
     /
    3
Output: [1, 2, 3]
    `,
    code: `import java.util.ArrayList;
import java.util.List;

class Solution {
    private void traverse(TreeNode root, List<Integer> result) {
        if (root == null) return;
        result.add(root.val);         // Root
        traverse(root.left, result);  // Left
        traverse(root.right, result); // Right
    }

    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        traverse(root, result);
        return result;
    }
}`
  },
  {
    id: 'bt-3',
    title: 'Postorder',
    difficulty: 'Easy',
    category: 'Binary Trees',
    description: 'Traverse a binary tree in Postorder fashion (Left, Right, Root).',
    approach: 'Recursively visit the left subtree, recursively visit the right subtree, then process the current node.',
    complexity: 'Time: O(N), Space: O(H) where H is the height of the tree.',
    example: 'Tree: [1,null,2,3] -> [3,2,1]',
    diagram: `
    1
     \\
      2
     /
    3
Output: [3, 2, 1]
    `,
    code: `import java.util.ArrayList;
import java.util.List;

class Solution {
    private void traverse(TreeNode root, List<Integer> result) {
        if (root == null) return;
        traverse(root.left, result);  // Left
        traverse(root.right, result); // Right
        result.add(root.val);         // Root
    }

    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        traverse(root, result);
        return result;
    }
}`
  },
  {
    id: 'bt-4',
    title: 'Symmetric Tree',
    difficulty: 'Easy',
    category: 'Binary Trees',
    description: 'Check whether a binary tree is a mirror of itself (i.e., symmetric around its center).',
    approach: 'Use a helper function to compare two nodes. They are symmetric if their values match and the left subtree of one is symmetric to the right subtree of the other.',
    complexity: 'Time: O(N), Space: O(H) where H is the height of the tree.',
    example: 'Tree: [1,2,2,3,4,4,3] -> true',
    diagram: `
       1
     /   \\
    2     2
   / \\   / \\
  3   4 4   3
Output: true (Mirror image)
    `,
    code: `class Solution {
    private boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        
        return (t1.val == t2.val)
            && isMirror(t1.right, t2.left)
            && isMirror(t1.left, t2.right);
    }
    
    public boolean isSymmetric(TreeNode root) {
        return isMirror(root, root);
    }
}`
  },
  {
    id: 'bt-5',
    title: 'Minimum Distance between Nodes',
    difficulty: 'Easy',
    category: 'Binary Trees',
    description: 'Find the minimum distance between any two given nodes in a Binary Tree.',
    approach: 'First find the Lowest Common Ancestor (LCA). Then calculate the distance from LCA to node 1 and LCA to node 2. Total distance = dist1 + dist2.',
    complexity: 'Time: O(N), Space: O(H)',
    example: 'Nodes 4 and 5 in tree -> distance is 2',
    diagram: `
       1
     /   \\
    2     3
   / \\
  4   5
Path: 4 -> 2 -> 5 (Length 2)
    `,
    code: `class Solution {
    private TreeNode lca(TreeNode root, int n1, int n2) {
        if (root == null || root.val == n1 || root.val == n2) return root;
        TreeNode left = lca(root.left, n1, n2);
        TreeNode right = lca(root.right, n1, n2);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
    
    private int findDistance(TreeNode root, int target, int dist) {
        if (root == null) return -1;
        if (root.val == target) return dist;
        int left = findDistance(root.left, target, dist + 1);
        if (left != -1) return left;
        return findDistance(root.right, target, dist + 1);
    }
    
    public int findDist(TreeNode root, int a, int b) {
        TreeNode lcaNode = lca(root, a, b);
        int d1 = findDistance(lcaNode, a, 0);
        int d2 = findDistance(lcaNode, b, 0);
        return d1 + d2;
    }
}`
  },
  {
    id: 'bt-6',
    title: 'Are 2 Trees Identical or Not',
    difficulty: 'Easy',
    category: 'Binary Trees',
    description: 'Given the roots of two binary trees, check if they are the same or not.',
    approach: 'Recursively check if both current nodes are null, or both are non-null and their values match, AND their left/right subtrees are also identical.',
    complexity: 'Time: O(N), Space: O(H)',
    example: 'p=[1,2,3], q=[1,2,3] -> true',
    diagram: `
   Tree 1      Tree 2
     1           1
    / \\         / \\
   2   3       2   3
Identical? true
    `,
    code: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // Both null
        if (p == null && q == null) return true;
        // One is null
        if (p == null || q == null) return false;
        // Values differ
        if (p.val != q.val) return false;
        
        // Recurse for left and right
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`
  },
  {
    id: 'bt-7',
    title: 'Morris Inorder Traversal',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Traverse a binary tree in Inorder without using recursion or an explicit stack (O(1) space).',
    approach: 'Use threaded binary tree concept. Create temporary links from predecessor back to current node to return to it later.',
    complexity: 'Time: O(N), Space: O(1)',
    example: '[1,null,2,3] -> [1,3,2]',
    diagram: `
Link rightmost node of left subtree
back to root to avoid recursion stack.
    1
   / \\
  2   3
 / \\
4   5
Thread: 5 -> 1
    `,
    code: `import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        TreeNode curr = root;
        
        while (curr != null) {
            if (curr.left == null) {
                ans.add(curr.val);
                curr = curr.right;
            } else {
                TreeNode prev = curr.left;
                while (prev.right != null && prev.right != curr) {
                    prev = prev.right;
                }
                
                if (prev.right == null) {
                    // Create thread
                    prev.right = curr;
                    curr = curr.left;
                } else {
                    // Cut thread
                    prev.right = null;
                    ans.add(curr.val);
                    curr = curr.right;
                }
            }
        }
        return ans;
    }
}`
  },
  {
    id: 'bt-8',
    title: 'Diameter',
    difficulty: 'Easy',
    category: 'Binary Trees',
    description: 'Find the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree.',
    approach: 'Calculate height of left and right subtrees. Diameter at any node is left_height + right_height. Keep track of max diameter globally.',
    complexity: 'Time: O(N), Space: O(H)',
    example: '[1,2,3,4,5] -> 3 (Path: 4->2->1->3)',
    diagram: `
       1
     /   \\
    2     3
   / \\
  4   5
Longest path: 4-2-1-3 (Length 3 edges)
    `,
    code: `class Solution {
    int maxDiameter = 0;
    
    private int height(TreeNode root) {
        if (root == null) return 0;
        
        int lh = height(root.left);
        int rh = height(root.right);
        
        // Update global max
        maxDiameter = Math.max(maxDiameter, lh + rh);
        
        return 1 + Math.max(lh, rh);
    }
    
    public int diameterOfBinaryTree(TreeNode root) {
        height(root);
        return maxDiameter;
    }
}`
  },
  {
    id: 'bt-9',
    title: 'Check if Tree is Height Balanced',
    difficulty: 'Easy',
    category: 'Binary Trees',
    description: 'Determine if a binary tree is height-balanced (left and right subtrees height differ by at most 1).',
    approach: 'Modify height function. If at any point |left_height - right_height| > 1, return -1 to signal imbalance. Otherwise return max height.',
    complexity: 'Time: O(N), Space: O(H)',
    example: '[3,9,20,null,null,15,7] -> true',
    diagram: `
      3
     / \\
    9  20
      /  \\
     15   7
Balanced: true
    `,
    code: `class Solution {
    private int checkHeight(TreeNode root) {
        if (root == null) return 0;
        
        int lh = checkHeight(root.left);
        if (lh == -1) return -1;
        
        int rh = checkHeight(root.right);
        if (rh == -1) return -1;
        
        if (Math.abs(lh - rh) > 1) return -1;
        
        return 1 + Math.max(lh, rh);
    }
    
    public boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }
}`
  },
  {
    id: 'bt-10',
    title: 'Subtree of Another Tree',
    difficulty: 'Easy',
    category: 'Binary Trees',
    description: 'Given roots of two trees, check if there is a subtree of the first tree with the same structure and node values of the second tree.',
    approach: 'Traverse the main tree. For every node, check if it matches the subRoot using an isSameTree helper function.',
    complexity: 'Time: O(N * M) worst case, Space: O(H)',
    example: 'root=[3,4,5,1,2], subRoot=[4,1,2] -> true',
    diagram: `
   Root        subRoot
     3            4
    / \\          / \\
   4   5        1   2
  / \\
 1   2
Result: true
    `,
    code: `class Solution {
    private boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
    
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (subRoot == null) return true;
        if (root == null) return false;
        
        // Check current root
        if (isSameTree(root, subRoot)) return true;
        
        // Check left and right subtrees
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
}`
  }
];
