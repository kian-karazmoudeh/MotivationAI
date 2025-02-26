import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Center, Spinner } from "@chakra-ui/react";

/**
 * Protected Route component that redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Center>
    );
  }

  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
