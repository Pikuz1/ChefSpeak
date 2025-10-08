const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const transcribeRoutes = require('./routes/transcribe');
const recipesRoutes = require('./routes/recipes');
require('./firebase'); // initialize firebase-admin

const app = express();
app.use(cors());
app.use(express.json());

// multer setup for file uploads (store in memory)
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/transcribe', upload.single('file'), transcribeRoutes.handleTranscription);
app.use('/api/recipes', recipesRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));
