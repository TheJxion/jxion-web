/**
 * JxionProductGrid Component
 * 
 * Flagship demonstration component featuring draggable grid layout with inner card carousels.
 * Showcases Jxion multi-framework architecture and GSAP integration.
 * 
 * Features:
 * - Draggable grid container (x,y drag) - Palmer-like
 * - Each product card has inner image carousel - Instagram-style
 * - GSAP Draggable integration
 * - NOIR brand styling
 * 
 * Architecture: React component used in SvelteKit via LocalReactWrapper
 */

import React, { useRef, useEffect, useState, useMemo } from 'react';

// Type Definitions (from jxion-shared)
interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  images: string[];
}

// Mock Data (will be replaced with real data from database)
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Eternal Gold Ring',
    category: 'Rings',
    price: '$5,200',
    images: [
      'https://placehold.co/400x400/18181b/FFD700?text=RING+1',
      'https://placehold.co/400x400/1f1f1f/FFD700?text=RING+2',
      'https://placehold.co/400x400/292929/FFD700?text=RING+3'
    ]
  },
  {
    id: '2',
    title: 'Shadow Necklace',
    category: 'Necklaces',
    price: '$8,950',
    images: [
      'https://placehold.co/400x600/18181b/FFD700?text=NECKLACE+1',
      'https://placehold.co/400x600/1f1f1f/FFD700?text=NECKLACE+2',
      'https://placehold.co/400x600/292929/FFD700?text=NECKLACE+3'
    ]
  },
  {
    id: '3',
    title: 'Obsidian Bracelet',
    category: 'Bracelets',
    price: '$3,100',
    images: [
      'https://placehold.co/400x400/18181b/FFD700?text=BRACELET+1',
      'https://placehold.co/400x400/1f1f1f/FFD700?text=BRACELET+2',
      'https://placehold.co/400x400/292929/FFD700?text=BRACELET+3'
    ]
  },
  {
    id: '4',
    title: 'Aurora Studs',
    category: 'Earrings',
    price: '$1,550',
    images: [
      'https://placehold.co/400x600/18181b/FFD700?text=EARRING+1',
      'https://placehold.co/400x600/1f1f1f/FFD700?text=EARRING+2'
    ]
  },
  {
    id: '5',
    title: 'Midnight Tiara',
    category: 'Headpieces',
    price: '$12,000',
    images: [
      'https://placehold.co/400x400/18181b/FFD700?text=TIARA+1',
      'https://placehold.co/400x400/1f1f1f/FFD700?text=TIARA+2',
      'https://placehold.co/400x400/292929/FFD700?text=TIARA+3'
    ]
  },
  {
    id: '6',
    title: 'Dark Star Cuff',
    category: 'Bracelets',
    price: '$4,500',
    images: [
      'https://placehold.co/400x600/18181b/FFD700?text=CUFF+1',
      'https://placehold.co/400x600/1f1f1f/FFD700?text=CUFF+2'
    ]
  },
  {
    id: '7',
    title: 'Serpent Pendant',
    category: 'Necklaces',
    price: '$9,800',
    images: [
      'https://placehold.co/400x400/18181b/FFD700?text=PENDANT+1',
      'https://placehold.co/400x400/1f1f1f/FFD700?text=PENDANT+2',
      'https://placehold.co/400x400/292929/FFD700?text=PENDANT+3'
    ]
  },
  {
    id: '8',
    title: 'Cosmic Watch',
    category: 'Watches',
    price: '$25,000',
    images: [
      'https://placehold.co/400x600/18181b/FFD700?text=WATCH+1',
      'https://placehold.co/400x600/1f1f1f/FFD700?text=WATCH+2'
    ]
  },
];

