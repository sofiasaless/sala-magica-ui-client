import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface AdminGuardProps {
  children: ReactNode;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const { isAutenticado, isAdmin, loading } = useAuth();

  if (!isAutenticado && !loading) {
    return <Navigate to="/entrar" replace />;
  }

  if (!isAdmin && !loading) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <Spin size="large" indicator={<LoadingOutlined spin />} />

  return <>{children}</>;
};
