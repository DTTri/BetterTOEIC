
type TestsSaved = {
  _id: string;
  created_at: string;
  updated_at: string;
  savedTests: [
    {
      testId: string;
      saved_at: string;
    },
  ];
};

export default TestsSaved;
