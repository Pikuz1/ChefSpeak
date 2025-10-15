(async function() {
    const scriptTag = document.currentScript;
    const bloggerId = scriptTag.dataset.chefspeakId;
  
    const res = await fetch(`https://yourbackend.com/recipes/${bloggerId}`);
    const recipes = await res.json();
  
    const btn = document.createElement("button");
    btn.textContent = "👩‍🍳 ChefSpeak";
    btn.style = "position:fixed;bottom:20px;right:20px;padding:1rem;border-radius:50%;background:#ffb347;color:white;border:none;cursor:pointer;";
    document.body.appendChild(btn);
  
    btn.onclick = () => {
      alert(`Loaded ${recipes.length} recipes! Next: Implement gallery & voice assistant.`);
    };
  })();
  