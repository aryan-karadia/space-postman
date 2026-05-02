/**
 * ─── App Component ─────────────────────────────────────────────
 * Main application entry point with routing configuration.
 * 
 * FEATURES:
 *   - Browser router for navigation
 *   - Layout component providing consistent shell
 *   - Routes for:
 *     - Home page (/)
 *     - Letter display page (/letter/:id)
 *     - 404 Not Found page (*)
 *   - Clean, organized routing structure
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ComposerPage } from '@/pages/ComposerPage';
import { LetterPage } from '@/pages/LetterPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ComposerPage />} />
          <Route path="/letter/:id" element={<LetterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
