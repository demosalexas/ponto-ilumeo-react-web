import { FC, HTMLAttributes, LiHTMLAttributes } from 'react'

export interface ListProps extends HTMLAttributes<HTMLUListElement> {}

export const List: FC<ListProps> = ({ children }) => {
  return <ul>{children}</ul>
}

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  hoursWorked: string
  dateWorked: string
}

export const ListItem: FC<ListItemProps> = ({ dateWorked, hoursWorked }) => {
  return (
    <li className="h-[41px] bg-[#D9D9D90D] rounded-[4px] flex flex-row justify-between items-center mb-[7px]">
      <time className="ml-[13px] text-[#CFCFCF] text-[12px] font-medium">
        {dateWorked}
      </time>
      <span className="text-white text-[12px] font-bold mr-[22px]">
        {hoursWorked}
      </span>
    </li>
  )
}
