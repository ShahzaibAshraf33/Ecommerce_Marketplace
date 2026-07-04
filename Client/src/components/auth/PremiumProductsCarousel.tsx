import React, { useState, useEffect, useRef } from "react";
import GradientText from "./GradientText";

const PRODUCTS = [
  { id: 1, title: "Premium Watch", price: "$299" },
  { id: 2, title: "Wireless Headphones", price: "$199" },
  { id: 3, title: "Designer Sunglasses", price: "$149" },
  { id: 4, title: "Luxury Perfume", price: "$89" },
  { id: 5, title: "Smart Phone", price: "$999" },
  { id: 6, title: "Leather Wallet", price: "$59" },
];

const PremiumProductsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Calculate total pages based on items per view
  const itemsPerView = 2;
  const totalPages = Math.ceil(PRODUCTS.length / itemsPerView);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      
      if (scrollWidth === 0) return;
      
      const scrollPercentage = scrollPosition / scrollWidth;
      const newIndex = Math.round(scrollPercentage * (totalPages - 1));
      setActiveIndex(Math.min(Math.max(newIndex, 0), totalPages - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalPages]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      
      let nextIndex;
      let nextDirection = direction;

      if (direction === "forward") {
        if (activeIndex >= totalPages - 1) {
          nextIndex = Math.max(0, activeIndex - 1);
          nextDirection = "backward";
        } else {
          nextIndex = activeIndex + 1;
        }
      } else {
        if (activeIndex <= 0) {
          nextIndex = Math.min(totalPages - 1, 1);
          nextDirection = "forward";
        } else {
          nextIndex = activeIndex - 1;
        }
      }
      
      setDirection(nextDirection);

      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const targetScroll = (scrollWidth / (totalPages - 1)) * nextIndex;
      
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex, totalPages, direction]);

  return (
    <div className="mt-[29px] w-full max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold"><GradientText>Trending Products</GradientText></h3>
      </div>
      
      {/* Carousel Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PRODUCTS.map((product) => (
          <div 
            key={product.id}
            className="flex-none w-[117px] snap-start bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {/* Image Placeholder */}
            <div className="w-full h-[101px] bg-gray-100 relative group">
              <img 
                src={product.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='117' height='101'%3E%3Crect fill='%23f3f4f6' width='117' height='101'/%3C/svg%3E"}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='117' height='101'%3E%3Crect fill='%23f3f4f6' width='117' height='101'/%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs text-center px-2">
                {!product.image && `Image ${product.id}`}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="p-2">
              <h4 className="text-[10px] font-semibold text-gray-900 truncate">
                {product.title}
              </h4>
              <p className="text-[10px] font-bold text-[#8A5A2B] mt-0.5">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumProductsCarousel;
