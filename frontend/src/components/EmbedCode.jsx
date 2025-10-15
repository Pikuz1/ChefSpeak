import React from "react";

export default function EmbedCode({ bloggerId }) {
  const code = `<script src="http://localhost:5173/plugin/plugin.js" data-chefspeak-id="${bloggerId}"></script>`;
  return (
    <div>
      <h3>Embed this code in your blog:</h3>
      <pre>{code}</pre>
    </div>
  );
}
