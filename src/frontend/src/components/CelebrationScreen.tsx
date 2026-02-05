export default function CelebrationScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <main className="flex flex-col items-center justify-center text-center">
        <div className="animate-zoom-in space-y-8">
          <h1 className="text-5xl font-bold text-rose-700 sm:text-6xl md:text-7xl lg:text-8xl">
            🎉 Yay! 🎉
          </h1>
          
          <p className="text-2xl font-medium text-rose-600 sm:text-3xl md:text-4xl">
            I knew you'd say yes! 💞
          </p>

          <div className="flex flex-col items-center space-y-4 pt-6">
            <div className="overflow-hidden rounded-full border-4 border-rose-300 shadow-2xl shadow-pink-500/30">
              <img 
                src="/assets/generated/romantic-silhouette-placeholder.dim_300x300.png" 
                alt="Romantic silhouette"
                className="h-48 w-48 object-cover sm:h-64 sm:w-64"
              />
            </div>
            
            <p className="text-xl font-medium text-rose-600 sm:text-2xl">
              You've made me the happiest! 💖
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-auto pb-6 text-center text-sm text-rose-500/70">
        © 2025 · Built with ❤️ using caffeine.ai
      </footer>
    </div>
  );
}
