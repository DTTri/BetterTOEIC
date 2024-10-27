import { Vocab } from '@/entities'
import React from 'react'

export default function WordSaved({vocab} : {vocab: Vocab}) {
  return (
    <div className='max-w-[880px] w-full px-8 py-3 bg-[#D9E7FF] rounded-[30px] flex flex-col gap-[10px]'>
        <div className="flex flex-row items-center gap-4">
            <p className='text-lg font-bold text-[#000] '>{vocab.word}</p>
            <hr className='w-[1px] h-6 bg-black'/>
            <p className='text-base font-normal text-[rgba(32, 34, 36, 0.5)] '>{vocab.ipa_spelling}</p>
            <hr className='w-[1px] h-6 bg-black'/>
            <p className='text-base font-normal text-[#202224] '>{vocab.meaing_vn}</p>
        </div>
        <div className="w-full">
            <p className='text-base font-normal text-[#202224] text-wrap'>{vocab.meaning_en}</p>
        </div>
        <div className="w-full">
            <p className='text-base font-normal text-[rgba(32, 34, 36, 0.80)] text-wrap'>{vocab.ex_sentence}</p>
        </div>
    </div>
  )
}
