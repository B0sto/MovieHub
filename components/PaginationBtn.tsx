import React from 'react'
import { PaginationBtnType } from '@/types/types'
import Image from 'next/image'

const PaginationBtn = ({icon, onClick}: PaginationBtnType) => {
  return (
    <button className='pagination_btn' onClick={onClick}>
        <Image src={`/${icon}`} alt='icon' width={32} height={32}/>
    </button>
  )
}

export default PaginationBtn