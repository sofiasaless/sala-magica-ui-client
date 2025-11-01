import type React from "react";
import type { ReactNode } from "react";
import { colors } from "../theme/colors";

type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

export const Container: React.FC<{
  children: ReactNode,
  width?: number | string,
  justifyContent?: JustifyContent,
  alignItems?: AlignItems,
  paddingHorizontal?: number
  paddingVertical?: number,
  backgroundColor?: string,
  flexDirection?: 'column' | 'row',
  gap?: number,
  heigth?: number | string,
  position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed' | undefined
}> =
  ({
    children,
    width = '100%',
    justifyContent,
    alignItems,
    paddingHorizontal = 15,
    paddingVertical = 5,
    backgroundColor = colors.backgroundMain,
    flexDirection = 'row',
    gap = 0,
    heigth = 'auto'
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
          gap: gap,
        }}
      >
        {children}
      </div>
    )
  }