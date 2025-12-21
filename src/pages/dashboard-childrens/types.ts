import type { EncomendaResponseBody, EncomendaStatus } from "../../types/encomenda.type";
import type { JSX } from "react";
import type { Produto } from "../../types/produto.type";

export type ColunaEncomenda = {
  title: string;
  dataIndex: string;
  key: string;
  render?: undefined;
} | {
  title: string;
  dataIndex: string;
  key: string;
  render: (status: EncomendaStatus) => JSX.Element;
} | {
  title: string;
  dataIndex: string;
  key: string;
  render: (date: string) => string;
} | {
  title: string;
  key: string;
  render: (_: unknown, record: EncomendaResponseBody) => JSX.Element;
  dataIndex?: undefined;
}

export type ColunaProduto = {
  title: string;
  dataIndex: string;
  key: string;
  render: (_: unknown, record: Produto) => JSX.Element;
} | {
  title: string;
  dataIndex: string;
  key: string;
  render: (preco: number) => string;
} | {
  title: string;
  dataIndex: string;
  key: string;
  render: (ativo: boolean) => JSX.Element;
} | {
  title: string;
  dataIndex: string;
  key: string;
  render: (categoria_reference: string) => JSX.Element;
} | {
  title: string;
  key: string;
  render: (_: unknown, record: Produto) => JSX.Element;
  dataIndex?: undefined;
}