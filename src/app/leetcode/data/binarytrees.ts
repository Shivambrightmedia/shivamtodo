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
  },
  {
    id: 'bt-11',
    title: 'Check if BT Mirror of itself or not',
    difficulty: 'Easy',
    category: 'Binary Trees',
    description: 'Given a binary tree, check if it is a mirror of itself (symmetric). (Same as Symmetric Tree)',
    approach: 'Recursively check if left and right children are mirrors of each other.',
    complexity: 'Time: O(N), Space: O(H)',
    example: 'Tree: [1,2,2,3,4,4,3] -> true',
    diagram: `
       1
     /   \\
    2     2
   / \\   / \\
  3   4 4   3
Mirror: true
    `,
    code: `class Solution {
    private boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        return (t1.val == t2.val) && isMirror(t1.right, t2.left) && isMirror(t1.left, t2.right);
    }
    
    public boolean isSymmetric(TreeNode root) {
        return isMirror(root, root);
    }
}`
  },
  {
    id: 'bt-12',
    title: 'Top View of a Tree',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Print the top view of a binary tree. Top view means nodes visible when looked at from the top.',
    approach: 'Use Level Order Traversal with a queue of (Node, Horizontal Distance). Keep a Map of Horizontal Distance to Node.val. Only add to map if distance is seen for the first time.',
    complexity: 'Time: O(N), Space: O(N)',
    example: 'Tree: [1,2,3,null,4,null,null,5,6] -> [2,1,3,6]',
    diagram: `
       1
     /   \\
    2     3
     \\
      4
       \\
        5
         \\
          6
Top view: 2, 1, 3, 6 (5 is hidden under 3)
    `,
    code: `import java.util.*;

class Pair {
    TreeNode node;
    int hd;
    Pair(TreeNode n, int h) { node = n; hd = h; }
}

class Solution {
    static ArrayList<Integer> topView(TreeNode root) {
        ArrayList<Integer> ans = new ArrayList<>();
        if (root == null) return ans;
        
        Map<Integer, Integer> map = new TreeMap<>();
        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(root, 0));
        
        while (!q.isEmpty()) {
            Pair curr = q.poll();
            // Add only if HD not present (first node at this HD is at top)
            if (!map.containsKey(curr.hd)) {
                map.put(curr.hd, curr.node.val);
            }
            if (curr.node.left != null) q.add(new Pair(curr.node.left, curr.hd - 1));
            if (curr.node.right != null) q.add(new Pair(curr.node.right, curr.hd + 1));
        }
        
        for (int val : map.values()) {
            ans.add(val);
        }
        return ans;
    }
}`
  },
  {
    id: 'bt-13',
    title: 'Bottom View of a Tree',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Print the bottom view of a binary tree. Nodes visible when looked at from the bottom.',
    approach: 'Level order traversal with Horizontal Distance. Keep updating the Map for every HD. The last updated node for each HD is the bottom-most.',
    complexity: 'Time: O(N), Space: O(N)',
    example: 'Tree: [1,2,3,null,4,null,null,5,6] -> [2,5,6]',
    diagram: `
       1
     /   \\
    2     3
     \\
      4
       \\
        5
         \\
          6
Bottom view: 2, 5, 6
    `,
    code: `import java.util.*;

class Solution {
    public ArrayList<Integer> bottomView(TreeNode root) {
        ArrayList<Integer> ans = new ArrayList<>();
        if (root == null) return ans;
        
        Map<Integer, Integer> map = new TreeMap<>();
        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(root, 0));
        
        while (!q.isEmpty()) {
            Pair curr = q.poll();
            // Always update map (last node at this HD is at bottom)
            map.put(curr.hd, curr.node.val);
            
            if (curr.node.left != null) q.add(new Pair(curr.node.left, curr.hd - 1));
            if (curr.node.right != null) q.add(new Pair(curr.node.right, curr.hd + 1));
        }
        
        for (int val : map.values()) {
            ans.add(val);
        }
        return ans;
    }
}`
  },
  {
    id: 'bt-14',
    title: 'Level Order',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Traverse the tree level by level.',
    approach: 'Use a Queue. Enqueue root, then loop: pop level size, process, and push children.',
    complexity: 'Time: O(N), Space: O(N)',
    example: 'Tree: [3,9,20,null,null,15,7] -> [[3],[9,20],[15,7]]',
    diagram: `
    3       -> Level 0
   / \\
  9  20     -> Level 1
    /  \\
   15   7   -> Level 2
    `,
    code: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> ans = new ArrayList<>();
        if (root == null) return ans;
        
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        
        while (!q.isEmpty()) {
            int levelSize = q.size();
            List<Integer> level = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode curr = q.poll();
                level.add(curr.val);
                if (curr.left != null) q.add(curr.left);
                if (curr.right != null) q.add(curr.right);
            }
            ans.add(level);
        }
        return ans;
    }
}`
  },
  {
    id: 'bt-15',
    title: 'Kth Level of Tree',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Find all nodes present at the K-th level of a tree.',
    approach: 'Use Level Order Traversal (Queue). Track current level, return nodes when current level == K.',
    complexity: 'Time: O(N), Space: O(N)',
    example: 'K=1 (0-indexed), Tree=[1,2,3] -> [2,3]',
    diagram: `
       1
     /   \\
    2     3    <- Level 1 (K=1)
   /
  4
