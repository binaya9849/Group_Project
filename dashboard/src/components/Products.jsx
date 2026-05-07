// dashboard/src/components/Products.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, deleteProduct } from '../store/slices/productSlice';
import { toggleCreateProductModal, toggleUpdateProductModal } from '../store/slices/extraSlice';
import Header from './Header';
import { Loader2, Plus } from 'lucide-react';
import CreateProductModal from "../modals/CreateProductModal";
import UpdateProductModal from "../modals/UpdateProductModal";
const Products = () => {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();

    const { fetchingProducts, products, totalProducts } = useSelector((state) => state.product);
    const { isCreateProductModalOpen, isUpdateProductModalOpen } = useSelector((state) => state.extra);

    useEffect(() => {
        dispatch(fetchAllProducts(page));
    }, [dispatch, page]);

    useEffect(() => {
        if (totalProducts !== undefined) {
            const newMax = Math.ceil(totalProducts / 10) || 1;
            setMaxPage(newMax);
        }
    }, [totalProducts]);

    useEffect(() => {
        if (page > maxPage && maxPage > 0) {
            setPage(maxPage);
        }
    }, [maxPage, page]);

    const handleDeleteProduct = (e, id) => {
        e.stopPropagation();
        dispatch(deleteProduct(id, page));
    };

    const handleUpdateProduct = (e, product) => {
        e.stopPropagation();
        setSelectedProduct(product);
        dispatch(toggleUpdateProductModal());
    };

    return (
        <main className="p-[10px] pl-[10px] md:pl-[17rem] w-full bg-gray-50 min-h-screen">
            <div className="flex-1 md:p-6">
                <Header />
                <h1 className="text-2xl font-bold">All Products</h1>
                <p className="text-sm text-gray-600 mb-6">Manage Nepa Store Inventory</p>
                
                <div className="p-4 sm:p-8 bg-white rounded-xl shadow-md min-h-[60vh]">
                    <div className="overflow-x-auto rounded-lg">
                        {fetchingProducts ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                            </div>
                        ) : products?.length > 0 ? (
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className="bg-blue-100 text-gray-700">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Image</th>
                                        <th className="py-3 px-4 text-left">Title</th>
                                        <th className="py-3 px-4 text-left">Category</th>
                                        <th className="py-3 px-4 text-left">Price</th>
                                        <th className="py-3 px-4 text-left">Stock</th>
                                        <th className="py-3 px-4 text-left">Ratings</th>
                                        <th className="py-3 px-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-t hover:bg-gray-50 transition cursor-pointer">
                                            <td className="py-3 px-4">
                                                <img 
                                                    src={product.images?.[0]?.url || ''} 
                                                    alt={product.name} 
                                                    className="w-12 h-12 rounded-md object-contain border bg-white" 
                                                />
                                            </td>
                                            <td className="py-3 px-4 font-medium">{product.name}</td>
                                            <td className="py-3 px-4 text-gray-600">{product.category}</td>
                                            <td className="py-3 px-4">${product.price}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${product.stock > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-yellow-500 font-semibold">{product.ratings || "0.00"}</td>
                                            <td className="py-3 px-4 flex gap-2">
                                                <button 
                                                    onClick={(e) => handleUpdateProduct(e, product)}
                                                    className="text-white rounded-md px-3 py-2 text-sm font-semibold bg-blue-500 hover:bg-blue-600 transition"
                                                >
                                                    Update
                                                </button>
                                                <button 
                                                    onClick={(e) => handleDeleteProduct(e, product.id)}
                                                    className="text-white rounded-md px-3 py-2 text-sm font-semibold bg-red-500 hover:bg-red-600 transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <h3 className="text-2xl p-6 font-bold text-gray-700 text-center">No Products Found</h3>
                        )}
                    </div>
                    
                    {!fetchingProducts && products?.length > 0 && (
                        <div className="flex justify-center mt-8 gap-4">
                            <button 
                                disabled={page === 1}
                                onClick={() => setPage(Math.max(page - 1, 1))}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-700 font-medium">Page {page} of {maxPage}</span>
                            <button 
                                disabled={page === maxPage}
                                onClick={() => setPage(page + 1)}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={() => dispatch(toggleCreateProductModal())}
                title="Create a new product"
                className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl z-50 transition-all hover:scale-105"
            >
                <Plus size={24} />
            </button>

            {isCreateProductModalOpen && <CreateProductModal />}
            {isUpdateProductModalOpen && <UpdateProductModal selectedProduct={selectedProduct} />}
        </main>
    );
};

export default Products;