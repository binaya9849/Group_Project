// dashboard/src/components/models/UpdateProductModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUpdateProductModal } from "../store/slices/extraSlice";
import { updateProduct } from "../store/slices/productSlice";
import { X, Loader2 } from 'lucide-react';

const categories = [
    { id: 1, name: 'electronics' },
    { id: 2, name: 'fashion' },
    { id: 3, name: 'home & garden' },
    { id: 4, name: 'sports' },
    { id: 5, name: 'kids & baby' },
    { id: 6, name: 'automotive' },
    { id: 7, name: 'beauty' },
    { id: 8, name: 'books' }
];

const UpdateProductModal = ({ selectedProduct }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.product);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: ''
    });

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                name: selectedProduct.name || '',
                description: selectedProduct.description || '',
                price: selectedProduct.price ? (selectedProduct.price * 283).toString() : '', // Assuming standard conversion used in video
                category: selectedProduct.category || '',
                stock: selectedProduct.stock || ''
            });
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since we aren't handling images update in this basic modal, we just send JSON text data
        dispatch(updateProduct(formData, selectedProduct.id));
    };

    if (!selectedProduct) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-3xl my-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">Update Product</h2>
                    <button 
                        onClick={() => dispatch(toggleUpdateProductModal())}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea 
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price (PKR/INR)</label>
                            <input 
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                            <input 
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all capitalize"
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                        <button 
                            type="button" 
                            onClick={() => dispatch(toggleUpdateProductModal())}
                            className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="px-6 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
                        >
                            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Updating...</> : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductModal;