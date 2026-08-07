import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  User, Calendar, Wallet, MapPin, LifeBuoy, 
  Clock, Receipt, Ban, RefreshCw, Star, Ticket, PlusCircle, CreditCard, Play, Pause, Repeat
} from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('bookings');

  // Queries
  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get('/users/profile');
      return res.data.data.user;
    }
  });

  const { data: bookings, refetch: refetchBookings } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: async () => {
      const res = await api.get('/bookings/my-bookings');
      return res.data.data.bookings;
    }
  });

  const { data: tickets, refetch: refetchTickets } = useQuery({
    queryKey: ['my-tickets'],
    queryFn: async () => {
      const res = await api.get('/tickets/my-tickets');
      return res.data.data.tickets;
    }
  });

  const handleCancelBooking = async (id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.patch(`/bookings/${id}/cancel`);
        alert('Booking cancelled successfully.');
        refetchBookings();
      } catch (error) {
        alert('Failed to cancel booking.');
      }
    }
  };

  const handleCreateTicket = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await api.post('/tickets', {
        subject: formData.get('subject'),
        description: formData.get('description'),
        priority: 'Medium'
      });
      alert('Support ticket created!');
      e.currentTarget.reset();
      refetchTickets();
    } catch (error) {
      alert('Failed to create ticket');
    }
  };

  const handleAddAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await api.post('/users/address', {
        title: formData.get('title'),
        street: formData.get('street'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode')
      });
      alert('Address saved!');
      e.currentTarget.reset();
      refetchProfile();
    } catch (error) {
      alert('Failed to save address');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h2>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-start">
              <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-3xl font-bold">
                {profile?.firstName?.charAt(0)}{profile?.lastName?.charAt(0)}
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">First Name</label>
                    <p className="font-semibold text-slate-900">{profile?.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Last Name</label>
                    <p className="font-semibold text-slate-900">{profile?.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Email Address</label>
                    <p className="font-semibold text-slate-900">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Phone Number</label>
                    <p className="font-semibold text-slate-900">{profile?.phone || 'Not provided'}</p>
                  </div>
                </div>
                <Button className="mt-4" variant="outline">Edit Profile</Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-indigo-600 p-8 rounded-2xl text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2 flex items-center"><Star className="w-5 h-5 mr-2" /> Refer & Earn</h3>
              <p className="text-orange-100 mb-6 max-w-lg">Share your referral code with friends. They get 10% off their first booking, and you earn 50 Loyalty Points!</p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 px-6 py-3 rounded-lg font-mono text-xl tracking-wider font-bold">
                  {profile?.referralCode || 'SWP-REF-99'}
                </div>
                <Button className="bg-white text-orange-500 hover:bg-orange-50">Copy Code</Button>
              </div>
            </div>
          </div>
        );
      
      case 'wallet':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Wallet & Loyalty</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 text-slate-400 mb-4">
                  <Wallet className="w-6 h-6 text-green-400" />
                  <span className="font-medium">Sweepers Wallet Balance</span>
                </div>
                <h3 className="text-5xl font-extrabold mb-8">${profile?.walletBalance?.toFixed(2) || '0.00'}</h3>
                <Button className="w-full bg-green-600 hover:bg-green-500 text-white">
                  <CreditCard className="w-4 h-4 mr-2" /> Top Up Wallet
                </Button>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 text-slate-500 mb-4">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="font-medium">Loyalty Points</span>
                </div>
                <h3 className="text-5xl font-extrabold text-slate-900 mb-2">{profile?.loyaltyPoints || '0'}</h3>
                <p className="text-slate-500 mb-8">100 points = $10 discount</p>
                <Button variant="outline" className="w-full">Redeem Points</Button>
              </div>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Saved Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile?.savedAddresses?.map((addr: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-bold">Default</span>
                  )}
                  <h3 className="font-bold text-lg mb-2 flex items-center"><MapPin className="w-4 h-4 mr-2 text-slate-400" /> {addr.title}</h3>
                  <p className="text-slate-600">{addr.street}</p>
                  <p className="text-slate-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mt-8">
              <h3 className="font-bold text-lg mb-4 flex items-center"><PlusCircle className="w-5 h-5 mr-2" /> Add New Address</h3>
              <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="title" placeholder="Address Title (e.g., Home, Office)" required />
                <Input name="street" placeholder="Street Address" required />
                <Input name="city" placeholder="City" required />
                <Input name="state" placeholder="State" required />
                <Input name="zipCode" placeholder="Zip Code" required />
                <Button type="submit" className="md:col-span-2">Save Address</Button>
              </form>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Support Tickets</h2>
            
            <div className="bg-slate-900 text-white p-8 rounded-2xl mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Need help?</h3>
                <p className="text-slate-400">Our customer support team is available 24/7 to assist you.</p>
              </div>
              <LifeBuoy className="w-12 h-12 text-orange-500 opacity-80" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="font-bold text-lg mb-4">Your Tickets</h3>
                {tickets?.length === 0 && <p className="text-slate-500">You have no support tickets.</p>}
                {tickets?.map((ticket: any) => (
                  <div key={ticket._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold font-mono text-orange-500">{ticket.ticketId}</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{ticket.subject}</h4>
                    <p className="text-sm text-slate-500 mb-4">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                    <Button variant="outline" size="sm">View Thread</Button>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                <h3 className="font-bold text-lg mb-4">Open a Ticket</h3>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <Input name="subject" placeholder="What do you need help with?" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea 
                      name="description" 
                      className="w-full flex min-h-[120px] rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2" 
                      placeholder="Describe your issue in detail..." 
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full">Submit Ticket</Button>
                </form>
              </div>
            </div>
          </div>
        );

      case 'subscriptions':
        const subscriptions = bookings?.filter((b: any) => b.service?.isSubscription || b.recurringType !== 'None') || [];
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">My Subscriptions</h2>
            {subscriptions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <Repeat className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No active subscriptions</h3>
                <p className="text-slate-500 mb-6">Subscribe to our Monthly Maid Services or deep cleaning plans.</p>
                <Button onClick={() => window.location.href = '/services'}>View Plans</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {subscriptions.map((sub: any) => (
                  <div key={sub._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-indigo-600 p-6 text-white flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{sub.service?.name}</h3>
                        <p className="text-orange-100 font-medium">Plan: {sub.packageType}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold shadow-sm backdrop-blur-sm">Active</span>
                      </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Start Date</p>
                        <p className="font-semibold text-slate-900">{new Date(sub.date).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Monthly Price</p>
                        <p className="font-semibold text-slate-900">₹{sub.basePrice || sub.totalAmount}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Next Billing Date</p>
                        <p className="font-semibold text-slate-900">
                          {/* Mock next billing date: 1 month from start date */}
                          {new Date(new Date(sub.date).setMonth(new Date(sub.date).getMonth() + 1)).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap gap-3">
                      <Button variant="outline" className="text-slate-600 hover:text-orange-500" onClick={() => alert('Subscription renewed!')}>
                        <RefreshCw className="w-4 h-4 mr-2" /> Renew Plan
                      </Button>
                      <Button variant="outline" className="text-slate-600 hover:text-yellow-600" onClick={() => alert('Subscription paused.')}>
                        <Pause className="w-4 h-4 mr-2" /> Pause Plan
                      </Button>
                      <Button variant="outline" className="text-slate-600 hover:text-orange-500" onClick={() => alert('Upgrade options loaded.')}>
                        Upgrade Plan
                      </Button>
                      <Button variant="ghost" className="text-red-500 hover:text-red-600 ml-auto" onClick={() => handleCancelBooking(sub._id)}>
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'bookings':
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">My Bookings</h2>
            {(!bookings || bookings.length === 0) ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <Receipt className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No bookings found</h3>
                <p className="text-slate-500 mb-6">You haven't made any bookings yet.</p>
                <Button onClick={() => window.location.href = '/services'}>Browse Services</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking: any) => (
                  <div key={booking._id} className="border border-slate-200 bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-slate-200">
                      <div className="flex items-center gap-4">
                        <span className="font-mono font-bold text-slate-900">{booking.bookingId}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          booking.bookingStatus === 'Confirmed' ? 'bg-orange-100 text-orange-600' :
                          booking.bookingStatus === 'Completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {booking.bookingStatus}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-slate-500">
                        Booked on {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-4 flex-1">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{booking.service?.name || 'Service'} ({booking.packageType})</h3>
                          <p className="text-slate-500">{booking.recurringType !== 'None' ? `${booking.recurringType} Recurring` : 'One-time service'}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-start gap-2 text-slate-700">
                            <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                              <p className="font-medium">Schedule</p>
                              <p className="text-slate-500">{new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-slate-700">
                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                              <p className="font-medium">Location</p>
                              <p className="text-slate-500">{booking.address.street}, {booking.address.city}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-end min-w-[200px] border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                        <div className="text-right w-full mb-4 md:mb-0">
                          <p className="text-sm text-slate-500 font-medium">Total Paid</p>
                          <p className="text-3xl font-extrabold text-slate-900">${booking.totalAmount?.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 w-full">
                          {booking.bookingStatus === 'Confirmed' && (
                            <>
                              <Button variant="outline" className="w-full text-xs h-9">
                                <RefreshCw className="w-3 h-3 mr-2" /> Reschedule
                              </Button>
                              <Button variant="outline" onClick={() => handleCancelBooking(booking._id)} className="w-full text-xs h-9 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                                <Ban className="w-3 h-3 mr-2" /> Cancel
                              </Button>
                            </>
                          )}
                          <Button className="w-full text-xs h-9 bg-slate-900 text-white hover:bg-slate-800">
                            Download Invoice
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Customer Portal</h1>
          <p className="text-slate-500 text-lg">Manage your entire Sweepers experience from one place.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-2">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'bookings' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Calendar className="w-5 h-5" /> My Bookings
              </button>
              <button 
                onClick={() => setActiveTab('subscriptions')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'subscriptions' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Repeat className="w-5 h-5" /> Subscriptions
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'profile' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <User className="w-5 h-5" /> My Profile
              </button>
              <button 
                onClick={() => setActiveTab('wallet')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'wallet' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Wallet className="w-5 h-5" /> Wallet & Loyalty
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'addresses' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <MapPin className="w-5 h-5" /> Saved Addresses
              </button>
              <button 
                onClick={() => setActiveTab('support')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'support' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <LifeBuoy className="w-5 h-5" /> Support Tickets
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>

        </div>
      </div>
    </div>
  );
};
