import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/api';
import { Search, Filter, Edit, Trash2, PlusCircle, ToggleLeft, ToggleRight, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const AdminServices = () => {
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const { data: services, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const res = await api.get('/services');
      return res.data.data.services;
    }
  });

  const updateServiceMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      // Create a copy and clean up _id if needed
      const payload = { ...updatedData };
      const id = payload._id;
      delete payload._id;
      const res = await api.put(`/services/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setIsEditModalOpen(false);
      setEditingService(null);
    }
  });

  const handleEditClick = (service: any) => {
    // Make a deep copy so we can edit locally
    setEditingService(JSON.parse(JSON.stringify(service)));
    setIsEditModalOpen(true);
  };

  const handlePackageChange = (pkgIdx: number, field: string, value: any) => {
    const updated = { ...editingService };
    if (!updated.packages) updated.packages = [];
    updated.packages[pkgIdx][field] = value;
    setEditingService(updated);
  };

  const handleFeatureChange = (pkgIdx: number, featureIdx: number, value: string) => {
    const updated = { ...editingService };
    updated.packages[pkgIdx].features[featureIdx] = value;
    setEditingService(updated);
  };

  const addFeature = (pkgIdx: number) => {
    const updated = { ...editingService };
    updated.packages[pkgIdx].features.push('');
    setEditingService(updated);
  };

  const addPackage = () => {
    const updated = { ...editingService };
    if (!updated.packages) updated.packages = [];
    updated.packages.push({ name: 'New Package', price: 0, features: [], isPopular: false });
    setEditingService(updated);
  };

  const saveService = () => {
    updateServiceMutation.mutate(editingService);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Table Toolbar */}
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search services..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none bg-slate-50"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          <Button className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white"><PlusCircle className="w-4 h-4 mr-2" /> Add Service</Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
              <th className="font-semibold py-4 px-6 w-16">Icon</th>
              <th className="font-semibold py-4 px-6">Service Name</th>
              <th className="font-semibold py-4 px-6">Category</th>
              <th className="font-semibold py-4 px-6">Base Price</th>
              <th className="font-semibold py-4 px-6">Status</th>
              <th className="font-semibold py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services?.map((service: any) => (
              <tr key={service._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                    <span className="text-xl">✨</span> {/* Fallback icon */}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="font-bold text-slate-900">{service.name}</p>
                  <p className="text-xs text-slate-500 truncate max-w-xs">{service.description}</p>
                </td>
                <td className="py-4 px-6">
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-semibold">
                    {service.category}
                  </span>
                </td>
                <td className="py-4 px-6 font-bold text-slate-900">
                  ${service.price?.toFixed(2)}
                </td>
                <td className="py-4 px-6">
                  <span className="flex items-center text-sm font-medium text-emerald-600">
                    <ToggleRight className="w-5 h-5 mr-1" /> Active
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEditClick(service)}
                      className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" 
                      title="Edit Service"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Service">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!services || services.length === 0) && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50">
        <div>Showing 1 to {services?.length || 0} of {services?.length || 0} entries</div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>

      {/* Edit Service Modal */}
      {isEditModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">Edit Service: {editingService.name}</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Service Name</label>
                  <Input value={editingService.name} onChange={(e) => setEditingService({...editingService, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Base Price</label>
                  <Input type="number" value={editingService.basePrice || editingService.price} onChange={(e) => setEditingService({...editingService, basePrice: Number(e.target.value)})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                />
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Packages / Tiers</h3>
                  <Button variant="outline" size="sm" onClick={addPackage}><Plus className="w-4 h-4 mr-1"/> Add Package</Button>
                </div>
                
                {editingService.packages?.map((pkg: any, pkgIdx: number) => (
                  <div key={pkgIdx} className="border border-slate-200 rounded-xl p-4 mb-4 bg-slate-50">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold mb-1 uppercase text-slate-500">Package Name</label>
                        <Input value={pkg.name} onChange={(e) => handlePackageChange(pkgIdx, 'name', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1 uppercase text-slate-500">Price</label>
                        <Input type="number" value={pkg.price} onChange={(e) => handlePackageChange(pkgIdx, 'price', Number(e.target.value))} />
                      </div>
                    </div>
                    
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase text-slate-500">Checklist Features</label>
                      <button onClick={() => addFeature(pkgIdx)} className="text-xs text-orange-500 font-bold hover:underline">+ Add Feature</button>
                    </div>
                    <div className="space-y-2">
                      {pkg.features?.map((feat: string, featIdx: number) => (
                        <div key={featIdx} className="flex gap-2">
                          <Input className="flex-1 text-sm" value={feat} onChange={(e) => handleFeatureChange(pkgIdx, featIdx, e.target.value)} placeholder="e.g. Daily brooming" />
                          <Button variant="outline" className="px-3" onClick={() => {
                            const updated = {...editingService};
                            updated.packages[pkgIdx].features.splice(featIdx, 1);
                            setEditingService(updated);
                          }}><Trash2 className="w-4 h-4 text-red-500"/></Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white p-6 border-t flex justify-end gap-3 z-10">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button className="bg-orange-500 text-white" onClick={saveService} disabled={updateServiceMutation.isPending}>
                {updateServiceMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