Nodes at K=1: [2, 3]
    `,
    code: `import java.util.*;

class Solution {
    public List<Integer> kDistance(TreeNode root, int k) {
        List<Integer> ans = new ArrayList<>();
        if (root == null) return ans;
        
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int currentLevel = 0;
        
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                if (currentLevel == k) {
                    ans.add(node.val);
                }
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            if (currentLevel == k) break;
            currentLevel++;
        }
        return ans;
    }
}`
  },
  {
    id: 'bt-16',
    title: 'LCA',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Find the Lowest Common Ancestor of two nodes.',
    approach: 'Recursively search left and right. If both return non-null, current node is LCA. Otherwise, return the non-null child.',
    complexity: 'Time: O(N), Space: O(H)',
    example: 'Nodes 5, 1 in [3,5,1,6,2,0,8] -> LCA is 3',
    diagram: `
       3
     /   \\
    5     1
   / \\   / \\
  6   2 0   8
LCA(5,1) = 3
    `,
    code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`
  },
  {
    id: 'bt-17',
    title: 'Transform to Sum Tree',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Transform a given binary tree so that each node contains the sum of its left and right subtrees in the original tree.',
    approach: 'Post-order traversal. Store current node value. Update node value to left_sum + right_sum. Return old_val + new_val.',
    complexity: 'Time: O(N), Space: O(H)',
    example: '[10,-2,6,8,-4,7,5] -> [20,4,12,0,0,0,0]',
    diagram: `
      10             20
    /    \\         /    \\
  -2      6   ->  4      12
  / \\    / \\     / \\    /  \\
 8  -4  7   5   0   0  0    0
    `,
    code: `class Solution {
    private int toSumTreeHelper(TreeNode root) {
        if (root == null) return 0;
        
        int oldVal = root.val;
        int leftSum = toSumTreeHelper(root.left);
        int rightSum = toSumTreeHelper(root.right);
        
        root.val = leftSum + rightSum;
        
        return oldVal + root.val;
    }
    
    public void toSumTree(TreeNode root) {
        toSumTreeHelper(root);
    }
}`
  },
  {
    id: 'bt-18',
    title: 'Construct BT from Inorder & Pre order',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Build a unique binary tree using its inorder and preorder traversals.',
    approach: 'Preorder first element is root. Find root in Inorder. Elements before it form left subtree, after form right subtree. Recursively build.',
    complexity: 'Time: O(N) with Map, Space: O(N)',
    example: 'pre=[3,9,20,15,7], in=[9,3,15,20,7] -> [3,9,20,null,null,15,7]',
    diagram: `
Pre: [3, 9, 20, 15, 7] (Root is 3)
In:  [9, 3, 15, 20, 7] (Left of 3 is [9], right is [15,20,7])
    `,
    code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        Map<Integer, Integer> inMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return buildTreeHelper(preorder, 0, preorder.length - 1, 
                               inorder, 0, inorder.length - 1, inMap);
    }
    
    private TreeNode buildTreeHelper(int[] preorder, int preStart, int preEnd, 
                                     int[] inorder, int inStart, int inEnd, 
                                     Map<Integer, Integer> inMap) {
        if (preStart > preEnd || inStart > inEnd) return null;
        
        TreeNode root = new TreeNode(preorder[preStart]);
        int inRoot = inMap.get(root.val);
        int numsLeft = inRoot - inStart;
        
        root.left = buildTreeHelper(preorder, preStart + 1, preStart + numsLeft, 
                                    inorder, inStart, inRoot - 1, inMap);
        root.right = buildTreeHelper(preorder, preStart + numsLeft + 1, preEnd, 
                                     inorder, inRoot + 1, inEnd, inMap);
        return root;
    }
}`
  },
  {
    id: 'bt-19',
    title: 'Construct BT from Inorder & Post order',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Build a unique binary tree using its inorder and postorder traversals.',
    approach: 'Postorder last element is root. Find root in Inorder to split left and right subtrees. Recursively build.',
    complexity: 'Time: O(N) with Map, Space: O(N)',
    example: 'in=[9,3,15,20,7], post=[9,15,7,20,3] -> [3,9,20,null,null,15,7]',
    diagram: `
