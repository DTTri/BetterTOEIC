// <span className="text-center ml-1">10 - 215</span>
//       <span className="text-center">216 - 430</span>
//       <span className="text-center">431 - 645</span>
//       <span className="text-center">646 - 860</span>
//       <span className="text-center">861 - 990</span>
const ClassifyTestScore = (score: number) => {
  if (score >= 10 && score <= 215) {
    return 1;
  } else if (score >= 216 && score <= 430) {
    return 2;
  } else if (score >= 431 && score <= 645) {
    return 3;
  } else if (score >= 646 && score <= 860) {
    return 4;
  } else if (score >= 861 && score <= 990) {
    return 5;
  } else {
    return 0;
  }
};
export default ClassifyTestScore;
