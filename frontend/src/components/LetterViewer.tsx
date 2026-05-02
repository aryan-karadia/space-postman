/**
 * ─── LetterViewer ────────────────────────────────────────────────
 * Read-only display of a letter fetched by ID.
 * Shows sender, recipient, subject, body, timestamps.
 * Handles loading and error states gracefully.
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export interface Letter {
  id: string;
  sender?: string;
  recipient?: string;
  subject: string;
  body: string;
  createdAt: string;
  expiresAt: string;
}

export interface LetterError {
  title?: string;
  message?: string;
}

interface LetterViewerProps {
  letter: Letter | null;
  isLoading: boolean;
  error: LetterError | null;
}

export function LetterViewer({ letter, isLoading, error }: LetterViewerProps) {
  if (isLoading) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
          <p className="mt-4 font-mono text-sm text-dust-gray animate-neon-pulse">
            Decrypting transmission...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto w-full max-w-2xl border-neon-magenta/30">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <p className="font-display text-4xl text-neon-magenta animate-glitch">✦</p>
          <p className="mt-4 font-display text-lg font-bold text-neon-magenta text-glow-magenta">
            {error.title || 'Transmission Lost'}
          </p>
          <p className="mt-2 font-mono text-sm text-dust-gray">
            {error.message || 'This transmission could not be located.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!letter) return null;

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block h-2 w-2 rounded-full bg-neon-cyan animate-neon-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-dust-gray">
            Incoming Transmission
          </span>
        </div>
        <CardTitle>{letter.subject}</CardTitle>
        <CardDescription>
          From: {letter.sender || 'Anonymous'} &mdash; To: {letter.recipient || 'The Galaxy'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-cyber border border-nebula-gray/50 bg-void-black/50 p-6">
          <p className="font-mono text-sm leading-relaxed text-star-white whitespace-pre-wrap">
            {letter.body}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-dust-gray/60">
          <span>Sent: {letter.createdAt}</span>
          <span>Expires: {letter.expiresAt}</span>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline" size="sm" asChild>
          <a href="/">Compose Your Own</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
