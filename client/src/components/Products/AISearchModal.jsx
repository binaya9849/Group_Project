// import React, { useState } from "react";
// import { X, Search, Sparkles } from "lucide-react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";

// const AISearchModal = () => {
//   return <></>;
// };

// export default AISearchModal;

import React, { useState } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';

const AISearchModal = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAISearch = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/ai/search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: prompt }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch AI recommendations');
      }

      const data = await response.json();

      setResults(data.products || []);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Gemini AI Smart Search
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500"
          >
            <X size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="p-5 bg-gray-50 border-b">
          <form onSubmit={handleAISearch} className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. gaming laptop under $1200"
              className="w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Search size={18} />
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-2">
            Powered by Gemini AI — describe what you want in natural language.
          </p>
        </div>

        {/* Results */}
        <div className="p-5 overflow-y-auto flex-1 bg-gray-100">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-48">
              <Loader2 className="animate-spin text-purple-600" size={40} />
              <p className="mt-2 text-gray-600">AI is searching products...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 font-medium">
              {error}
            </div>
          )}

          {!isLoading && !error && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && !error && prompt && results.length === 0 && (
            <div className="text-center text-gray-500">
              No products found. Try a different query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISearchModal;