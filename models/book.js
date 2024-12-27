class Book {
    constructor(title, author, availability, popularity) {
        this.title = title;
        this.author = author;
        this.availability = availability; // Boolean value (true or false)
        this.popularity = popularity; // Popularity rating (e.g., 1-10)
    }
}

module.exports = Book;
