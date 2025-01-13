CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    role INTEGER NOT NULL -- 0 for users, 1 for authors
);
CREATE TABLE Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    reviews FLOAT,
    category VARCHAR(50),
    price FLOAT,
    imageSrc VARCHAR(255),
    description TEXT,
    user_id INTEGER REFERENCES Users(id)
);
CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    review_text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    buyer_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES Users(id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);
