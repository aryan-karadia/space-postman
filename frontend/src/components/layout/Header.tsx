/**
 * ─── Header Component ──────────────────────────────────────────
 * Top navigation bar with site title and status indicator.
 * 
 * FEATURES:
 *   - Brand logo (star icon + text)
 *   - Animated glitch effect on hover
 *   - System status indicator ( canlı/offline)
 *   - Responsive layout
 */
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="relative z-10 border-b border-nebula-gray/50 bg-void-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-cyber border border-neon-cyan/50 shadow-neon-cyan transition-all group-hover:shadow-[0_0_15px_#00F0FF]">
            <span className="text-lg" role="img" aria-label="space postman">
              ✦
            </span>
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-widest text-neon-cyan text-glow-cyan transition-all group-hover:animate-glitch">
              SPACE POSTMAN
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dust-gray">
              Galactic Transmissions
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <span className="font-mono text-xs text-dust-gray">
            <span className="text-neon-cyan">●</span> SYSTEM ONLINE
          </span>
        </nav>
      </div>
    </header>
  );
}
