/**
 * ─── ShareLink Modal ─────────────────────────────────────────────
 * Modal component to display the shareable link after letter creation.
 * Also provides option to compose a new letter.
 */
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ShareLinkProps {
  url: string;
  onClose: () => void;
}

export function ShareLink({ url, onClose }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.getElementById('share-link-input') as HTMLInputElement;
      if (input) {
        input.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <Modal open={!!url} onOpenChange={(open) => !open && onClose()}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Transmission Sent ✦</ModalTitle>
          <ModalDescription>
            Your message has been launched into the galaxy. Share this link to let someone read it.
          </ModalDescription>
        </ModalHeader>
        <div className="flex gap-2">
          <Input id="share-link-input" value={url} readOnly className="flex-1 text-neon-cyan" />
          <Button onClick={handleCopy} variant={copied ? 'outline' : 'default'}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button variant="secondary" asChild><a href="/">New Transmission</a></Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
