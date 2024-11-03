import WordSaved from '@/components/personal/WordSaved'
import React from 'react'
import vocab_data from '@/data/vocab_data_lists'
import LeftBarPersonal from '@/components/personal/LeftBarPersonal'
import { Header, SearchBar } from '@/components'

export default function WordSavedPage() {
  return (
    <div className="">
        <Header />
        <div className="w-full flex flex-row gap-8 items-stretch">
            <LeftBarPersonal />
            <div className="flex flex-col w-full px-12 py-7 gap-5 items-center">
                <SearchBar />
                <div className="w-full flex flex-col gap-10 py-8 px-8 rounded-[15px] bg-[#fff]">
                    {vocab_data[0].vocabs.map((vocab) => (
                    <WordSaved
                        key={vocab._id}
                        vocab={vocab}
                    />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
