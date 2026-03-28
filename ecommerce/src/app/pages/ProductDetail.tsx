import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { ChevronRight, ShieldCheck, Zap, Maximize } from 'lucide-react';
import { motion } from 'motion/react';
import { StarRating } from '../components/ratings/StarRating';
import { addStoredReview, getAllReviews, getReviewStats } from '../../lib/reviews';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviews, setReviews] = useState(() =>
    product ? getAllReviews(product.id, product.name) : []
  );

  React.useEffect(() => {
    if (!product) return;
    setReviews(getAllReviews(product.id, product.name));
  }, [product?.id, product?.name]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }
  const stats = getReviewStats(reviews);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          
          {/* Image Gallery */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
              className="bg-gray-50 aspect-square w-full relative overflow-hidden group cursor-zoom-in"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                <Maximize className="w-4 h-4 text-gray-700" />
              </div>
            </motion.div>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-gray-50 w-24 h-24 flex-shrink-0 cursor-pointer border border-transparent hover:border-black transition">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col pt-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-6">
              <Link to="/shop" className="hover:text-black">Shop</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-black">{product.category}</span>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-light tracking-tighter mb-4"
            >
              {product.name}
            </motion.h1>

            <div className="flex items-center gap-3 mb-6">
              <StarRating value={stats.average} size={16} label={`Rating ${stats.average} out of 5`} />
              <button
                type="button"
                onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="text-xs text-gray-500 hover:text-black transition"
              >
                {stats.count ? `${stats.average.toFixed(1)} · ${stats.count} review${stats.count === 1 ? '' : 's'}` : 'No reviews yet'}
              </button>
            </div>

            <p className="text-2xl font-medium text-gray-900 mb-8">${product.price.toLocaleString()}</p>
            
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
            
            <div className="flex items-center gap-4 py-6 border-y border-gray-100 mb-8">
              <div className="flex items-center gap-3 w-1/3">
                <ShieldCheck className="text-[#F9B303] w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">3-Year Warranty</span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-3 w-1/3">
                <Zap className="text-[#F9B303] w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">Easy Install</span>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="border border-gray-300 flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-50 transition"
                >-</button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-3 hover:bg-gray-50 transition"
                >+</button>
              </div>
              <Button size="lg" className="flex-grow w-full">
                Add to Cart — ${(product.price * quantity).toLocaleString()}
              </Button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-sm text-sm text-gray-600 leading-relaxed">
              <h4 className="font-semibold text-gray-900 mb-2 tracking-widest uppercase text-xs">Stock Status</h4>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {product.stock} units in stock. Usually ships within 24 hours.
              </p>
            </div>

          </div>
        </div>

        {/* Reviews */}
        <section id="reviews" className="mt-16 pt-12 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-3">Reviews</div>
              <div className="flex items-center gap-3">
                <StarRating value={stats.average} size={18} />
                <div className="text-sm text-gray-600">
                  <span className="text-gray-900 font-medium">
                    {stats.count ? stats.average.toFixed(1) : '0.0'}
                  </span>{' '}
                  <span className="text-gray-500">({stats.count} total)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {reviews.length === 0 ? (
                <div className="bg-gray-50 border border-gray-100 p-10 text-center text-gray-500">
                  Be the first to write a review.
                </div>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="bg-white border border-gray-200 p-6">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                          <StarRating value={r.rating} size={14} />
                        </div>
                        <p className="text-xs text-gray-400">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mt-4">
                      {r.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            <aside className="bg-gray-50 border border-gray-100 p-8 h-fit sticky top-32">
              <div className="text-sm font-semibold text-gray-900 mb-4">Write a review</div>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!reviewComment.trim()) return;
                  addStoredReview({
                    productId: product.id,
                    name: reviewName.trim() || 'Guest',
                    rating: reviewRating,
                    comment: reviewComment.trim(),
                  });
                  setReviews(getAllReviews(product.id, product.name));
                  setReviewName('');
                  setReviewRating(5);
                  setReviewComment('');
                }}
              >
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Your name</label>
                  <input
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Guest"
                    className="w-full border border-gray-300 p-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#F9B303]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Rating</label>
                  <div className="flex items-center justify-between">
                    <StarRating value={reviewRating} onChange={setReviewRating} size={18} />
                    <span className="text-xs text-gray-500">{reviewRating}/5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Review</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={5}
                    placeholder="Share your experience…"
                    className="w-full border border-gray-300 p-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#F9B303] resize-none"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Review
                </Button>
              </form>
            </aside>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};
