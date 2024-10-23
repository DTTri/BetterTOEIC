import { Test } from "@/entities";
import testData from "./test";

const tests: Test[] = new Array(50).fill(null).map((_, index) => ({
  ...testData,
  _id: `${index + 1001}`,
}));
export default tests;
