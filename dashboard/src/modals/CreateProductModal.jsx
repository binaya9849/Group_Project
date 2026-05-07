// dashboard/src/components/models/CreateProductModal.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCreateProductModal } from "../store/slices/extraSlice";
import { createNewProduct } from "../store/slices/productSlice";
import { X, Upload, Loader2, XCircle } from 'lucide-react';

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

const CreateProductModal = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.product);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: ''
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("stock", formData.stock);

        for (let i = 0; i < images.length; i++) {
            data.append("images", images[i]);
        }

        dispatch(createNewProduct(data));
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-3xl my-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">Create New Product</h2>
                    <button 
                        onClick={() => dispatch(toggleCreateProductModal())}
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
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter product name"
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
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                placeholder="Enter product description"
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
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter local currency price"
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
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter available stock"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all capitalize"
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                                <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*" 
                                    onChange={handleImageChange}
                                    className="hidden" 
                                    id="image-upload" 
                                />
                                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center">
                                    <Upload className="w-10 h-10 text-blue-500 mb-2" />
                                    <p className="text-sm text-gray-600 font-medium">Click to upload images</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                                </label>
                            </div>
                            
                            {imagePreviews.length > 0 && (
                                <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative flex-shrink-0">
                                            <img src={preview} alt={`preview ${index}`} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                                            <button 
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 bg-white rounded-full text-red-500 shadow-md hover:text-red-700"
                                            >
                                                <XCircle size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                        <button 
                            type="button" 
                            onClick={() => dispatch(toggleCreateProductModal())}
                            className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading || images.length === 0}
                            className="px-6 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating...</> : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProductModal;