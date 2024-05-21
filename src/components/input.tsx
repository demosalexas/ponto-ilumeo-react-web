import { FC, InputHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input: FC<InputProps> = ({
  id,
  label,
  type,
  className,
  ...props
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        className={cn(
          'text-md peer block w-full appearance-none rounded-[4px] bg-[#1E2733] px-6 pt-6 pb-1 text-white text-[21.6px] focus:outline-none focus:ring-0',
          className
        )}
        placeholder=""
        {...props}
      />
      <label
        className="
          text-md
          absolute
          top-4
          left-6
          z-10
          origin-[0]
          -translate-y-3
          scale-75
          transform
          text-white
          duration-150
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3
          peer-focus:scale-75 
        "
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}