Post: [..., 3] (Root is 3)
In: [9, 3, 15, 20, 7]
    `,
    code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        Map<Integer, Integer> inMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return buildTreeHelper(inorder, 0, inorder.length - 1, 
                               postorder, 0, postorder.length - 1, inMap);
    }
    
    private TreeNode buildTreeHelper(int[] inorder, int inStart, int inEnd, 
                                     int[] postorder, int postStart, int postEnd, 
                                     Map<Integer, Integer> inMap) {
        if (inStart > inEnd || postStart > postEnd) return null;
        
        TreeNode root = new TreeNode(postorder[postEnd]);
        int inRoot = inMap.get(root.val);
        int numsLeft = inRoot - inStart;
        
        root.left = buildTreeHelper(inorder, inStart, inRoot - 1, 
                                    postorder, postStart, postStart + numsLeft - 1, inMap);
        root.right = buildTreeHelper(inorder, inRoot + 1, inEnd, 
                                     postorder, postStart + numsLeft, postEnd - 1, inMap);
        return root;
    }
}`
  },
  {
    id: 'bt-20',
    title: 'Flatten BT to LL',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Flatten a binary tree to a linked list in-place (right child points to next, left child is null).',
    approach: 'Morris traversal approach. If node has left child, find rightmost of left child, point it to current right, then move left to right.',
    complexity: 'Time: O(N), Space: O(1)',
    example: '[1,2,5,3,4,null,6] -> [1,null,2,null,3,null,4,null,5,null,6]',
    diagram: `
    1             1
   / \\             \\
  2   5    ->       2
 / \\   \\             \\
3   4   6             3...
    `,
    code: `class Solution {
    public void flatten(TreeNode root) {
        TreeNode curr = root;
        while (curr != null) {
            if (curr.left != null) {
                TreeNode prev = curr.left;
                while (prev.right != null) {
                    prev = prev.right;
                }
                prev.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            curr = curr.right;
        }
    }
}`
  },
  {
    id: 'bt-21',
    title: 'Max Width of BT',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Find the maximum width of the tree (max number of nodes at any level, including null nodes between non-null).',
    approach: 'Level order traversal giving indices to nodes (Left=2*i+1, Right=2*i+2). Width at level = (last node index) - (first node index) + 1.',
    complexity: 'Time: O(N), Space: O(N)',
    example: '[1,3,2,5,3,null,9] -> 4',
    diagram: `
       1(0)
     /      \\
   3(1)     2(2)
  /   \\        \\
5(3)  3(4)     9(6)
Width at bottom: 6 - 3 + 1 = 4
    `,
    code: `import java.util.*;

class Pair {
    TreeNode node;
    int idx;
    Pair(TreeNode n, int i) { node = n; idx = i; }
}

class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        int ans = 0;
        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(root, 0));
        
        while (!q.isEmpty()) {
            int size = q.size();
            int mmin = q.peek().idx;
            int first = 0, last = 0;
            
            for (int i = 0; i < size; i++) {
                int cur_id = q.peek().idx - mmin; // Normalize to prevent overflow
                TreeNode node = q.poll().node;
                
                if (i == 0) first = cur_id;
                if (i == size - 1) last = cur_id;
                
                if (node.left != null) q.add(new Pair(node.left, cur_id * 2 + 1));
                if (node.right != null) q.add(new Pair(node.right, cur_id * 2 + 2));
            }
            ans = Math.max(ans, last - first + 1);
        }
        return ans;
    }
}`
  },
  {
    id: 'bt-22',
    title: 'Zig Zag Traversal of BT',
    difficulty: 'Medium',
    category: 'Binary Trees',
    description: 'Traverse the tree level by level, alternating direction (left-to-right, then right-to-left, etc).',
    approach: 'Level order traversal (Queue). Use a boolean flag \`leftToRight\`. Depending on flag, add to front or back of the list.',
    complexity: 'Time: O(N), Space: O(N)',
    example: '[3,9,20,null,null,15,7] -> [[3],[20,9],[15,7]]',
    diagram: `
    3       ->
   / \\
  9  20     <-
    /  \\
   15   7   ->
    `,
    code: `import java.util.*;

class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        boolean leftToRight = true;
        
        while (!q.isEmpty()) {
            int size = q.size();
            LinkedList<Integer> row = new LinkedList<>();
            
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                
                if (leftToRight) {
                    row.addLast(node.val);
                } else {
                    row.addFirst(node.val);
                }
                
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            leftToRight = !leftToRight;
            result.add(row);
        }
        return result;
    }
}`
  },
  {
    id: 'bt-23',
    title: 'Max Path Sum',
    difficulty: 'Hard',
    category: 'Binary Trees',
    description: 'Find the maximum path sum between any two nodes in a binary tree.',
    approach: 'Post-order traversal. For each node, calculate max sum of left and right paths (ignore negative sums). Update global max. Return node_val + max(left, right).',
    complexity: 'Time: O(N), Space: O(H)',
    example: '[-10,9,20,null,null,15,7] -> 42 (Path: 15->20->7)',
    diagram: `
    -10
    /  \\
   9   20
      /  \\
     15   7
Max Path: 15 + 20 + 7 = 42
    `,
    code: `class Solution {
    int maxPath = Integer.MIN_VALUE;
    
    private int findMaxPath(TreeNode root) {
        if (root == null) return 0;
        
        // Ignore negative paths by taking max with 0
        int left = Math.max(0, findMaxPath(root.left));
        int right = Math.max(0, findMaxPath(root.right));
        
        // Update global max path containing current root
        maxPath = Math.max(maxPath, left + right + root.val);
        
        // Return max straight path going down
        return Math.max(left, right) + root.val;
    }
    
    public int maxPathSum(TreeNode root) {
        findMaxPath(root);
        return maxPath;
    }
}`
  },
  {
    id: 'bt-24',
    title: 'Kth Ancestor',
    difficulty: 'Hard',
    category: 'Binary Trees',
    description: 'Given a node, find its K-th ancestor in the tree. (Often done with Binary Lifting for multiple queries).',
    approach: 'For a single query, DFS to find path. For multiple queries (like LeetCode), use Binary Lifting (dynamic programming) storing 2^i-th ancestor.',
    complexity: 'Time: O(N log N) preprocess, O(log N) query. Space: O(N log N).',
    example: 'Node 5, K=2 -> Node 1 (Ancestor 1 is 2, Ancestor 2 is 1)',
    diagram: `
       1
      /
     2
    /
   5
Kth Ancestor of 5 (K=2) is 1.
    `,
    code: `import java.util.*;

// Solves LeetCode 1483 using Binary Lifting
class TreeAncestor {
    int[][] up;
    int maxLog;

    public TreeAncestor(int n, int[] parent) {
        maxLog = (int) (Math.log(n) / Math.log(2)) + 1;
        up = new int[n][maxLog];
        
        // Initialize with -1
        for (int[] row : up) Arrays.fill(row, -1);
        
        // 2^0 th ancestor is the direct parent
        for (int i = 0; i < n; i++) {
            up[i][0] = parent[i];
        }
        
        // Fill the DP table
        for (int j = 1; j < maxLog; j++) {
            for (int i = 0; i < n; i++) {
                if (up[i][j - 1] != -1) {
                    up[i][j] = up[up[i][j - 1]][j - 1];
                }
            }
        }
    }
    
    public int getKthAncestor(int node, int k) {
        for (int j = 0; j < maxLog; j++) {
            if ((k & (1 << j)) != 0) {
                node = up[node][j];
                if (node == -1) break;
            }
        }
        return node;
    }
}`
  }
];
