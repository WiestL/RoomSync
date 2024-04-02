const express = require('express');
const userRoutes = require('./routes/userRoutes');
const statusUpdateRoutes = require('./routes/statusUpdateRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware for parsing JSON bodies

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/status', statusUpdateRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
