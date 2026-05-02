/**
 * ─── NotFoundPage ──────────────────────────────────────────────
 * 404 page displayed when a letter ID is not found or has expired.
 * 
 * FEATURES:
 *   - Large "404" headline with magenta glitch effect
 *   - "SIGNAL LOST" status message
 *   - Explanatory text about uncharted space
 *   - Button to return to the homepage
 *   - Clean, centered layout
 */
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
      <h2 className="font-display text-8xl font-black text-neon-magenta text-glow-magenta animate-glitch">
        404
      </h2>
      <p className="mt-4 font-display text-xl font-bold tracking-wider text-star-white">
        SIGNAL LOST
      </p>
      <p className="mt-3 max-w-md font-mono text-sm text-dust-gray">
        The coordinates you entered lead to uncharted space. This sector contains no known transmissions.
      </p>
      <div className="mt-8 mb-6 font-mono text-xs text-dust-gray/40">
        ─── ✦ ───
      </div>
      <Button asChild>
        <Link to="/">Return to Base</Link>
      </Button>
    </div>
  );
}
