// BST project

class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}


class Tree {
    constructor(arr) {
        this.a = mergeSort(arr)
        this.root = buildTree(this.a)
    }
    
    
    insert(value) {
        this.root = this.recursiveInsert(this.root, value)
    }


    recursiveInsert(root, value) {
        if (root == null) {
            root = new Node(value)
            return root
        }

        if (value < root.data) root.left = this.recursiveInsert(root.left, value) 
        else if (value > root.data) root.right = this.recursiveInsert(root.right, value)

        return root
    }

    deleteItem(value) {
        this.root = this.recursiveDelete(this.root, value)
    }


    recursiveDelete(root, value) {
        // base case
        if (root == null) return root

        // check which subtree value goes into (left | right)
        if (value < root.data) root.left = this.recursiveDelete(root.left, value)
        else if (value > root.data) root.right = this.recursiveDelete(root.right, value)

        // delete node if root.data === value
        else {
            // one or no children
            if (root.left === null) return root.right
            else if (root.right === null) return root.left

            // node with two children -- inorder successor (smallest in right subtree) (see geeksforgeeks article)
            root.data = this.minValue(root.right)
            
            // delete inorder successor
            root.right = this.recursiveDelete(root.right, root.data)

        }

        return root

    }


    minValue(node) {
        let min = node.data
        while(node.left !== null) {
            min = node.left.data
            node = node.left
        }
        return min
    }


    find(value) {
        return this.recursiveFind(this.root, value)
    }


    recursiveFind(node, value) {
        if (node == null) return null
        if (node.data == value) return node
        if (node.data != value) {
            if (value < node.data) return this.recursiveFind(node.left, value)
            else if (value > node.data) return this.recursiveFind(node.right, value)
        }

    }


    levelOrder(callback) {

        let q = [this.root]

        if (callback) {
            let newArr = []
            while (q.length != 0) {
                let node = q.pop()
                let newNode = callback(node.data)
                node.data = newNode
                newArr.push(newNode)
                if (node.left) q.unshift(node.left)
                if (node.right) q.unshift(node.right)
            }
            return newArr
        }


        else {
            let defaultArr = []
            while (q.length != 0) {
                let node = q.pop()
                defaultArr.push(node.data)
                if (node.left) q.unshift(node.left)
                if (node.right) q.unshift(node.right)
            }
            return defaultArr
        }


        
    }


}


// 3 helper functions
// removeDuplicates, mergeSort, merge


function removeDuplicates(arr) {
    let uniqueArr = []
    arr.forEach(element => {
        if (!uniqueArr.includes(element)) uniqueArr.push(element)
    });
    return uniqueArr
}


function mergeSort(arr) {

    if (arr.length < 2) return arr

    else {
        let mid = Math.ceil(arr.length / 2)
        let left = arr.slice(0, mid)
        let right = arr.slice(mid)
        return merge(mergeSort(left), mergeSort(right))
    }

}


function merge(l, r) {

    let result = []

    while (l.length > 0 && r.length > 0) {
        
        // if left > right -- push right to result
        // else push left to result

        l[0] > r[0]
        ? result.push(r.shift())
        : result.push(l.shift());
    }

    return removeDuplicates([...result, ...l, ...r])

}


function buildTree(arr) {

    var start = 0
    var end = arr.length

    if (arr.length < 2) {
        return null
    }

    var mid = Math.ceil((start + end) / 2)
    var node = new Node(arr[mid])

    node.left = buildTree(arr.slice(arr, mid))
    node.right = buildTree(arr.slice(mid))

    return node

}


function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


var addTwo = function(value) { return value + 2 }

let nums = [4,5,6,788,345,1476,22,33,49,123]
let firstTest = new Tree(nums)

// firstTest.insert(36)
// firstTest.deleteItem(33)
// console.log(firstTest.find(345))
// console.log(firstTest.levelOrder(addTwo))
prettyPrint(firstTest.root)