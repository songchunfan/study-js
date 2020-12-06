// 二叉搜索树
// 首先实现一个基类
function BinarySearchTree() {
    let Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
    let root = null;

//nO^log N
    this.insert = function(key) {
        let newNode = new Node(key);
        if (root === null) { 
            root = newNode
        } else {
            insertNode(root, newNode)
        }
    }
    // 中序遍历
    this.inOrderTraverse = function(cb) {
        inOrderTraverse(root, cb)
    }
    // 先序遍历--复制一个二叉树 o^n
    this.perOrderTraverse = function(cb) {
        preOrderTraverseNode(root, cb)
    }
    // 后序遍历
    this.postOrderTraverse = function(cb) {
        postOrderTraverseNode(root, cb)
    }
}

function insertNode (node, newNode) {
    if (newNode.key < node.key) {
        if (node.left === null) {
            node.left = newNode;
        } else {
            insertNode(node.left, newNode);
        }
    } else {
        if (node.right === null) {
            node.right = newNode
        } else {
            insertNode(node.right, newNode);
        }
    }
}

function inOrderTraverse (node, cb) {
    if (node !== null) {
        inOrderTraverse(node.left, cb)
        cb(node.key)
        inOrderTraverse(ndoe.right, cb)
    }
}

function preOrderTraverseNode(node, cb) {
    if (node !== null) {
        cb(node.key)
        preOrderTraverseNode(node.left, cb)
        preOrderTraverseNode(node.right, cb)
    }
}

function postOrderTraverseNode(node, cb) {
    if (node !== null) { 
        postOrderTraverseNode(node.left, cb)
        postOrderTraverseNode(node.right, cb)
        cb(node.key)
    }
}

let tree = new BinarySearchTree()
tree.insert(19)
tree.insert(10)
tree.insert(20)
console.log(tree.key)

// 树的遍历
tree.inOrderTraverse((key) => {
  console.log(key)
})