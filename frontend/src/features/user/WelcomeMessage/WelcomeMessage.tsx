import { useSelector } from "react-redux";
import { RootState } from "../../../data/store";

function WelcomeMessage() {
  const user = useSelector((state: RootState) => state.user.user);

  return <h1>Welcome {user?.name}!</h1>;
}

export default WelcomeMessage;
