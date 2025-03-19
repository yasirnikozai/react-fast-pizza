import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message}</p>
      <p>{error.data}</p>
      <LinkButton to="-1"></LinkButton>
    </div>
  );
}

export default Error;
