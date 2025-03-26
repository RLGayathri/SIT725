const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;
    const sum = parseFloat(num1) + parseFloat(num2);
    res.json({ result: sum });
});
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    
    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                return res.status(400).json({ error: 'Cannot divide by zero' });
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }
    res.json({ result });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
