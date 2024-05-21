import { ButtonHTMLAttributes, FC } from 'react'

import { cn } from '../utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        'lg:w-[365px] w-full h-[47px] bg-[#FE8A00] border-radius-[4px] rounded-[4px] text-[#1E2733] font-bold',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
