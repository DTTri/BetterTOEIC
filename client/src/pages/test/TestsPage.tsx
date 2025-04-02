import { PageHeader, SearchBar } from "@/components";
import TestCardGallery from "@/components/LRtest/TestCardGallery";
import { Test } from "@/entities";
import { testStore } from "@/store/testStore";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

import * as motion from "motion/react-client";
import LoadingProgress from "@/components/LoadingProgress";

export default function TestsPage() {
  const testList: Test[] = testStore.use((pre) => pre.testList);
  const [value, setValue] = useState(0);
  const [curTests, setCurTests] = useState<Test[]>(testList);
  useEffect(() => {
    setCurTests(testList);
  }, [testList]);
  if (!testList) {
    return <LoadingProgress />;
  }

  const filterTests = (searchText: string) => {
    console.log(searchText);
    setValue(0);
    if (searchText === "" || !searchText) {
      setCurTests(testList);
      return;
    }
    setCurTests(
      testList.filter((test) =>
        test.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event.currentTarget.textContent?.toString() || "");
    setValue(newValue);
    if (newValue === 0) {
      setCurTests(testList);
    } else {
      setCurTests(
        testList.filter((test) =>
          test.title
            .toString()
            .includes(event.currentTarget.textContent?.toString() || "")
        )
      );
    }
  };

  console.log(curTests.length);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.25,
        scale: { type: "spring", visualDuration: 0.4 },
        opacity: { ease: "linear" },
      }}
      className="bg-background flex flex-col gap-4 items-center py-8"
    >
      <PageHeader text="ETS Standard Test Library" />
      <SearchBar onSearch={filterTests} />
      <Tabs
        style={{ maxWidth: "30%" }}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        centered
      >
        <Tab label="All" />
        <Tab label="2024" />
        <Tab label="2023" />
        <Tab label="2022" />
        <Tab label="2021" />
        <Tab label="2020" />
        <Tab label="2019" />
        <Tab label="2018" />
      </Tabs>
      <TestCardGallery tests={curTests}></TestCardGallery>
    </motion.div>
  );
}
