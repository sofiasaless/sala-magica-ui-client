import type { EncomendaResponseBody } from "../types/encomenda.type";

export function getStatusColor(status: EncomendaResponseBody['status']) {
  switch (status) {
    case 'NOVA': return 'blue-inverse';
    case 'EM ANÁLISE': return 'orange';
    case 'EM PRODUÇÃO': return 'purple';
    case 'FINALIZADO': return 'green';
    case 'CANCELADO': return 'red';
    default: return 'default';
  }
};


export function getStatusStep(status: EncomendaResponseBody['status']) {
  switch (status) {
    case 'EM ANÁLISE': return 0;
    case 'EM PRODUÇÃO': return 1;
    case 'FINALIZADO': return 2;
    case 'CANCELADO': return -1;
    case 'NOVA': return -1;
    default: return 0;
  }
};

export function getOrderStatusColor (status: string) {
  switch (status) {
    case 'pending': return 'orange';
    case 'quoted': return 'blue';
    case 'approved': return 'cyan';
    case 'production': return 'purple';
    case 'completed': return 'green';
    default: return 'default';
  }
};

export function getOrderStatusLabel (status: string) {
  switch (status) {
    case 'pending': return 'Aguardando Orçamento';
    case 'quoted': return 'Orçamento Enviado';
    case 'approved': return 'Aprovado';
    case 'production': return 'Em Produção';
    case 'completed': return 'Concluído';
    default: return status;
  }
};

export function getOrderStatusStep (status: string) {
  switch (status) {
    case 'pending': return 0;
    case 'quoted': return 1;
    case 'approved': return 2;
    case 'production': return 3;
    case 'completed': return 4;
    default: return 0;
  }
};