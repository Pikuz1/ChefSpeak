const fetch = require('node-fetch');
const FormData = require('form-data');

const OPENAI_KEY = process.env.OPENAI_API_KEY;

async function transcribeAudio(buffer, filename, mimeType='audio/webm') {
  const form = new FormData();
  form.append('file', buffer, { filename, contentType: mimeType });
  form.append('model', 'whisper-1'); // or appropriate model name

  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
    },
    body: form
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI transcription failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data; // { text: "transcribed text" }
}

module.exports = { transcribeAudio };
