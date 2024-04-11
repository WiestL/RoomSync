require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const statusUpdateRoutes = require('./routes/statusUpdateRoutes');
const groupRoutes = require('./routes/groupRoutes');
const groceryRoutes = require('./routes/groceryRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'frontend', 'public')));
app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cors());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/status', statusUpdateRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/grocery', groceryRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
