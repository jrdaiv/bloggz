import { Button } from '@heroui/react';

export default function LandingPage() {
  console.log('LandingPage rendered'); // Debug log
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
      <div className="text-center space-y-8 bg-transparent backdrop-blur-lg p-8 sm:p-10 rounded-xl border border-white/30 max-w-xl w-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
          Welcome to Bloggz
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white/90 drop-shadow-md">
          Share your stories, connect with others, and explore a world of ideas.
        </p>
        <Button
          onClick={() => window.location.href = '/auth'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg drop-shadow-md"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}