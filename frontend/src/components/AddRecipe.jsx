import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function AddRecipe({ bloggerId }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeRef = collection(db, `bloggers/${bloggerId}/recipes`);
    await addDoc(recipeRef, {
      title,
      ingredients: ingredients.split(","),
      steps: steps.split("\n")
    });
    setTitle(""); setIngredients(""); setSteps("");
    alert("Recipe added!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Recipe Title" />
      <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} placeholder="Ingredients, comma separated" />
      <textarea value={steps} onChange={e => setSteps(e.target.value)} placeholder="Step 1\nStep 2\nStep 3" />
      <button type="submit">Add Recipe</button>
    </form>
  );
}
