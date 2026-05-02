/**
 * ─── HomePage ────────────────────────────────────────────────────
 * Landing page component displayed when no letter ID is in the URL.
 * 
 * FEATURES:
 *   - Hero section with compelling headline
 *   - Subheadline explaining the service
 *   - Call-to-action: "Write a letter" (navigates to /)
 *   - Clean, centered layout
 */
import { Composer } from '@/components/Composer';

export function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8">
      <div className="mb-8 text-center animate-fade-in-up">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-dust-gray mb-2">
          // encrypted channel open
        </p>
        <h2 className="font-display text-3xl font-bold tracking-wide text-star-white md:text-4xl">
          Send a <span className="text-neon-cyan text-glow-cyan">Transmission</span>
        </h2>
        <p className="mt-3 font-mono text-sm text-dust-gray max-w-md mx-auto">
          Write an anonymous letter. Get a unique link. Share it with the galaxy. No login. No tracking. Just words across the stars.
        </p>
      </div>
      <Composer />
    </div>
  );
}
