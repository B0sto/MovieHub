import React from 'react'
import { PaginationBtnType } from '@/types/types'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'


const PaginationBtn = ({icon, onClick}: PaginationBtnType) => {
  const { isDarkMode } = useTheme();

  return (
    <button className={`${isDarkMode ? 'pagination_btn' : 'pagination_btn_light'}`} onClick={onClick}>
        <Image src={`/${icon}`} alt='icon' width={32} height={32}/>
    </button>
  )
}

export default PaginationBtn