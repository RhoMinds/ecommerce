import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Product } from '../../data/mockData';
import { StarRating } from '../ratings/StarRating';
import { getAllReviews, getReviewStats } from '../../../lib/reviews';

export const ProductCard = ({ product }: { product: Product }) => {
  const [rating, setRating] = React.useState<{ average: number; count: number }>({ average: 0, count: 0 });

  React.useEffect(() => {
    const reviews = getAllReviews(product.id, product.name);
    setRating(getReviewStats(reviews));
  }, [product.id, product.name]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group cursor-pointer"
    >
      <Link to={`/product/${product.id}`} className="block relative bg-gray-50 rounded-md p-3 mb-4">
        <div className="aspect-square w-full overflow-hidden rounded-sm bg-white">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-3 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
        
        {/* Quick Add Button */}
        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-full bg-white text-gray-900 py-2.5 text-center text-xs uppercase tracking-widest font-semibold hover:bg-gray-900 hover:text-white transition-colors rounded-sm shadow-sm">
            Quick Add
          </div>
        </div>
      </Link>
      
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
          <span className="text-sm text-gray-500">${product.price.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating value={rating.average} size={14} label={`Rating ${rating.average} out of 5`} />
            <span className="text-[11px] text-gray-500">
              {rating.count ? `${rating.average.toFixed(1)} (${rating.count})` : 'No reviews'}
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
      </div>
    </motion.div>
  );
};
