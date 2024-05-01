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


let nums = [1,5,6,788,345,1456,22,33,45,1,12]
let firstTest = new Tree(nums)

// firstTest.insert(36)
// prettyPrint(firstTest.root)