import * as motion from "motion/react-client";
import RemoveIcon from '@mui/icons-material/Remove';
import Message from "@/entities/Message";

export default function Conversation(
    messages: Message[]
) {
  return (
    <motion.div
      initial={{ x: 150, y: 200, scale: 0}}
      animate={{ scale: 1 }}
      transition={{ type: "spring" }}
      whileInView={{ x: -85, y: 0, scale: 1 }}
      className="fixed z-[2000] right-0 bottom-6 w-[450px] h-[550px] bg-[#fff] rounded-[40px] shadow-md shadow-slate-400"
    >
        <div className="title flex flex-row items-center py-4 px-6  border-b-[1px] border-b-slate-200">
            <RemoveIcon className="hover:shadow-md hover:shadow-slate-300 rounded-full" style={{width: 24, height: 24, color: "#000000"}} fontSize="large"/>
            <h3 className="ml-5 font-extrabold text-3xl text-[#000000]">Chat bot</h3>
        </div>
        <div className="conversation">

        </div>
    </motion.div>
  );
}
