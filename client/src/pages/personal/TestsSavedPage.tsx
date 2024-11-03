import { Header, SearchBar, TestCard } from "@/components";
import LeftBarPersonal from "@/components/personal/LeftBarPersonal";
import tests from "@/data/testList";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TestsSavedPage() {
  const nav = useNavigate();
  return (
    <div className="">
        <Header />
        <div className="w-full flex flex-row gap-8 items-stretch">
            <LeftBarPersonal />
            <div className="flex flex-col w-full px-12 py-7 gap-5 items-center">
                <SearchBar />
                <div className="w-full grid lg:grid-cols-2 gap-10 py-8 px-8 rounded-[15px] bg-[#fff]">
                    {tests.map((test) => (
                    <TestCard
                        key={test._id}
                        test={test}
                        onClick={() => nav(`/test/${test._id}`)}
                    />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
