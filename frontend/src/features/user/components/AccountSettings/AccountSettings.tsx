//* React-router-dom
import { Link } from "react-router-dom";

function AccountSettings() {
  return (
    <div>
      <h1>Account Settings</h1>

      <h4>Additional Tools</h4>
      <Link to="tasks">Tasks Dashboard</Link>
    </div>
  );
}

export default AccountSettings;
