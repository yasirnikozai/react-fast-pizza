import React from "react";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, updateItemQuantity } from "./cartSlice";

export default function UpdateCartQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="font-medium gap-1">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(updateItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}
