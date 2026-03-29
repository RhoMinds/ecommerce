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
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
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
      <div className="flex min-h-screen items-center justify-center">
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  const stats = getReviewStats(reviews);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl flex-grow px-5 pb-16 pt-24 sm:px-6 md:px-12 md:pt-28">
        <div className="flex flex-col gap-10 md:flex-row md:gap-12 lg:gap-24">
          <div className="flex w-full flex-col gap-4 md:w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="group relative aspect-square w-full cursor-zoom-in overflow-hidden bg-gray-50"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute right-4 top-4 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Maximize className="h-4 w-4 text-gray-700" />
              </div>
            </motion.div>

            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-20 flex-shrink-0 cursor-pointer border border-transparent bg-gray-50 transition hover:border-black sm:h-24 sm:w-24"
                >
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col pt-2 md:w-1/2 md:pt-8">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
              <Link to="/shop" className="hover:text-black">
                Shop
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-black">{product.category}</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-3xl font-light tracking-tighter sm:text-4xl md:text-5xl"
            >
              {product.name}
            </motion.h1>

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <StarRating value={stats.average} size={16} label={`Rating ${stats.average} out of 5`} />
              <button
                type="button"
                onClick={() =>
                  document.getElementById('reviews')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }
                className="text-xs text-gray-500 transition hover:text-black"
              >
                {stats.count
                  ? `${stats.average.toFixed(1)} - ${stats.count} review${stats.count === 1 ? '' : 's'}`
                  : 'No reviews yet'}
              </button>
            </div>

            <p className="mb-8 text-2xl font-medium text-gray-900">${product.price.toLocaleString()}</p>

            <p className="mb-8 leading-relaxed text-gray-600">{product.description}</p>

            <div className="mb-8 flex flex-col gap-4 border-y border-gray-100 py-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3 sm:w-1/2">
                <ShieldCheck className="h-5 w-5 text-[#F9B303]" />
                <span className="text-xs font-semibold uppercase tracking-widest">3-Year Warranty</span>
              </div>
              <div className="hidden h-8 w-px bg-gray-200 sm:block" />
              <div className="flex items-center gap-3 sm:w-1/2">
                <Zap className="h-5 w-5 text-[#F9B303]" />
                <span className="text-xs font-semibold uppercase tracking-widest">Easy Install</span>
              </div>
            </div>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 transition hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-3 transition hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <Button size="lg" className="w-full sm:flex-grow">
                Add to Cart - ${(product.price * quantity).toLocaleString()}
              </Button>
            </div>

            <div className="rounded-sm bg-gray-50 p-6 text-sm leading-relaxed text-gray-600">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-900">
                Stock Status
              </h4>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {product.stock} units in stock. Usually ships within 24 hours.
              </p>
            </div>
          </div>
        </div>

        <section id="reviews" className="mt-16 border-t border-gray-100 pt-12">
          <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-xs uppercase tracking-widest text-gray-400">Reviews</div>
              <div className="flex items-center gap-3">
                <StarRating value={stats.average} size={18} />
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    {stats.count ? stats.average.toFixed(1) : '0.0'}
                  </span>{' '}
                  <span className="text-gray-500">({stats.count} total)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {reviews.length === 0 ? (
                <div className="border border-gray-100 bg-gray-50 p-10 text-center text-gray-500">
                  Be the first to write a review.
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 bg-white p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-3">
                          <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                          <StarRating value={review.rating} size={14} />
                        </div>
                        <p className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">{review.comment}</p>
                  </div>
                ))
              )}
            </div>

            <aside className="h-fit border border-gray-100 bg-gray-50 p-6 sm:p-8 lg:sticky lg:top-32">
              <div className="mb-4 text-sm font-semibold text-gray-900">Write a review</div>

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
                  <label className="mb-2 block text-xs uppercase tracking-widest text-gray-400">
                    Your name
                  </label>
                  <input
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Guest"
                    className="w-full border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9B303]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-gray-400">
                    Rating
                  </label>
                  <div className="flex items-center justify-between gap-4">
                    <StarRating value={reviewRating} onChange={setReviewRating} size={18} />
                    <span className="text-xs text-gray-500">{reviewRating}/5</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-gray-400">
                    Review
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={5}
                    placeholder="Share your experience..."
                    className="w-full resize-none border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9B303]"
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
