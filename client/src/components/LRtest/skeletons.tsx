import { Skeleton } from "@mui/material";

export const QuestionComponentSkeleton = () => {
  return (
    <div className="mb-4">
      <Skeleton variant="text" width="60%" height={28} />
      <div className="content flex flex-row w-full gap-[24px] items-center mt-2">
        <div className="img w-[50%]">
          <Skeleton variant="rectangular" width="100%" height={200} />
        </div>
        <div className="flex flex-col gap-2 w-[50%]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex justify-start items-center gap-2">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width="80%" height={24} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <Skeleton variant="rectangular" width="30%" height={36} />
      </div>
    </div>
  );
}