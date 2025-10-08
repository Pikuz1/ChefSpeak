const BACKEND_URL = "http://localhost:4000"; // replace with deployed backend URL

export async function transcribeAudio(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BACKEND_URL}/api/transcribe`, {
    method: "POST",
    body: formData,
  });
  return res.json(); // { transcription: "..." }
}

export async function fetchRecipes() {
  const res = await fetch(`${BACKEND_URL}/api/recipes`);
  return res.json();
}

export async function saveRecipe(recipe) {
  const res = await fetch(`${BACKEND_URL}/api/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  return res.json();
}
