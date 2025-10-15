import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function RecipeGallery({ bloggerId, onCook }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch recipes from Firestore
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesRef = collection(db, `bloggers/${bloggerId}/recipes`);
        const snapshot = await getDocs(recipesRef);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, [bloggerId]);

  // Filter recipes by search input
  const filteredRecipes = recipes.filter(
    r =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.tags && r.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">🍽️ Recipes</h2>

      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredRecipes.length === 0 ? (
          <p className="text-gray-500">No recipes found.</p>
        ) : (
          filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => onCook(recipe)}
            >
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              )}
              <h3 className="font-semibold text-lg">{recipe.title}</h3>
              {recipe.tags && (
                <p className="text-sm text-gray-600 mt-1">
                  {recipe.tags.join(", ")}
                </p>
              )}
              <button
                onClick={e => {
                  e.stopPropagation();
                  onCook(recipe);
                }}
                className="mt-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Cook Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
