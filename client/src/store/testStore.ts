import { signify } from "react-signify"
import { Test } from "@/entities"

interface TestStoreConfig {
    testList: Test[];
}

export const testStore = signify<TestStoreConfig>({
    testList: [],
})
