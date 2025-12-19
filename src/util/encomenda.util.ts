import type { EncomendaResponseBody } from "../types/encomenda.type";

export function getStatusColor (status: EncomendaResponseBody['status']) {
  switch (status) {
    case 'EM ANÁLISE': return 'orange';
    case 'EM PRODUÇÃO': return 'purple';
    case 'FINALIZADO': return 'green';
    case 'CANCELADO': return 'red';
    default: return 'default';
  }
};


export function getStatusStep (status: EncomendaResponseBody['status']) {
  switch (status) {
    case 'EM ANÁLISE': return 0;
    case 'EM PRODUÇÃO': return 1;
    case 'FINALIZADO': return 2;
    case 'CANCELADO': return -1;
    default: return 0;
  }
};