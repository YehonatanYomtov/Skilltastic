import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { AppDispatch } from "../../data/store";

function Profile() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={() => dispatch(logout())}>Log out</button>
    </div>
  );
}

export default Profile;
