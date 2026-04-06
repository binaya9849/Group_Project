//put code abpve here yo last last ko ho ya vanda tala ko 
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;
  const review = await database.query(
    "DELETE FROM reviews WHERE product_id = $1 AND user_id = $2 RETURNING *",
    [productId, req.user.id]
  );

  if (review.rows.length === 0) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  const allReviews = await database.query(
    `SELECT AVG(rating) AS avg_rating FROM reviews WHERE product_id = $1`,
    [productId]
  );

  const newAvgRating = allReviews.rows[0].avg_rating;

  const updatedProduct = await database.query(
    `
        UPDATE products SET ratings = $1 WHERE id = $2 RETURNING *
        `,
    [newAvgRating, productId]
  );

  res.status(200).json({
    success: true,
    message: "Your review has been deleted.",
    review: review.rows[0],
    product: updatedProduct.rows[0],
  });
});

export const fetchAIFilteredProducts = catchAsyncErrors(
  async (req, res, next) => {
    const { userPrompt } = req.body;
    if (!userPrompt) {
      return next(new ErrorHandler("Provide a valid prompt.", 400));
    }

    const filterKeywords = (query) => {
      const stopWords = new Set([
        "the",
        "they",
        "them",
        "then",
        "I",
        "we",
        "you",
        "he",
        "she",
        "it",
        "is",
        "a",
        "an",
        "of",
        "and",
        "or",
        "to",
        "for",
        "from",
        "on",
        "who",
        "whom",
        "why",
        "when",
        "which",
        "with",
        "this",
        "that",
        "in",
        "at",
        "by",
        "be",
        "not",
        "was",
        "were",
        "has",
        "have",
        "had",
        "do",
        "does",
        "did",
        "so",
        "some",
        "any",
        "how",
        "can",
        "could",
        "should",
        "would",
        "there",
        "here",
        "just",
        "than",
        "because",
        "but",
        "its",
        "it's",
        "if",
        ".",
        ",",
        "!",
        "?",
        ">",
        "<",
        ";",
        "`",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
      ]);

      return query
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((word) => !stopWords.has(word))
        .map((word) => `%${word}%`);
    };

    const keywords = filterKeywords(userPrompt);
    // Basic SQL Filtering
    const result = await database.query(
      `
        SELECT * FROM products
        WHERE name ILIKE ANY($1)
        OR description ILIKE ANY($1)
        OR category ILIKE ANY($1)
        LIMIT 200;     
        `,
      [keywords]
    );

    const filteredProducts = result.rows;

    if (filteredProducts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found matching your prompt.",
        products: [],
      });
    }

    // AI FILTERING
    const { success, products } = await getAIRecommendation(
      req,
      res,
      userPrompt,
      filteredProducts
    );

    res.status(200).json({
      success: success,
      message: "AI filtered products.",
      products,
    });
  }
);