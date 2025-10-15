import express from "express";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

// __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import service account JSON
import { readFile } from "fs/promises";
const serviceAccount = JSON.parse(await readFile(new URL("../serviceAccountKey.json", import.meta.url)));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const router = express.Router();

router.get("/:bloggerId", async (req, res) => {
  try {
    const { bloggerId } = req.params;
    const recipesSnapshot = await db
      .collection("bloggers")
      .doc(bloggerId)
      .collection("recipes")
      .get();

    const recipes = recipesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

export default router;
