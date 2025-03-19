import { useState } from "react";
import Button from "../../UI/Button";

import { useDispatch } from "react-redux";
import { updateName } from "../../Utilis/userSlice";
import { useNavigate } from "react-router-dom";
function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 h-10 mb-5 rounded-full bg-yellow-100 px-4 py-2 sm:text placeholder:text-stone-700 focus:w-72 sm-w-64
        focus:outline-none focus:ring focus:ring-opacity-50 focus:bg-yellow-500 sm:w-72"
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
