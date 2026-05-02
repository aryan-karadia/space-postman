
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-nebula-gray/30 bg-void-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <p className="font-mono text-xs text-dust-gray">
          &copy; {new Date().getFullYear()} Space Postman &mdash; A long time ago in a galaxy far, far away...
        </p>
        <p className="font-mono text-[10px] text-dust-gray/60">
          Letters self-destruct in 30 days
        </p>
      </div>
    </footer>
  );
}
