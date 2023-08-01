const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

let todos = [
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Clean the house' },
    { id: 3, text: 'Read a book' },
];

// Route to handle addition of two numbers
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) {
        return res.status(400).json({ error: 'Please provide both num1 and num2 as query parameters.' });
    }
    const result = Number(num1) + Number(num2);
    res.json({ result });
});

// Route to handle other basic calculator operations (subtraction, multiplication, and division)
app.post('/calculate', (req, res) => {
    const { operation, num1, num2 } = req.body;
    if (!operation || !num1 || !num2) {
        return res.status(400).json({ error: 'Please provide operation, num1, and num2 in the request body.' });
    }

    let result;
    switch (operation) {
        case 'add':
            result = Number(num1) + Number(num2);
            break;
        case 'subtract':
            result = Number(num1) - Number(num2);
            break;
        case 'multiply':
            result = Number(num1) * Number(num2);
            break;
        case 'divide':
            result = Number(num1) / Number(num2);
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation. Supported operations are add, subtract, multiply, and divide.' });
    }

    res.json({ result });
});

// Route to update a todo
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Please provide a text for the todo update.' });
    }

    const todoToUpdate = todos.find((todo) => todo.id === Number(id));
    if (!todoToUpdate) {
        return res.status(404).json({ error: 'Todo not found.' });
    }

    todoToUpdate.text = text;
    res.json({ todo: todoToUpdate });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

});