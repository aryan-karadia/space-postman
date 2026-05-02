/**
 * ─── Composer ────────────────────────────────────────────────────
 * Letter writing form — the core feature.
 * Collects sender, recipient, subject, and body.
 * On submit, simulates a POST request (for Phase 1) and shows ShareLink modal.
 */
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ShareLink } from './ShareLink';

const LIMITS = {
  sender: 50,
  recipient: 50,
  subject: 100,
  body: 5000,
} as const;

export function Composer() {
  const [form, setForm] = useState({
    sender: '',
    recipient: '',
    subject: '',
    body: '',
  });
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof LIMITS) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= LIMITS[field]) {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.body.trim()) return;

    setIsSubmitting(true);
    try {
      const fakeId = Math.random().toString(36).substring(2, 14);
      setShareUrl(`${window.location.origin}/letter/${fakeId}`);
    } catch {
      console.error('Failed to send transmission');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = form.subject.trim() && form.body.trim() && !isSubmitting;

  return (
    <>
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>New Transmission</CardTitle>
          <CardDescription>
            Compose your message. All transmissions are anonymous and self-destruct after 30 standard rotations.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="composer-sender" className="font-display text-xs font-semibold uppercase tracking-wider text-dust-gray">
                From <span className="text-dust-gray/50">(optional)</span>
              </label>
              <Input id="composer-sender" placeholder="Anonymous" value={form.sender} onChange={handleChange('sender')} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="composer-recipient" className="font-display text-xs font-semibold uppercase tracking-wider text-dust-gray">
                To <span className="text-dust-gray/50">(optional)</span>
              </label>
              <Input id="composer-recipient" placeholder="The Galaxy" value={form.recipient} onChange={handleChange('recipient')} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="composer-subject" className="font-display text-xs font-semibold uppercase tracking-wider text-dust-gray">
                Subject <span className="text-neon-magenta">*</span>
              </label>
              <Input id="composer-subject" placeholder="Enter transmission subject..." value={form.subject} onChange={handleChange('subject')} required />
              <p className="text-right font-mono text-[10px] text-dust-gray/60">{form.subject.length}/{LIMITS.subject}</p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="composer-body" className="font-display text-xs font-semibold uppercase tracking-wider text-dust-gray">
                Message <span className="text-neon-magenta">*</span>
              </label>
              <Textarea id="composer-body" placeholder="Begin your transmission..." value={form.body} onChange={handleChange('body')} required rows={8} />
              <p className="text-right font-mono text-[10px] text-dust-gray/60">{form.body.length}/{LIMITS.body}</p>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setForm({ sender: '', recipient: '', subject: '', body: '' })}>Clear</Button>
            <Button type="submit" disabled={!canSubmit}>{isSubmitting ? 'Transmitting...' : 'Send Transmission'}</Button>
          </CardFooter>
        </form>
      </Card>
      {shareUrl && <ShareLink url={shareUrl} onClose={() => setShareUrl(null)} />}
    </>
  );
}
