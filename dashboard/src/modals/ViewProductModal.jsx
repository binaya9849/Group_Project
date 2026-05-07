// dashboard/src/components/models/ViewProductModal.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleViewProductModal } from '../../store/slices/extraSlice';
import { X, Star, Package, Tag, DollarSign } from 'lucide-react';

const ViewProductModal = ({ selectedProduct }) => {
    const dispatch = useDispatch();

    if (!selectedProduct) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative animate-in fade-in zoom-in duration-300 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
                    <button 
                        onClick={() => dispatch(toggleViewProductModal())}
                        className="p-2 bg-white hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-500 shadow-sm border border-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-center h-80">
                        {selectedProduct.images && selectedProduct.images.length > 0 ? (
                            <img 
                                src={selectedProduct.images[0].url} 
                                alt={selectedProduct.name} 
                                className="max-w-full max-h-full object-contain mix-blend-multiply"
                            />
                        ) : (
                            <div className="text-gray-400 font-medium">No Image Available</div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center space-y-5">
                        <div>
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{selectedProduct.name}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    {selectedProduct.category}
                                </span>
                                <div className="flex items-center text-yellow-500 bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-bold">
                                    <Star size={14} className="fill-current mr-1" />
                                    {selectedProduct.ratings || "0.00"}
                                </div>
                            </div>
                        </div>

                        <div className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm leading-relaxed">
                            {selectedProduct.description}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-green-50 border border-green-100 p-4 rounded-xl">
                                <div className="flex items-center text-green-600 mb-1">
                                    <DollarSign size={16} className="mr-1" />
                                    <span className="text-sm font-semibold uppercase tracking-wider">Price</span>
                                </div>
                                <p className="text-2xl font-bold text-green-700">${selectedProduct.price}</p>
                            </div>
                            
                            <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
                                <div className="flex items-center text-purple-600 mb-1">
                                    <Package size={16} className="mr-1" />
                                    <span className="text-sm font-semibold uppercase tracking-wider">Stock</span>
                                </div>
                                <p className="text-2xl font-bold text-purple-700">{selectedProduct.stock} Units</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductModal;