class Node {
    constructor(book) {
        this.book = book;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(book) {
        const newNode = new Node(book);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.book.title < node.book.title) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(title) {
        return this.searchNode(this.root, title);
    }

    searchNode(node, title) {
        if (node === null) {
            return null;
        }

        if (title < node.book.title) {
            return this.searchNode(node.left, title);
        } else if (title > node.book.title) {
            return this.searchNode(node.right, title);
        } else {
            return node.book; // Found the book
        }
    }
}

module.exports = BST;
