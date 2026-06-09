import { Problem } from '../types';

export const BINARY_SEARCH_TREE_PROBLEMS: Problem[] = [
  {
    id: 'bst-1',
    title: 'Validate BST',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'Determine if a valid binary search tree (BST). A valid BST is defined as: The left subtree of a node contains only nodes with keys less than the node\'s key. The right subtree of a node contains only nodes with keys greater than the node\'s key. Both the left and right subtrees must also be binary search trees.',
    approach: 'Use a recursive helper function that takes a min and max valid range for each node. For the root, range is (-infinity, infinity). For left child, max is updated to root\'s value. For right child, min is updated to root\'s value.',
    complexity: 'Time: O(N), Space: O(H)',
    example: 'Tree: [2,1,3] -> true',
    diagram: `
    2
   / \\
  1   3
Valid: true
    `,
    code: `class Solution {
    private boolean isValidBST(TreeNode root, long minVal, long maxVal) {
        if (root == null) return true;
        if (root.val >= maxVal || root.val <= minVal) return false;
        
        return isValidBST(root.left, minVal, root.val) && 
               isValidBST(root.right, root.val, maxVal);
    }
    
    public boolean isValidBST(TreeNode root) {
        return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
}`
  },
  {
    id: 'bst-2',
    title: 'Kth Smallest in BST',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
    approach: 'Inorder traversal of a BST gives sorted elements. Keep a counter, increment it when visiting a node. When counter == k, store the result.',
    complexity: 'Time: O(H + k), Space: O(H)',
    example: 'Tree: [3,1,4,null,2], k=1 -> 1',
    diagram: `
    3
   / \\
  1   4
   \\
    2
K=1 Smallest: 1
    `,
    code: `class Solution {
    int count = 0;
    int result = -1;
    
    public int kthSmallest(TreeNode root, int k) {
        inorder(root, k);
        return result;
    }
    
    private void inorder(TreeNode root, int k) {
        if (root == null) return;
        
        inorder(root.left, k);
        
        count++;
        if (count == k) {
            result = root.val;
            return;
        }
        
        inorder(root.right, k);
    }
}`
  },
  {
    id: 'bst-3',
    title: 'LCA in BST',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'Find the lowest common ancestor (LCA) node of two given nodes in the BST.',
    approach: 'Start from root. If both nodes are smaller than root, move to left child. If both are greater, move to right child. Otherwise, root is the LCA.',
    complexity: 'Time: O(H), Space: O(1) iteratively or O(H) recursively',
    example: 'Tree: [6,2,8,0,4,7,9,null,null,3,5], p=2, q=8 -> 6',
    diagram: `
      6
     / \\
    2   8
   / \\ / \\
  0  4 7  9
    / \\
   3   5
LCA(2, 8) = 6
    `,
    code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) {
                root = root.left;
            } else if (p.val > root.val && q.val > root.val) {
                root = root.right;
            } else {
                return root;
            }
        }
        return null;
    }
}`
  },
  {
    id: 'bst-4',
    title: 'Sorted Array to Balanced BST',
    difficulty: 'Easy',
    category: 'Binary Search Trees',
    description: 'Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.',
    approach: 'Find the middle element of the array and make it the root. Recursively do the same for the left half and right half to create left and right subtrees.',
    complexity: 'Time: O(N), Space: O(log N) due to recursion stack',
    example: 'nums=[-10,-3,0,5,9] -> [0,-3,9,-10,null,5]',
    diagram: `
[-10, -3, 0, 5, 9]
Mid is 0 -> Root
Left: [-10, -3] -> Left Subtree
Right: [5, 9] -> Right Subtree
    `,
    code: `class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return createBST(nums, 0, nums.length - 1);
    }
    
    private TreeNode createBST(int[] nums, int left, int right) {
        if (left > right) return null;
        
        int mid = left + (right - left) / 2;
        TreeNode root = new TreeNode(nums[mid]);
        
        root.left = createBST(nums, left, mid - 1);
        root.right = createBST(nums, mid + 1, right);
        
        return root;
    }
}`
  },
  {
    id: 'bst-5',
    title: 'BST Iterator',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.',
    approach: 'Use a stack to simulate inorder traversal. Initialize by pushing all left children. For next(), pop the top, push all left children of its right child, and return its value.',
    complexity: 'Time: O(1) amortized for next() and hasNext(), Space: O(H)',
    example: 'Initialize with [7,3,15,null,null,9,20]. next() -> 3',
    diagram: `
    7
   / \\
  3  15
     / \\
    9  20
