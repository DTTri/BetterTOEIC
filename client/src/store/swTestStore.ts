import { CompletedSWTest, SWTest } from "@/entities";
import { signify } from "react-signify";

interface SWTestStoreConfig {
  swTestList: SWTest[];
  swTestHistory: CompletedSWTest[];
}

export const swTestStore = signify<SWTestStoreConfig>({
  swTestList: [],
  swTestHistory: [],
});
