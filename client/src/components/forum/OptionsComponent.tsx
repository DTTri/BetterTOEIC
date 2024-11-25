export default function OptionsComponent() {
    // return (
    //   <div className="absolute z-10 top-10 w-[100px] right-5 bg-[#fffafa] shadow-lg rounded-[15px] transition-transform duration-200 ease-out">
    //     <div className="flex flex-col">
    //       <div className="hover:bg-slate-100 text-sm p-2 cursor-pointer">
    //         Edit
    //       </div>
    //       <div className="hover:bg-slate-100 text-sm p-2 cursor-pointer">
    //         Delete
    //       </div>
    //       <div className="hover:bg-slate-100 text-sm p-2 cursor-pointer">
    //         Update
    //       </div>
    //     </div>
    //   </div>
      
    // );
    return (
        <div className=" absolute top-11 right-[18px] bg-[#fffafa] shadow-lg rounded-[15px] transition-transform duration-200 ease-out">
            <div className="w-[200px] flex flex-col">
                <div className="hover:bg-slate-100 rounded-t-[15px] text-sm p-2 cursor-pointer">Edit</div>
                <div className="hover:bg-slate-100 text-sm p-2 cursor-pointer">Delete</div>
                <div className="hover:bg-slate-100 rounded-b-[15px] text-sm p-2 cursor-pointer">Update</div>
            </div>
        </div>
    )
  }