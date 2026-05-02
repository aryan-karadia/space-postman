/**
 * ─── LetterPage ────────────────────────────────────────────────
 * Displays a single letter based on the route parameter ID.
 * 
 * FEATURES:
 *   - Fetches letter data using useGetLetter hook
 *   - Displays loading state while fetching
 *   - Renders LetterViewer component to show content
 *   - Handles 404 (not found) and 410 (expired) errors
 *   - Fetches immediately on mount and when ID changes
 */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LetterViewer } from '@/components/LetterViewer';
import { useGetLetter } from '@/hooks/useLetterApi';

export function LetterPage() {
  const { id } = useParams<{ id: string }>();
  const { letter, error, isLoading, refetch } = useGetLetter(id);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8">
      <LetterViewer letter={letter} isLoading={isLoading} error={error} />
    </div>
  );
}