// Sub-Component: Product Card with Draggable Carousel
const JxionProductCard: React.FC<{ product: Product; index: number }> = ({ 
  product, 
  index
}) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = product.images.length;
  const cardId = `card-${product.id}`;

  useEffect(() => {
    let dragInstance: any = null;
    let isMounted = true;

    const initDraggable = async () => {
      if (!imageContainerRef.current) return;

      try {
        // Import GSAP core first
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule.gsap || gsapModule;

        // Make GSAP available globally for plugin registration
        if (typeof window !== 'undefined') {
          (window as any).gsap = gsap;
        }

        // Import Draggable - it will auto-register with global GSAP
        const draggableModule = await import('gsap/Draggable');
        const Draggable = (draggableModule as any).Draggable || draggableModule.default;

        // Explicitly register the plugin
        if (Draggable && gsap.registerPlugin) {
          gsap.registerPlugin(Draggable);
        }

        // Wait a tick to ensure plugin is registered
        await new Promise(resolve => setTimeout(resolve, 0));

        if (!isMounted || !imageContainerRef.current) return;

        // Calculate the width of one image slot (100% of parent)
        const imageWidth = imageContainerRef.current.clientWidth / totalImages;

        // Calculate the horizontal snap points for GSAP
        const snapPoints = product.images.map((_, i) => -i * imageWidth);

        // Initialize Draggable for the inner image strip
        dragInstance = Draggable.create(imageContainerRef.current, {
          type: 'x',
          bounds: imageContainerRef.current.parentElement,
          edgeResistance: 0.65,
          zIndexBoost: false,
          snap: snapPoints,
          onDrag: () => {
            // Optional: Update UI during drag for immediate feedback
          },
          onThrowUpdate: function(this: any) {
            // Calculate which snap point (image) is currently visible
            const currentIndex = Math.round(this.x / imageWidth) * -1;
            if (currentIndex !== currentImage && currentIndex >= 0 && currentIndex < totalImages) {
              setCurrentImage(currentIndex);
            }
          },
          // Ensures the outer grid drag is smooth by preventing card drag bubbles
          allowContextMenu: true,
        });
      } catch (error) {
        console.error('Error loading GSAP Draggable for card:', error);
      }
    };

    initDraggable();

    // Clean up GSAP instance
    return () => {
      isMounted = false;
      if (dragInstance && dragInstance[0]) {
        dragInstance[0].kill();
      }
    };
  }, [product.id, totalImages, currentImage]);

  // Jxion-Design: Noir Card Styling
  const cardStyle = {
    // Staggered look: Add margin top to odd cards
    marginTop: index % 2 === 1 ? '5rem' : '0',
  };

  // Calculate the x-position for the image strip based on the current index
  const imageStripTransform = {
    width: `${totalImages * 100}%`,
    transform: `translateX(-${currentImage * (100 / totalImages)}%)`,
    transition: 'transform 0.4s ease-out',
  };

  return (
    <div
      className="product w-full cursor-pointer overflow-hidden rounded-xl bg-neutral-900 shadow-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.3)]"
      style={cardStyle}
    >
      {/* Product Image Carousel Area */}
      <div id={cardId} className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
        {/* Inner Image Strip (This is the draggable element) */}
        <div ref={imageContainerRef} className="h-full flex flex-row" style={imageStripTransform}>
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.title} - View ${i + 1}`}
              className="w-full h-full object-cover rounded-t-xl"
              style={{ width: `${100 / totalImages}%` }}
            />
          ))}
        </div>

        {/* Navigation Dots (Jxion-Design: Gold Accents) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 p-1 bg-black/50 rounded-full">
          {product.images.map((_, i) => (
            <span
              key={i}
              className={`block h-1 w-1 transition-all duration-200 rounded-full ${
                i === currentImage ? 'bg-yellow-500 w-3' : 'bg-neutral-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Details (Jxion-Design: Typography) */}
      <div className="p-4">
        <h3 className="text-xl font-serif text-white uppercase truncate">{product.title}</h3>
        <p className="text-sm font-sans text-yellow-600/70">{product.category}</p>
        <p className="text-lg font-bold font-serif text-yellow-500 mt-1">{product.price}</p>
      </div>
    </div>
  );
};

// Main Jxion-ProductGrid Component
export const JxionProductGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Separate products into 3 columns for staggered layout
  const columns = useMemo(() => {
    const cols: Product[][] = [[], [], []];
    MOCK_PRODUCTS.forEach((product, i) => {
      cols[i % 3].push(product);
    });
    return cols;
  }, []);

  useEffect(() => {
    let dragInstance: any = null;
    let isMounted = true;

    const initGridDraggable = async () => {
      if (!gridRef.current) return;

      try {
        // Import GSAP core first
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule.gsap || gsapModule;

        // Make GSAP available globally for plugin registration
        if (typeof window !== 'undefined') {
          (window as any).gsap = gsap;
        }

        // Import Draggable - it will auto-register with global GSAP
        const draggableModule = await import('gsap/Draggable');
        const Draggable = (draggableModule as any).Draggable || draggableModule.default;

        // Explicitly register the plugin
        if (Draggable && gsap.registerPlugin) {
          gsap.registerPlugin(Draggable);
        }

        // Wait a tick to ensure plugin is registered
        await new Promise(resolve => setTimeout(resolve, 0));

        if (!isMounted || !gridRef.current) return;

        // Initialize Draggable for the entire grid container (Palmer-like)
        dragInstance = Draggable.create(gridRef.current, {
          type: 'x,y',
          bounds: '#grid-container',
          edgeResistance: 0.95,
          throwProps: true,
          zIndexBoost: false,
          cursor: 'grabbing',
          onPress: () => {
            // Stop any active inner card carousel animations on outer drag start
            gsap?.killTweensOf('.product-image-strip');
          }
        });
      } catch (error) {
        console.error('Error loading GSAP Draggable for grid:', error);
      }
    };

    initGridDraggable();

    // Cleanup function
    return () => {
      isMounted = false;
      if (dragInstance && dragInstance[0]) {
        dragInstance[0].kill();
      }
    };
  }, []);

  return (
    <div className="w-full min-h-[150vh] bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-5xl md:text-7xl font-serif text-yellow-500 text-center mb-4">
          The Jxion Collection
        </h2>
        <p className="text-center text-lg font-sans text-neutral-400">
          Scroll (or drag!) to explore our latest pieces. Swipe on cards for more views.
        </p>
      </div>

      {/* Draggable Grid Container */}
      <div id="grid-container" className="overflow-hidden w-full relative">
        <div
          ref={gridRef}
          className="grid gap-4 md:gap-8 mx-auto w-[120%] md:w-[100%] max-w-[1500px]"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            transform: 'translateX(0%)',
          }}
        >
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="column space-y-8">
              {col.map((product, productIndex) => (
                <JxionProductCard
                  key={product.id}
                  product={product}
                  index={productIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JxionProductGrid;

