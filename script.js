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


    preOrder(callback) {
        // root -> left -> right
        var stack = [this.root]
        var traversed = []
        let current

        if (callback) {
            while (stack.length != 0) {
                current = stack.pop()
                let newCurrent = callback(current.data)
                current.data = newCurrent
                traversed.push(current.data)

                if (current.right) stack.push(current.right)
                if (current.left) stack.push(current.left)
            }
            return traversed
        }

        else {
            while (stack.length != 0) {
                current = stack.pop()
                traversed.push(current.data)

                if (current.right) stack.push(current.right)
                if (current.left) stack.push(current.left)
            }
            return traversed
        }

    }


    inOrder(callback) {
        // left -> root -> right
        var stack = []
        var traversed = []
        let current = this.root


        if (callback) {
            while (stack.length || current) {
                while(current) {
                    stack.push(current)
                    current = current.left
                }
                current = stack.pop()
                let newData = callback(current.data)
                current.data = newData
    
                traversed.push(newData)
                current = current.right
            }

            // for (let i = 0; i < traversed.length; i++) {
            //     callback(traversed[i].data)
            // }
            return traversed
        }

        else {
            while (stack.length || current) {
                while(current) {
                    stack.push(current)
                    current = current.left
                }
                current = stack.pop()
                traversed.push(current.data)
                current = current.right
            }
            return traversed
        }

    }


    postOrder(callback) {
        // left -> right -> root
        var current = this.root
        var s1 = []
        var s2 = []

        s1.push(current)

        if (callback) {
            while (s1.length > 0) {
                var temp = s1.pop()
                let data = temp.data
                temp.data = callback(data)
                s2.push(temp.data)

                if (temp.left != null) s1.push(temp.left)
                if (temp.right != null) s1.push(temp.right)
            }

        }

        else {
            while (s1.length > 0) {
                var temp = s1.pop()
                s2.push(temp.data)

                if (temp.left != null) s1.push(temp.left)
                if (temp.right != null) s1.push(temp.right)
            }
        }

        return s2

    }


    height(node) {
        /* 
        height - the number of edges in the longest path
        from a given node to a leaf node
        */

        if (this.find(node)) {
            return this.findHeight(this.root, this.find(node).data)
        }

        else if (!this.find(node)) {
            return "node not in tree"
        }

    }


    findHeight(root, x) {
        // base
        var defaultHeight = -1
        if (root == null) return -1

        var leftHeight = this.findHeight(root.left, x)
        var rightHeight = this.findHeight(root.right, x)

        var answer = Math.max(leftHeight, rightHeight) + 1

        if (root.data == x) {
            defaultHeight = answer
        }

        return answer

    }


    depth(node) {
        /* 
        depth - the number of edges in a path from a given
        node to the tree's root node
        */

        if (this.find(node)) {
            return this.findDepth(this.root, this.find(node).data)
        }

        else if (!this.find(node)) {
            return "node not in tree"
        }

    }


    findDepth(root, x) {
        // base
        if (root == null) return -1

        var dist = -1

        if ( (root.data) == x || (dist = this.findDepth(root.left, x)) >= 0 ||
           (dist = this.findDepth(root.right, x)) >= 0 ) return dist + 1
        
        return dist
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

let nums = [25,14,23,7,9,16,18,55,35,33,27,75,65,62,78]
let firstTest = new Tree(nums)

// firstTest.insert(36)
// firstTest.deleteItem(33)
// console.log(firstTest.find())
// console.log(firstTest.levelOrder(addTwo))
// console.log(firstTest.preOrder(addTwo))
// console.log(firstTest.preOrder())
// console.log(firstTest.inOrder())
// console.log(firstTest.inOrder(addTwo))
// console.log(firstTest.postOrder())
// console.log(firstTest.postOrder(addTwo))
// console.log(firstTest.height(55)) 3
// console.log(firstTest.height(400))
// console.log(firstTest.depth(55)) 2
// console.log(firstTest.depth(400))
// prettyPrint(firstTest.root)