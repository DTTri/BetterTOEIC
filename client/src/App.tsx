import { Route, Routes } from "react-router-dom";
import TestsPage from "./pages/test/TestsPage";
import TestDetailsPage from "./pages/test/TestDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TestsPage />} />
      <Route path="/test/:id" element={<TestDetailsPage />} />
    </Routes>
  );
}

export default App;
