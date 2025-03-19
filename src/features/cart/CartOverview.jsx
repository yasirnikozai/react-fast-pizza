import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { totalPrice, totalQuantity } from "./cartSlice";
import { formatCurrency } from "../../Utilis/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(totalQuantity);
  const totalCartPrice = useSelector(totalPrice);
  if (!totalCartQuantity) return null;
  return (
    <div className="bg-stone-800 text-stone-200 uppercase p-4 sm:px-6 px-4 md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
