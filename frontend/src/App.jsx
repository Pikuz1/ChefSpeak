import React, { useState } from "react";
import AddRecipe from "./components/AddRecipe";
import EmbedCode from "./components/EmbedCode";
import RecipeGallery from "./components/RecipeGallery";

// Replace with actual blogger ID after login or auth
const BLOGGER_ID = "BLOGGER12345";

function App() {
  const [showAdd, setShowAdd] = useState(true);
  const [showGallery, setShowGallery] = useState(true);

  return (
    <div className="min-h-screen bg-orange-50 p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-green-800">ChefSpeak Dashboard</h1>
        <p className="text-green-700 mt-2">
          Manage your recipes and generate embed code for your blog.
        </p>
      </header>

      <nav className="mb-6 space-x-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? "Hide Add Recipe" : "Show Add Recipe"}
        </button>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          onClick={() => setShowGallery(!showGallery)}
        >
          {showGallery ? "Hide Gallery" : "Show Gallery"}
        </button>
      </nav>

      {/* Add Recipe Form */}
      {showAdd && (
        <section className="mb-8 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Add New Recipe</h2>
          <AddRecipe bloggerId={BLOGGER_ID} />
        </section>
      )}

      {/* Recipe Gallery */}
      {showGallery && (
        <section className="mb-8 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Recipe Gallery</h2>
          <RecipeGallery bloggerId={BLOGGER_ID} />
        </section>
      )}

      {/* Embed Code */}
      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Embed Code</h2>
        <EmbedCode bloggerId={BLOGGER_ID} />
      </section>
    </div>
  );
}

export default App;
