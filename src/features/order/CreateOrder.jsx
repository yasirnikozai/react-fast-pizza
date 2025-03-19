import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../Utilis/apiRestaurant";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, totalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../Utilis/helpers";
import { fetchAddress } from "../../Utilis/userSlice";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const {
    username,
    status: isloadingAddress,
    position,
    address,
  } = useSelector((state) => state.user);
  const isloading = isloadingAddress === "loading";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalPricePerQuantity = useSelector(totalPrice);
  const priorityPrice = withPriority ? totalPricePerQuantity * 0.2 : 0;
  const total = totalPricePerQuantity + priorityPrice;
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="max-w-xl mx-auto bg-gray-100 shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Place Your Order 🛒
      </h2>

      <Form method="POST" className="space-y-6">
        {/* Full Name Field */}
        <div className="relative">
          <input
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            type="text"
            name="customer"
            defaultValue={username}
            placeholder="Full Name"
            required
          />
        </div>

        {/* Phone Number Field */}
        <div className="relative">
          <input
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
          />
          {formErrors?.phone && (
            <p className="text-sm text-red-600 mt-1">{formErrors.phone}</p>
          )}
        </div>

        {/* Address Field */}
        <div className="relative flex items-center gap-2">
          <input
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            type="text"
            name="address"
            disabled={isloading}
            defaultValue={address}
            placeholder="Delivery Address"
            required
          />
          {!position?.latitude && !position?.longitude && (
            <Button
              disabled={isloading}
              type="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              📍 Locate
            </Button>
          )}
        </div>

        {/* Priority Checkbox */}
        <div className="flex items-center gap-3">
          <input
            className="h-5 w-5 accent-yellow-500"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="text-lg font-medium">
            Prioritize My Order 🚀
          </label>
        </div>

        {/* Hidden Cart Field */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        {/* Submit Button */}
        <div className="text-center">
          <Button
            disabled={isSubmitting}
            type="primary"
            className="w-full p-4 text-lg bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition"
          >
            {isSubmitting
              ? "Placing Order..."
              : `Order Now for ${formatCurrency(total)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please provide a valid phone number so we can contact you if needed.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
