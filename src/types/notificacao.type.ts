export type NotificacaoResponseBody = {
  id?: string;
  titulo: string;
  mensagem: string;
  tipo: TipoNotificacao;
  destino: DestinoNotificacao; // quem deve receber
  referencia?: string; // link para o item relacionado (produto, encomenda etc.)
  doc_ref?: { // alguma referencia de documento para puxar e exibir na notificação
    ref: string,
    colecao: string
  }
  url?: string; // redirecionamento web
  lido: boolean;
  dataNotificacao: string;
};

export type DestinoNotificacao =
  | { tipo: "USUARIO"; usuario_ref: string }
  | { tipo: "ADMIN" };

export type TipoNotificacao = "PRODUTO" | "ENCOMENDA" | "SISTEMA" | "ENCOMENDA_RESPOSTA";

