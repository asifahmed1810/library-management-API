#  Library Management System

A backend API built with **Express**, **TypeScript**, and **MongoDB** (via Mongoose) for managing a library's book collection.  
It supports **CRUD operations**, filtering, sorting, and business logic for library operations.

---

##  Features

- **Book Management**
  - Add new books with validation
  - Update book details
  - Delete books
  - Retrieve all books with filtering and sorting
- **Filtering & Sorting**
  - Filter by genre
  - Sort by fields (`createdAt`, `title`, etc.)
  - Limit results
- **Schema Validation**
  - Enforced via Mongoose schemas
