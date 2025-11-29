import React, { createContext, useContext } from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificacaoPlacement = NotificationArgsProps["placement"];

type NotificacaoType = (options: {
  placement?: NotificacaoPlacement;
  message: string;
  description?: string;
  type?: "info" | "success" | "error" | "warning";
}) => void;

const NotificacaoContext = createContext<NotificacaoType | null>(null);

export const NotificacaoProvider = ({ children }: { children: React.ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();

  const notify: NotificacaoType = ({ placement = "topRight", message, description, type = "info" }) => {
    api[type]({
      placement,
      message,
      description,
    });
  };

  return (
    <NotificacaoContext.Provider value={notify}>
      {contextHolder}
      {children}
    </NotificacaoContext.Provider>
  );
};

export const useNotificacao = (): NotificacaoType => {
  const ctx = useContext(NotificacaoContext);
  if (!ctx) throw new Error("useNotificacao deve ser usado dentro de <NotificacaoProvider />");
  return ctx;
};
