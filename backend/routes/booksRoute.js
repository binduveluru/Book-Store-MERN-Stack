import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for Save a new Book
router.post("/", (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    Book.create(newBook, (error, book) => {
      if (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
      }
      return response.status(201).send(book);
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get("/", (request, response) => {
  try {
    Book.find({}, (error, books) => {
      if (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
      }
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get("/:id", (request, response) => {
  try {
    const { id } = request.params;

    Book.findById(id, (error, book) => {
      if (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
      }
      return response.status(200).json(book);
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put("/:id", (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;

    Book.findByIdAndUpdate(id, request.body, (error, result) => {
      if (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
      }
      if (!result) {
        return response.status(404).json({ message: "Book not found" });
      }
      return response
        .status(200)
        .send({ message: "Book updated successfully" });
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete("/:id", (request, response) => {
  try {
    const { id } = request.params;

    Book.findByIdAndDelete(id, (error, result) => {
      if (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
      }
      if (!result) {
        return response.status(404).json({ message: "Book not found" });
      }
      return response
        .status(200)
        .send({ message: "Book deleted successfully" });
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
