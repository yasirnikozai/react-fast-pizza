import { useSelector } from "react-redux";
import LinkButton from "../../UI/LinkButton";
import Button from "../../UI/Button";

function EmptyCart() {
  const cart = useSelector((state) => state.cart.cart); // Get cart from Redux

  if (cart.length === 0) {
    return (
      <div className="px-3 py-4 mt-1">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>

        <p className="mt-7 font-semibold">
          Your cart is still empty. Start adding some pizzas :)
        </p>
      </div>
    );
  }

  return null; // If cart is not empty, return nothing
}

export default EmptyCart;
