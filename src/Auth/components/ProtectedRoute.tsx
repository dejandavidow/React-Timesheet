import { Navigate, Outlet } from "react-router-dom";
type AuthProps = {
  children: JSX.Element;
};
const ProtectedRoute = ({ children }: AuthProps) => {
  {
    if (localStorage.getItem("user") !== null)
      return children ? children : <Outlet />;
    else return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
