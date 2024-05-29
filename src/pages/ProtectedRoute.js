import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [loading, setLoading] = useState(true)
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); //confirms if the value of user is null
      setLoading(false)

    });
    return () => unsubscribe();
  }, [auth]); // rerenders the protected route if the authentication state changes


if(loading){
    return 
}

  if (!isAuthenticated) {
    return navigate("/login");
  }
  return <Outlet />;
}

export default ProtectedRoute;