Stack stores left-most path.
    `,
    code: `import java.util.Stack;

class BSTIterator {
    private Stack<TreeNode> stack = new Stack<>();

    public BSTIterator(TreeNode root) {
        pushAllLeft(root);
    }
    
    public int next() {
        TreeNode node = stack.pop();
        pushAllLeft(node.right);
        return node.val;
    }
    
    public boolean hasNext() {
        return !stack.isEmpty();
    }
    
    private void pushAllLeft(TreeNode node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }
}`
  },
  {
    id: 'bst-6',
    title: 'Inorder Successor',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'Find the inorder successor of a node in a BST.',
    approach: 'Start from root. If node.val >= root.val, successor must be in right subtree. If node.val < root.val, root could be successor, store it, then search left subtree.',
    complexity: 'Time: O(H), Space: O(1)',
    example: 'Tree: [2,1,3], p=1 -> 2',
    diagram: `
    2
   / \\
  1   3
Successor of 1 is 2.
    `,
    code: `class Solution {
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode successor = null;
        while (root != null) {
            if (p.val >= root.val) {
                root = root.right;
            } else {
                successor = root;
                root = root.left;
            }
        }
        return successor;
    }
}`
  },
  {
    id: 'bst-7',
    title: 'Inorder Predecessor',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'Find the inorder predecessor of a node in a BST.',
    approach: 'Start from root. If node.val <= root.val, predecessor must be in left subtree. If node.val > root.val, root could be predecessor, store it, then search right subtree.',
    complexity: 'Time: O(H), Space: O(1)',
    example: 'Tree: [2,1,3], p=3 -> 2',
    diagram: `
    2
   / \\
  1   3
Predecessor of 3 is 2.
    `,
    code: `class Solution {
    public TreeNode inorderPredecessor(TreeNode root, TreeNode p) {
        TreeNode predecessor = null;
        while (root != null) {
            if (p.val <= root.val) {
                root = root.left;
            } else {
                predecessor = root;
                root = root.right;
            }
        }
        return predecessor;
    }
}`
  },
  {
    id: 'bst-8',
    title: 'Construct BST from Preorder',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'Given an array of integers preorder, which represents the preorder traversal of a BST, construct the tree and return its root.',
    approach: 'Keep an upper bound. Iterate through array. For each element, create a node if it is less than the upper bound. Recursively build left and right subtrees updating bounds.',
    complexity: 'Time: O(N), Space: O(N) due to recursion stack',
    example: 'preorder=[8,5,1,7,10,12] -> [8,5,10,1,7,null,12]',
    diagram: `
Preorder: [8, 5, 1, 7, 10, 12]
Root: 8
Left: less than 8
Right: greater than 8
    `,
    code: `class Solution {
    int index = 0;
    
    public TreeNode bstFromPreorder(int[] preorder) {
        return build(preorder, Integer.MAX_VALUE);
    }
    
    private TreeNode build(int[] preorder, int bound) {
        if (index == preorder.length || preorder[index] > bound) {
            return null;
        }
        
        TreeNode root = new TreeNode(preorder[index++]);
        root.left = build(preorder, root.val);
        root.right = build(preorder, bound);
        
        return root;
    }
}`
  },
  {
    id: 'bst-9',
    title: 'Recover BST',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'You are given the root of a BST, where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.',
    approach: 'Inorder traversal gives sorted elements. Keep track of previous node. If prev.val > curr.val, a swap occurred. Store the first such prev node, and the last such curr node, then swap their values.',
    complexity: 'Time: O(N), Space: O(H)',
    example: 'Tree: [1,3,null,null,2] -> [3,1,null,null,2]',
    diagram: `
    1             3
   /             /
  3     ->      1
   \\             \\
    2             2
