const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = 3333;

app.use(bodyParser.json());

// Routes
app.use('/books', bookRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
