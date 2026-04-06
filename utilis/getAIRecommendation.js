export async function getAIRecommendation(req, res, userPrompt, products) {
  const API_KEY = process.env.GEMINI_API_KEY;
  const URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  if (!API_KEY) {
    return res.status(500).json({
      success: false,
      message: "Gemini API key is missing in environment variables.",
    });
  }

  try {
    const geminiPrompt = `
You are a product recommendation assistant.

Available products:
${JSON.stringify(products, null, 2)}

User request:
"${userPrompt}"

Return ONLY valid JSON.
Do not use markdown.
Do not add explanation text.

Format:
[
  {
    "id": "...",
    "name": "...",
    "price": ...
  }
]
`;

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: geminiPrompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);

      return res.status(response.status).json({
        success: false,
        message: "Gemini API request failed",
        error: errorText,
      });
    }

    const data = await response.json();

    const aiResponseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!aiResponseText) {
      return res.status(500).json({
        success: false,
        message: "AI response is empty.",
      });
    }

    let parsedProducts;

    try {
      parsedProducts = JSON.parse(
        aiResponseText.replace(/```json|```/g, "").trim()
      );
    } catch (error) {
      console.error("JSON parse error:", aiResponseText);

      return res.status(500).json({
        success: false,
        message: "Failed to parse AI JSON response.",
        rawResponse: aiResponseText,
      });
    }

    return res.status(200).json({
      success: true,
      products: parsedProducts,
    });
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}