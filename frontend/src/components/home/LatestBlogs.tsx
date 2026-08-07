import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LatestBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: '10 Spring Cleaning Tips for a Healthier Home',
      excerpt: 'Discover the most effective strategies to deep clean your home this spring and improve your indoor air quality.',
      date: 'Mar 15, 2026',
      image: 'https://images.unsplash.com/photo-1584820927498-cafe2c07a769?q=80&w=2070&auto=format&fit=crop',
      category: 'Tips & Tricks'
    },
    {
      id: 2,
      title: 'Why Eco-Friendly Cleaning Products Matter',
      excerpt: 'Learn about the hidden dangers of harsh chemicals and why switching to green products protects your family.',
      date: 'Apr 02, 2026',
      image: 'https://images.unsplash.com/photo-1628177142898-93e46e616334?q=80&w=2070&auto=format&fit=crop',
      category: 'Health'
    },
    {
      id: 3,
      title: 'How Often Should You Deep Clean Your Carpet?',
      excerpt: 'Carpets trap dirt, allergens, and bacteria. Find out the ideal frequency for professional carpet extraction.',
      date: 'Apr 18, 2026',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1974&auto=format&fit=crop',
      category: 'Maintenance'
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Latest from our Blog</h2>
            <p className="text-slate-500 max-w-2xl text-lg">Tips, tricks, and insights for maintaining a pristine home.</p>
          </div>
          <Link to="/blog" className="hidden md:flex items-center text-orange-500 font-medium hover:text-orange-600">
            View All Articles <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer border border-slate-100">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-500 z-10 shadow-sm">
                  {blog.category}
                </div>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-slate-400 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {blog.date}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-slate-500 line-clamp-2">
                  {blog.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
