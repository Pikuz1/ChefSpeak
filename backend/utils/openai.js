import fetch from "node-fetch";

export async function getAIRecipeTip(stepText) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: `Give cooking tips for: ${stepText}` }]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
