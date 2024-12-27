const express = require('express');
const Book = require('../models/book');
const Queue = require('../utils/queue');
const BST = require('../utils/bst');

const router = express.Router();

// Initialize in-memory storage
let books = [
    new Book("JavaScript Essentials", "John Doe", true, 9),
    new Book("Node.js in Action", "Jane Smith", true, 8),
    new Book("Database Management", "Alice Brown", false, 7),
];

let bookBST = new BST();
books.forEach(book => bookBST.insert(book));

let bookRequestsQueue = new Queue();

// Route to get all books
router.get('/', (req, res) => {
    res.json(books);
});

// Route to search for a book by title
router.get('/search/:title', (req, res) => {
    const book = bookBST.search(req.params.title);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

// Route to add a new book
router.post('/', (req, res) => {
    const { title, author, availability, popularity } = req.body;
    const newBook = new Book(title, author, availability, popularity);
    books.push(newBook);
    bookBST.insert(newBook);
    res.status(201).send("Book added successfully");
});

// Route to request a book
router.post('/request', (req, res) => {
    const { studentName, bookTitle } = req.body;
    const book = bookBST.search(bookTitle);

    if (book && book.availability) {
        res.send(`Book "${bookTitle}" is available for checkout`);
    } else if (book) {
        bookRequestsQueue.enqueue({ studentName, bookTitle });
        res.send(`Book "${bookTitle}" is not available. You have been added to the waitlist.`);
    } else {
        res.status(404).send("Book not found");
    }
});

// Route to process the next book request in the queue
router.post('/process-request', (req, res) => {
    if (bookRequestsQueue.isEmpty()) {
        res.send("No requests in the queue.");
        return;
    }

    const nextRequest = bookRequestsQueue.dequeue();
    res.send(`Next request: Student ${nextRequest.studentName} for book "${nextRequest.bookTitle}"`);
});

module.exports = router;
