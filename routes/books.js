// routes/books.js
const express = require("express");
const router = express.Router();
let books = require("../models/booksData");

// GET: ดึงหนังสือทั้งหมด
router.get("/", (req, res) => {
  res.json(books);
});

// GET: ดึงหนังสือตาม id
router.get("/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// POST: เพิ่มหนังสือใหม่
router.post("/", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT: อัปเดตข้อมูลหนังสือ
router.put("/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.price = req.body.price || book.price;
  res.json(book);
});

// DELETE: ลบหนังสือ
router.delete("/:id", (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook[0]);
});

module.exports = router;
