// This is just a stub code (mock code)'
import clock from "../../assets/charm_clock-alarm.svg"
import Hierarchy from "../../assets/Hierarchy.png"

export default function TestCard({imgTestCard, titleTestCard}: {imgTestCard: string, titleTestCard: string}) {
  return <div className="overflow-hidden max-w-[400px] flex flex-row rounded-[20px] bg-[#fff] border-[#00205C] border-[2px] border-solid">
    <div className="img w-[40%] h-[170px] rounded-s-[20px]">
      <img className="w-full h-full object-cover object-center" src={imgTestCard} alt="" />
    </div>
    <div className="w-[60%] flex flex-col gap-2 px-4 py-3">
      <h3 className="text-xl font-bold text-[#000]">{titleTestCard}</h3>
      <div className="flex flex-row items-center gap-[6px]">
        <img src={clock} alt="" />
        <span>120 minutes</span>
      </div>
      <div className="flex flex-row items-center gap-[6px]">
        <img src={Hierarchy} alt="" />
        <span>7 parts | 200 questions</span>
      </div>
    </div>
  </div>;
}
