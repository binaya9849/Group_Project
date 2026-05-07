import { Plus, Minus, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartItem } from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItem({ id: productId, quantity: newQuantity }));
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
          
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add items to get started shopping.</p>
            <Link
              to="/products"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="glass-panel p-4 flex gap-4">
                {/* Product Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{item.product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{item.product.category}</p>
                  <p className="text-lg font-bold text-primary">${item.product.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <Minus size={18} className="text-muted-foreground" />
                  </button>
                  <span className="w-8 text-center text-foreground font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <Plus size={18} className="text-muted-foreground" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item.product.id)}
                  className="p-2 hover:bg-red-500/10 rounded text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax:</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total:</span>
                  <span className="text-primary">${calculateTotal()}</span>
                </div>
              </div>

              <Link
                to="/payment"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg 
                  hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-semibold"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/products"
                className="w-full mt-4 py-3 border border-white/20 text-foreground rounded-lg 
                  hover:bg-white/10 transition text-center font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
