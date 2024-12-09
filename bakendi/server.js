// server.js

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend
}));
app.use(express.json());

// In-memory data store (for example purposes)
let expenses = [];
let idCounter = 1;

// GET: Fetch all expenses
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// POST: Create a new expense
app.post('/api/create-expense', (req, res) => {
  const { name, amount } = req.body;
  if (!name || amount == null) {
    return res.status(400).json({ error: 'Name and amount are required.' });
  }
  const newExpense = { id: idCounter++, name, amount };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// DELETE: Remove an expense by ID
app.delete('/api/expense/:id', (req, res) => {
  const id = parseInt(req.params.id);
  expenses = expenses.filter(expense => expense.id !== id);
  res.sendStatus(204); // No Content
});

// Start the server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
