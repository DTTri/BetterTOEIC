import { signify } from "react-signify"
import { Test } from "@/entities"
import { CompletedTest } from "@/entities/TestHistory";
import TestsSaved from "@/entities/TestSaved";

interface TestStoreConfig {
    testList: Test[];
    testHistory: CompletedTest[] | null;
    testsSaved: TestsSaved[] | null;
}

export const testStore = signify<TestStoreConfig>({
    testList: [],
    testsSaved: [],
    testHistory: [],
})
