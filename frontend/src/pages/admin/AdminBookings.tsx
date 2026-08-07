import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import { Search, Filter, MoreVertical, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AdminBookings = () => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const res = await api.get('/admin/bookings');
      return res.data.data.bookings;
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Table Toolbar */}
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by Booking ID, Customer Name..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none bg-slate-50"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          <Button className="flex-1 md:flex-none">Export CSV</Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
              <th className="font-semibold py-4 px-6">Booking ID</th>
              <th className="font-semibold py-4 px-6">Customer</th>
              <th className="font-semibold py-4 px-6">Service</th>
              <th className="font-semibold py-4 px-6">Schedule</th>
              <th className="font-semibold py-4 px-6">Total</th>
              <th className="font-semibold py-4 px-6">Status</th>
              <th className="font-semibold py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings?.map((booking: any) => (
              <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6">
                  <span className="font-mono font-bold text-slate-900">{booking.bookingId}</span>
                </td>
                <td className="py-4 px-6">
                  <p className="font-medium text-slate-900">{booking.user?.firstName} {booking.user?.lastName}</p>
                  <p className="text-xs text-slate-500">{booking.user?.email}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="font-medium text-slate-900">{booking.service?.name}</p>
                  <p className="text-xs text-slate-500">{booking.packageType}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="font-medium text-slate-900">{new Date(booking.date).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-500">{booking.timeSlot}</p>
                </td>
                <td className="py-4 px-6 font-bold text-slate-900">
                  ${booking.totalAmount?.toFixed(2)}
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    booking.bookingStatus === 'Confirmed' ? 'bg-orange-100 text-orange-600' :
                    booking.bookingStatus === 'Completed' ? 'bg-green-100 text-green-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {booking.bookingStatus}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Mark Completed">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Cancel Booking">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!bookings || bookings.length === 0) && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  No bookings found in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50">
        <div>Showing 1 to {bookings?.length || 0} of {bookings?.length || 0} entries</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>

    </div>
  );
};
