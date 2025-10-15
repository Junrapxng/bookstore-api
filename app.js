// app.js
const express = require("express");
const cors = require("cors");
const app = express();
const booksRouter = require("./routes/books");

app.use(cors());
app.use(express.json());

// route หลัก
app.use("/books", booksRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Bookstore API running on http://localhost:${PORT}`));
