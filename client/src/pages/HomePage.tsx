import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const nav = useNavigate();
  const onStart = () => {
    nav("/login");
  };
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            Enhance Your English Skills and Achieve Your TOEIC Goals!
          </h1>
          <p className="text-lg mb-6 animate-slide-up">
            BetterTOEIC offers a comprehensive solution for TOEIC preparation,
            from personalized learning paths to official-standard practice
            tests.
          </p>
          <button
            onClick={onStart}
            className="bg-white text-blue-600 px-6 py-3 rounded font-semibold shadow-lg hover:bg-gray-100 animate-bounce"
          >
            Get Started Now
          </button>
        </div>
      </section>

      <section id="about" className="py-16 px-14 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Who Are We?</h2>
          <p className="text-lg text-gray-700 animate-slide-up">
            BetterTOEIC is a modern TOEIC preparation platform that helps you
            effectively improve your Listening, Reading, Speaking and Writing
            skills. We leverage advanced technology and provide tailored
            learning paths for every level.
          </p>
        </div>
      </section>

      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Do We Offer?
          </h2>
          <div className="w-[42%] flex flex-col mx-auto gap-8 animate-slide-up">
            <div className="p-6 bg-gray-50 shadow rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Real Exam Simulation</h3>
              <p className="text-gray-600">
                Experience authentic TOEIC test environments with timed exams
                and detailed feedback.
              </p>
            </div>
            <div className="p-6 bg-gray-50 shadow rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">
                Personalized Learning Paths
              </h3>
              <p className="text-gray-600">
                Tailored plans to achieve your goals based on your current level
                and objectives.
              </p>
            </div>
            <div className="p-6 bg-gray-50 shadow rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Focused Practice</h3>
              <p className="text-gray-600">
                Practice specific parts of the TOEIC test to strengthen your
                weaknesses.
              </p>
            </div>
            <div className="p-6 bg-gray-50 shadow rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">
                Smart Vocabulary Learning
              </h3>
              <p className="text-gray-600">
                Learn and review vocabulary with themed flashcards and examples.
              </p>
            </div>
            <div className="p-6 bg-gray-50 shadow rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Interactive Forum</h3>
              <p className="text-gray-600">
                Engage with other learners to share experiences, tips, and
                insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-5">
          Ready to Start Your TOEIC Journey?
        </h2>
        <button
          onClick={onStart}
          className="bg-white text-blue-600 px-6 py-3 rounded font-semibold shadow-lg hover:bg-gray-100 animate-bounce"
        >
          Join Now
        </button>
      </section>
    </div>
  );
}
