/**
 * ─── Layout Component ──────────────────────────────────────────
 * Main layout wrapper providing consistent styling and navigation.
 * 
 * FEATURES:
 *   - Full-screen dark space background with stars
 *   - Scanline overlay for retro aesthetic
 *   - Header with navigation links
 *   - Main content area (renders Outlet)
 *   - Footer with metadata and links
 *   - Responsive design (max-w-5xl on desktop, full-width on mobile)
 */
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-void-950 star-field">
      <div className="scanline-overlay" />
      <Header />
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
