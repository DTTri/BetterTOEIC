import { Skeleton } from "@mui/material";

export const PostComponentSkeleton = () => {
  return (
    <div className="relative shadow-md max-w-[750px] py-6 px-7 w-full bg-[#fff] rounded-[15px]">
      <div className="first w-full flex flex-row items-center mb-4">
        <Skeleton animation="wave" variant="circular" width={45} height={45} />
        <div className="flex-1 flex flex-col ml-2">
          <Skeleton animation="wave" variant="text" width="60%" height={28} />
          <Skeleton animation="wave" variant="text" width="40%" height={20} />
        </div>
      </div>
      <div className="content mb-4">
        <Skeleton animation="wave" variant="text" width="100%" height={24} />
        <div className="images w-full overflow-auto flex flex-row gap-3 mt-2">
          <Skeleton animation="wave" variant="rectangular" width={120} height={120} />
          <Skeleton animation="wave" variant="rectangular" width={120} height={120} />
          <Skeleton animation="wave" variant="rectangular" width={120} height={120} />
        </div>
      </div>
      <div className="react flex flex-row items-center gap-6">
        <div className="flex flex-row items-center gap-1">
          <Skeleton animation="wave" variant="circular" width={22} height={20} />
          <Skeleton animation="wave" variant="text" width={30} height={20} />
        </div>
        <div className="flex flex-row items-center gap-1">
          <Skeleton animation="wave" variant="circular" width={20} height={18} />
          <Skeleton animation="wave" variant="text" width={30} height={20} />
        </div>
      </div>
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className="shadow-md max-w-[750px] w-full bg-[#fff] py-6 px-7 rounded-[15px]">
      <div className="relative first w-full flex flex-row items-center mb-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 flex flex-col ml-2">
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={16} />
        </div>
        <Skeleton variant="circular" width={24} height={24} />
      </div>
      <div className="content mb-3 ml-[5px]">
        <Skeleton variant="text" width="100%" height={24} />
      </div>
      <div className="react flex flex-row items-center gap-6 ml-1">
        <Skeleton variant="circular" width={20} height={18} />
        <Skeleton variant="text" width={30} height={20} />
      </div>
    </div>
  );
};
