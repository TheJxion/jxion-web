/**
 * Product Card Component
 *
 * A premium product card component for displaying jewelry items
 * in the Noir Crafted product grid. This component demonstrates
 * Jxion's framework interoperability (React component used in SvelteKit).
 *
 * Architecture Note: This React component is consumed by SvelteKit
 * via LocalReactWrapper, demonstrating the "two birds one stone" philosophy
 * of the Jxion framework - write once, use anywhere.
 */

import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart } from 'lucide-react';

// Type Definition
interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

// Component
// Defined as const export for proper consumption by SvelteKit's LocalReactWrapper
export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  imageUrl,
}) => {
  const [imageError, setImageError] = useState(false);

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  const placeholderImage =
    'https://placehold.co/400x400/000000/ffd700?text=NOIR';

  return (
    <div className="group relative bg-gray-950 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transform hover:scale-[1.03] border border-gray-800">
      {/* Product Image Area */}
      <div className="aspect-square w-full overflow-hidden bg-gray-900 transition-opacity duration-300 group-hover:opacity-85">
        <img
          src={imageError ? placeholderImage : imageUrl}
          alt={title}
          onError={handleImageError}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick View and Like Buttons (Visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/30">
          <button
            className="flex items-center justify-center p-3 m-2 text-black bg-yellow-600 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-110"
            aria-label="Hızlı Bakış"
            onClick={() => console.log(`Hızlı Bakış: ${title}`)}
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            className="flex items-center justify-center p-3 m-2 text-white bg-gray-800 rounded-full shadow-lg hover:bg-yellow-600 hover:text-black transition-all duration-300 transform hover:scale-110"
            aria-label="Beğen"
            onClick={() => console.log(`Beğenildi: ${title}`)}
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Information Area */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif text-yellow-600 antialiased leading-snug">
            {title}
          </h3>
          <p className="text-xl font-bold text-white whitespace-nowrap ml-4">
            {price}
          </p>
        </div>
        <p className="mt-1 text-sm text-gray-400 min-h-[40px] line-clamp-2">
          {description}
        </p>

        {/* Add to Cart Button */}
        <button
          className="mt-4 w-full flex items-center justify-center p-3 text-sm font-semibold rounded-lg bg-gray-800 text-white border border-gray-700 hover:bg-yellow-600 hover:text-black transition-colors duration-300 shadow-md"
          onClick={() => console.log(`Sepete Eklendi: ${title}`)}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
