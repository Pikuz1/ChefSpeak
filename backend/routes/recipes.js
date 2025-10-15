import express from "express";
import admin from "firebase-admin";

const router = express.Router();
// Initialize Firebase Admin
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

export const getRecipes = router.get("/:bloggerId", async (req, res) => {
  try {
    const { bloggerId } = req.params;
    const recipesSnapshot = await db
      .collection("bloggers")
      .doc(bloggerId)
      .collection("recipes")
      .get();

    const recipes = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});