Swapped 1 and 3.
    `,
    code: `class Solution {
    TreeNode first = null;
    TreeNode middle = null;
    TreeNode last = null;
    TreeNode prev = null;
    
    public void recoverTree(TreeNode root) {
        first = middle = last = prev = null;
        inorder(root);
        
        if (first != null && last != null) {
            int temp = first.val;
            first.val = last.val;
            last.val = temp;
        } else if (first != null && middle != null) {
            int temp = first.val;
            first.val = middle.val;
            middle.val = temp;
        }
    }
    
    private void inorder(TreeNode root) {
        if (root == null) return;
        
        inorder(root.left);
        
        if (prev != null && root.val < prev.val) {
            if (first == null) {
                first = prev;
                middle = root;
            } else {
                last = root;
            }
        }
        prev = root;
        
        inorder(root.right);
    }
}`
  },
  {
    id: 'bst-10',
    title: 'Kth Largest in BST',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'Find the K-th largest element in a BST.',
    approach: 'Reverse inorder traversal (Right, Root, Left) visits nodes in descending order. Increment count, when count == k, store the result.',
    complexity: 'Time: O(H + k), Space: O(H)',
    example: 'Tree: [5,3,6,2,4,null,null,1], K=3 -> 4',
    diagram: `
      5
     / \\
    3   6
   / \\
  2   4
 /
1
K=3 Largest: 4
    `,
    code: `class Solution {
    int count = 0;
    int result = -1;
    
    public int kthLargest(TreeNode root, int k) {
        reverseInorder(root, k);
        return result;
    }
    
    private void reverseInorder(TreeNode root, int k) {
        if (root == null) return;
        
        reverseInorder(root.right, k);
        
        count++;
        if (count == k) {
            result = root.val;
            return;
        }
        
        reverseInorder(root.left, k);
    }
}`
  },
  {
    id: 'bst-11',
    title: 'Flatten BST to Sorted List',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'Given a BST, flatten it to a sorted linked list (or right-skewed tree).',
    approach: 'Inorder traversal gives sorted order. As we traverse, re-assign pointers: current node left becomes null, and previous node right points to current.',
    complexity: 'Time: O(N), Space: O(H)',
    example: 'Tree: [5,3,6] -> [3,null,5,null,6]',
    diagram: `
    5          3
   / \\    ->    \\
  3   6          5
                  \\
                   6
    `,
    code: `class Solution {
    TreeNode head = null;
    TreeNode prev = null;
    
    public TreeNode flattenToSortedList(TreeNode root) {
        inorder(root);
        return head;
    }
    
    private void inorder(TreeNode root) {
        if (root == null) return;
        
        inorder(root.left);
        
        if (prev == null) {
            head = root; // first node
        } else {
            prev.right = root;
            root.left = null;
        }
        prev = root;
        
        inorder(root.right);
    }
}`
  },
  {
    id: 'bst-12',
    title: 'Merge 2 BSTs',
    difficulty: 'Medium',
    category: 'Binary Search Trees',
    description: 'Given two BSTs, return a sorted array of all elements of both BSTs.',
    approach: 'Store inorder traversal of both BSTs in two arrays (which will be sorted). Then merge the two sorted arrays into one.',
    complexity: 'Time: O(M + N), Space: O(M + N)',
    example: 'Tree1: [3,1,5], Tree2: [4,2,6] -> [1,2,3,4,5,6]',
    diagram: `
  3       4
 / \\     / \\
1   5   2   6
Merged: 1,2,3,4,5,6
    `,
    code: `import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> merge(TreeNode root1, TreeNode root2) {
        List<Integer> list1 = new ArrayList<>();
        List<Integer> list2 = new ArrayList<>();
        
        inorder(root1, list1);
        inorder(root2, list2);
        
        return mergeSortedArrays(list1, list2);
    }
    
    private void inorder(TreeNode root, List<Integer> list) {
        if (root == null) return;
        inorder(root.left, list);
        list.add(root.val);
        inorder(root.right, list);
    }
    
    private List<Integer> mergeSortedArrays(List<Integer> list1, List<Integer> list2) {
        List<Integer> merged = new ArrayList<>();
        int i = 0, j = 0;
        
        while (i < list1.size() && j < list2.size()) {
            if (list1.get(i) <= list2.get(j)) {
                merged.add(list1.get(i++));
            } else {
                merged.add(list2.get(j++));
            }
        }
        
        while (i < list1.size()) merged.add(list1.get(i++));
        while (j < list2.size()) merged.add(list2.get(j++));
        
        return merged;
    }
}`
  }
];
