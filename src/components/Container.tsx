import type React from "react";
import type { ReactNode } from "react";
import { colors } from "../theme/colors";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

export const Container: React.FC<{
  children: ReactNode,
  width?: number | string,
  justifyContent?: JustifyContent,
  alignItems?: AlignItems,
  paddingHorizontal?: number
  paddingVertical?: number,
  paddingTop?: number,
  backgroundColor?: string,
  flexDirection?: 'column' | 'row',
  gap?: number,
  heigth?: number | string,
  position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed' | undefined,
  carregando?: boolean
}> =
  ({
    children,
    width = '100%',
    justifyContent,
    alignItems,
    paddingHorizontal = 15,
    paddingVertical = 5,
    paddingTop,
    backgroundColor = colors.backgroundMain,
    flexDirection = 'row',
    gap = 0,
    heigth = 'auto',
    carregando = false,
  }) => {

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: flexDirection,
          backgroundColor: backgroundColor,
          width: width,
          height: heigth,
          justifyContent: justifyContent,
          alignItems: alignItems,
          paddingInline: `${paddingHorizontal}%`,
          paddingBlock: `${paddingVertical}rem`,
          paddingTop: `${paddingTop}rem`,
          gap: gap,
        }}
      >
        {(carregando) ?
          <Spin indicator={<LoadingOutlined spin />} size="large" />
          :
          children
        }
      </div>
    )
  }