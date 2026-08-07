import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Homeowner',
      content: 'The team was incredibly professional. My house has never looked this clean. They even got the tough stains out of the carpet!',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      content: 'We use Sweepers for our office cleaning. They are always on time, discreet, and leave the place spotless. Highly recommended.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Apartment Renter',
      content: 'Used their move-out cleaning service to get my deposit back. The landlord was thrilled. Best $150 I ever spent!',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=3'
    }
  ];

  return (
    <section className="py-24 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Loved by Thousands</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Don't just take our word for it. Here is what our customers have to say.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-8 italic">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-sm text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
