const { transcribeAudio } = require('../openaiClient');
const admin = require('firebase-admin');

async function handleTranscription(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No audio file uploaded' });
    // req.file.buffer contains audio bytes
    const filename = req.file.originalname || 'audio.webm';
    const mimeType = req.file.mimetype || 'audio/webm';

    const result = await transcribeAudio(req.file.buffer, filename, mimeType);
    // result.text is the transcription
    res.json({ transcription: result.text });
  } catch (err) {
    console.error('transcribe error', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { handleTranscription };
