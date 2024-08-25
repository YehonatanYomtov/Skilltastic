import { useSelector } from "react-redux";
import { RootState } from "../../../data/store";

function WelcomeMessage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return <h1>Welcome {user?.email}!</h1>;
}

export default WelcomeMessage;
