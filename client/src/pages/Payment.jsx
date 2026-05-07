import { useState, useEffect } from "react";
import { ArrowLeft, Check, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
  };

  const handlePaymentSuccess = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement order creation
      toast.success('Payment successful! Your order has been placed.');
      navigate('/orders');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">
                No items to checkout
              </h1>
              <Link
                to="/products"
                className="text-primary hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/cart" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to Cart
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-8">
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader className="animate-spin text-primary" size={40} />
                </div>
              ) : (
                <Elements stripe={stripePromise}>
                  <PaymentForm onSuccess={handlePaymentSuccess} />
                </Elements>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              {/* Items List */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground mt-4 pt-4 border-t border-white/10">
                  <span>Total:</span>
                  <span className="text-primary">${calculateTotal()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                  <Check size={16} />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
