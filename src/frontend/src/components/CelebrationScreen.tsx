export default function CelebrationScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <main className="flex flex-col items-center justify-center text-center">
        <div className="animate-zoom-in space-y-8">
          <h1 className="text-4xl font-bold text-rose-700 sm:text-5xl md:text-6xl">
            🎉 Yay! 🎉
          </h1>
          
          <p className="text-2xl font-medium text-rose-600 sm:text-3xl md:text-4xl">
            I knew you'd say yes! 💞
          </p>

          <div className="flex flex-col items-center gap-6 pt-6">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="/assets/generated/couple-silhouette.dim_800x800.png" 
                alt="Romantic couple silhouette"
                className="h-64 w-64 object-cover sm:h-80 sm:w-80 md:h-96 md:w-96"
              />
            </div>

            <p className="text-xl font-medium text-rose-600 sm:text-2xl">
              You've made me the happiest! 💖
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-auto pb-6 text-center text-xs text-rose-500/70 sm:text-sm">
        © 2025 · Built with ❤️ using caffeine.ai
      </footer>
    </div>
  );
}
