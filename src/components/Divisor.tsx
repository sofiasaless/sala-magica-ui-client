import { Divider, type DividerProps } from 'antd';
import type React from "react";
import type { AppColors } from '../theme/colors';
import { font } from '../theme/font';

export const Divisor: React.FC<{
  props?: DividerProps,
  titulo: string,
  corTitulo?: AppColors | string,
  tamanhoTitulo?: keyof typeof font | number,
  corBorda?: string,
  expessuraFonte?: 200 | 300 | 400 | 500 | 600,
  width?: string | number
}> = ( {props, titulo, corTitulo = 'black', tamanhoTitulo = 'h3', corBorda, expessuraFonte = 500, width = 'auto'} ) => {
  const color = typeof corTitulo === 'string' ? corTitulo : corTitulo.primary;
  const fontSize = typeof tamanhoTitulo === 'number' ? tamanhoTitulo : font[tamanhoTitulo];

  return (
    <Divider
      {...props}
      style={{
        width: width,
        color: color,
        fontSize: fontSize,
        borderColor: corBorda,
        fontWeight: expessuraFonte
      }}
    >{titulo}</Divider>
  )
}
