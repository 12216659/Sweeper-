import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/utils/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle2, ArrowRight, ArrowLeft, MapPin, Map, Receipt, CheckCircle, Ticket } from 'lucide-react';

export const Book = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedService = location.state;
  
  const [step, setStep] = useState(preSelectedService?.serviceId ? 2 : 1);
  const [bookingId, setBookingId] = useState('');

  const [bookingData, setBookingData] = useState({
    serviceId: preSelectedService?.serviceId || '',
    serviceName: preSelectedService?.serviceName || '',
    basePrice: preSelectedService?.basePrice || 0,
    packageType: 'Standard',
    extraServices: [] as Array<{name: string, price: number}>,
    date: '',
    timeSlot: '',
    recurringType: 'None',
    address: { street: '', city: '', state: '', zipCode: '' },
    couponCode: '',
    notes: ''
  });

  const [discount, setDiscount] = useState(0);

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/v1/services');
      const result = await response.json();
      return result.data.services;
    }
  });

  const handleApplyCoupon = async () => {
    try {
      const res = await api.post('/bookings/apply-coupon', { code: bookingData.couponCode });
      const coupon = res.data.data.coupon;
      alert(`Coupon applied! ${coupon.discountPercentage}% off!`);
      const sub = bookingData.basePrice + bookingData.extraServices.reduce((a,b)=>a+b.price,0);
      let disc = (sub * coupon.discountPercentage) / 100;
      if (disc > coupon.maxDiscountAmount) disc = coupon.maxDiscountAmount;
      setDiscount(disc);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Invalid Coupon');
      setDiscount(0);
    }
  };

  const getSelectedServiceObj = () => {
    return services?.find((s: any) => s._id === bookingData.serviceId) || null;
  };

  const toggleExtra = (extra: {name: string, price: number}) => {
    const exists = bookingData.extraServices.find(e => e.name === extra.name);
    if (exists) {
      setBookingData({ ...bookingData, extraServices: bookingData.extraServices.filter(e => e.name !== extra.name) });
    } else {
      setBookingData({ ...bookingData, extraServices: [...bookingData.extraServices, extra] });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-slate-500 mb-6">You must be logged in to book a service.</p>
          <Button onClick={() => navigate('/login')} className="w-full">Sign In to Book</Button>
        </div>
      </div>
    );
  }

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleCheckout = async () => {
    try {
      const res = await api.post('/bookings', {
        service: bookingData.serviceId,
        packageType: bookingData.packageType,
        extraServices: bookingData.extraServices,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        recurringType: bookingData.recurringType,
        baseAmount: bookingData.basePrice,
        couponCode: bookingData.couponCode,
        address: bookingData.address,
        notes: bookingData.notes
      });
      setBookingId(res.data.data.booking.bookingId);
      setStep(6);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create booking.');
    }
  };

  const extrasList = [
    { name: 'Clean Fridge Interior', price: 25 },
    { name: 'Clean Oven Interior', price: 25 },
    { name: 'Interior Windows', price: 40 },
    { name: 'Deep Carpet Shampoo', price: 60 }
  ];

  const subtotal = bookingData.basePrice + bookingData.extraServices.reduce((a,b)=>a+b.price, 0);
  const gst = (subtotal - discount) * 0.18;
  const total = (subtotal - discount) + gst;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {step < 6 && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Book a Service</h1>
            <div className="flex justify-between text-sm font-medium text-slate-500 mt-4 mb-2">
              <span className={step >= 1 ? "text-orange-500" : ""}>Service</span>
              <span className={step >= 2 ? "text-orange-500" : ""}>Package</span>
              <span className={step >= 3 ? "text-orange-500" : ""}>Schedule</span>
              <span className={step >= 4 ? "text-orange-500" : ""}>Location</span>
              <span className={step >= 5 ? "text-orange-500" : ""}>Payment</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }}></div>
            </div>
          </div>
        )}

        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-semibold">Select a Service</h2>
            {isLoading ? <div className="text-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div></div> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services?.map((service: any) => (
                  <Card 
                    key={service._id} 
                    className={`cursor-pointer transition-all ${bookingData.serviceId === service._id ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500/20' : 'hover:border-orange-300'}`}
                    onClick={() => setBookingData({ ...bookingData, serviceId: service._id, serviceName: service.name, basePrice: service.basePrice })}
                  >
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-slate-900">{service.name}</h3>
                        {bookingData.serviceId === service._id && <CheckCircle2 className="text-orange-500 w-5 h-5 shrink-0" />}
                      </div>
                      <p className="text-sm font-medium text-green-600">${service.basePrice}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-8">
              <Button onClick={handleNext} disabled={!bookingData.serviceId}>Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
          </div>
        )}

        {/* STEP 2: PACKAGE & EXTRAS */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose a Package</h2>
              {getSelectedServiceObj()?.packages && getSelectedServiceObj().packages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getSelectedServiceObj().packages.map((pkg: any) => (
                    <div 
                      key={pkg.name}
                      onClick={() => setBookingData({...bookingData, packageType: pkg.name, basePrice: pkg.price})}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all relative ${bookingData.packageType === pkg.name ? 'border-orange-500 bg-orange-50 shadow-md shadow-orange-500/10' : 'border-slate-200 bg-white hover:border-orange-300'}`}
                    >
                      {pkg.isPopular && (
                        <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#22C55E] to-emerald-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          Most Popular
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-xl">{pkg.name}</h3>
                          <p className="text-2xl font-extrabold text-orange-500 mt-1">₹{pkg.price}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${bookingData.packageType === pkg.name ? 'border-orange-500 bg-orange-500' : 'border-slate-300 bg-white'}`}>
                          {bookingData.packageType === pkg.name && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                      
                      <div className="space-y-3 mt-4 border-t border-slate-200/50 pt-4">
                        {pkg.features.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                            <span className="text-sm font-medium text-slate-700">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Standard', 'Premium / Deep Clean'].map((pkg) => (
                    <div 
                      key={pkg}
                      onClick={() => setBookingData({...bookingData, packageType: pkg})}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${bookingData.packageType === pkg ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white hover:border-orange-300'}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg">{pkg}</h3>
                        {bookingData.packageType === pkg && <CheckCircle2 className="text-orange-500 w-6 h-6" />}
                      </div>
                      <p className="text-sm text-slate-500">
                        {pkg === 'Standard' ? 'Perfect for routine maintenance.' : 'Thorough cleaning for deep grime and dirt.'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Add Extra Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {extrasList.map((extra) => {
                  const isSelected = bookingData.extraServices.some(e => e.name === extra.name);
                  return (
                    <div 
                      key={extra.name}
                      onClick={() => toggleExtra(extra)}
                      className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white'}`}
                    >
                      <span className="font-medium">{extra.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-green-600">+${extra.price}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-orange-500 border-orange-500' : 'border-slate-300'}`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
              <Button onClick={handleNext}>Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-semibold">Schedule Your Cleaning</h2>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-8">
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium mb-3">Select Date</label>
                  <Input type="date" value={bookingData.date} onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })} className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3">Select Time Slot</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map((time) => (
                      <div 
                        key={time} 
                        onClick={() => setBookingData({ ...bookingData, timeSlot: time })}
                        className={`p-3 text-center rounded-lg border cursor-pointer font-medium transition-colors ${bookingData.timeSlot === time ? 'bg-orange-500 text-white border-orange-500' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'}`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <label className="block text-sm font-medium mb-4">Make it a recurring service? (Save 10%)</label>
                <div className="flex flex-wrap gap-3">
                  {['None', 'Weekly', 'Bi-Weekly', 'Monthly'].map((type) => (
                    <div 
                      key={type}
                      onClick={() => setBookingData({...bookingData, recurringType: type})}
                      className={`px-6 py-2 rounded-full border cursor-pointer text-sm font-medium transition-colors ${bookingData.recurringType === type ? 'bg-green-600 text-white border-green-600' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
              <Button onClick={handleNext} disabled={!bookingData.date || !bookingData.timeSlot}>Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
          </div>
        )}

        {/* STEP 4: ADDRESS (Google Maps Mock) */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-semibold">Service Location</h2>
            
            <div className="bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative h-64 flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=13&size=800x400&sensor=false')] bg-cover bg-center"></div>
              <div className="relative z-10 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg text-center flex flex-col items-center">
                <Map className="w-8 h-8 text-orange-500 mb-2" />
                <p className="font-semibold text-slate-900">Google Maps Integration Active</p>
                <p className="text-xs text-slate-500">Auto-fill your address below</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center"><MapPin className="w-4 h-4 mr-2 text-slate-400"/> Street Address</label>
                <Input placeholder="Start typing your address..." value={bookingData.address.street} onChange={(e) => setBookingData({ ...bookingData, address: { ...bookingData.address, street: e.target.value } })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <Input value={bookingData.address.city} onChange={(e) => setBookingData({ ...bookingData, address: { ...bookingData.address, city: e.target.value } })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <Input value={bookingData.address.state} onChange={(e) => setBookingData({ ...bookingData, address: { ...bookingData.address, state: e.target.value } })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Zip Code</label>
                <Input value={bookingData.address.zipCode} onChange={(e) => setBookingData({ ...bookingData, address: { ...bookingData.address, zipCode: e.target.value } })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Any special instructions? (Optional)</label>
                <Input placeholder="e.g., Gate code is 1234, beware of dog" value={bookingData.notes} onChange={(e) => setBookingData({...bookingData, notes: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
              <Button onClick={handleNext} disabled={!bookingData.address.street || !bookingData.address.city}>Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
          </div>
        )}

        {/* STEP 5: CHECKOUT & SUMMARY */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-semibold">Review & Pay</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              
              <div className="flex-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg border-b pb-4 mb-4">Booking Details</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Service</span>
                    <span className="font-medium text-slate-900">{bookingData.serviceName} ({bookingData.packageType})</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Schedule</span>
                    <span className="font-medium text-slate-900">{bookingData.date} at {bookingData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Location</span>
                    <span className="font-medium text-slate-900 text-right">{bookingData.address.street}, {bookingData.address.city}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Recurring</span>
                    <span className="font-medium text-orange-500">{bookingData.recurringType}</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-sm mb-4 flex items-center"><Ticket className="w-4 h-4 mr-2 text-orange-500"/> Have a Coupon?</h3>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter code (e.g. WELCOME10)" 
                      value={bookingData.couponCode}
                      onChange={(e) => setBookingData({...bookingData, couponCode: e.target.value})}
                    />
                    <Button variant="outline" onClick={handleApplyCoupon}>Apply</Button>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-96">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl sticky top-24">
                  <h3 className="font-bold text-lg border-b border-slate-700 pb-4 mb-4 flex items-center">
                    <Receipt className="w-5 h-5 mr-2" /> Order Summary
                  </h3>
                  
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Base Service</span>
                      <span>${bookingData.basePrice.toFixed(2)}</span>
                    </div>
                    {bookingData.extraServices.map(extra => (
                      <div key={extra.name} className="flex justify-between text-orange-200">
                        <span>+ {extra.name}</span>
                        <span>${extra.price.toFixed(2)}</span>
                      </div>
                    ))}
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-400 font-medium">
                        <span>Discount Applied</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between border-t border-slate-700 pt-3 mt-3">
                      <span className="text-slate-400">Subtotal</span>
                      <span>${(subtotal - discount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>GST (18%)</span>
                      <span>${gst.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-slate-700 pt-4 mb-6">
                    <span className="text-lg font-bold">Total to Pay</span>
                    <span className="text-3xl font-extrabold text-orange-400">${total.toFixed(2)}</span>
                  </div>

                  <Button onClick={handleCheckout} className="w-full h-14 text-lg bg-orange-500 hover:bg-orange-500">
                    Proceed to Payment
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Secure SSL Encrypted Payment</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex mt-8">
              <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
            </div>
          </div>
        )}

        {/* STEP 6: SUCCESS CONFIRMATION */}
        {step === 6 && (
          <div className="space-y-6 animate-in zoom-in-95 duration-500 py-12">
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Booking Confirmed!</h2>
              <p className="text-lg text-slate-500 mb-8">
                Your payment was successful and your cleaning professional has been notified.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left border border-slate-100">
                <p className="text-sm text-slate-500 font-medium mb-1">Booking Reference ID</p>
                <p className="text-2xl font-bold text-slate-900 tracking-wider font-mono">{bookingId}</p>
              </div>

              <p className="text-sm text-slate-600 mb-8">
                We've sent a confirmation email and SMS with your invoice and booking details.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="h-12" onClick={() => window.print()}>
                  Download Invoice
                </Button>
                <Button className="h-12 bg-slate-900" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
