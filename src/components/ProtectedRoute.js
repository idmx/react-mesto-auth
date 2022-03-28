import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ loggedIn, ...props }) {
  return loggedIn ? <Route { ...props }/> : <Redirect to="/sign-in"/>;
}