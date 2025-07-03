export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 ">
      <main className="flex flex-col items-center justify-center flex-1 w-full py-24">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-center mb-6 select-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">Learningo</span>
        </h1>
        <p className="text-xl sm:text-2xl text-center max-w-2xl mb-10 text-gray-700 dark:text-gray-200">
          The fastest way to revise for your next test. Instantly generate last-minute revision courses and quizzes on any topic. Cram smart, not hard—with AI-powered quick review.
        </p>
        <a href="/sign-in">
          <button className="text-2xl rounded-md px-8 py-4 bg-gradient-to-r from-[#ede9fe] to-[#c7d2fe] hover:from-[#c7d2fe] hover:to-[#a5b4fc] border border-gray-200 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-200/60 flex items-center gap-2 font-semibold">
            <span className="text-black font-bold">Start Revising</span>
          </button>
        </a>
      </main>
      <footer className="w-full text-center text-gray-500 py-4">
        <p className="text-sm">Crafted with ❤️ by Anay Paraswani</p>
      </footer>
    </div>
  );
}
