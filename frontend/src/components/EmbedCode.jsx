import React from "react";

export default function EmbedCode({ bloggerId }) {
  const code = `<script src="https://yourcdn.com/plugin.js" data-chefspeak-id="${bloggerId}"></script>`;
  return (
    <div>
      <h3>Embed this code in your blog:</h3>
      <pre>{code}</pre>
    </div>
  );
}
