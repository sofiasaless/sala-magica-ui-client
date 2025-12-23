export function formatarPadraoBrasil(telefone?: string): string | null {
  if (!telefone) return null;

  // remove tudo que não for número
  const digits = telefone.replace(/\D/g, '');

  // celular BR: DDD (2) + 9 + número (8)
  if (digits.length !== 11) return null;

  return `+55${digits}`;
}

export function formatarTelefoneFirebase(phone?: string): string | null {
  if (!phone) return null;

  // remove tudo que não for número
  const digits = phone.replace(/\D/g, '');

  // esperado: 55 + DDD (2) + 9 + número (8) = 13 dígitos
  if (digits.length !== 13 || !digits.startsWith('55')) {
    return null;
  }

  const ddd = digits.substring(2, 4);
  const firstPart = digits.substring(4, 9);
  const secondPart = digits.substring(9);

  return `(${ddd}) ${firstPart}-${secondPart}`;
}
