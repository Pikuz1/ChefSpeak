const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

router.post('/', async (req, res) => {
  // Save recipe
  try {
    const { userId, title, steps, metadata } = req.body;
    const docRef = await db.collection('recipes').add({
      userId, title, steps, metadata, createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('recipes').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Not found' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// add update/delete endpoints as needed

module.exports = router;
