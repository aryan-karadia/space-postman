import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { ShareLink } from '@/components/ShareLink';
import { CreateLetterRequest, CreateLetterResponse, ApiError } from '@/types/api';
import { cn } from '@/lib/utils';

export function ComposerPage() {
  const [content, setContent] = useState('');
  const [shareData, setShareData] = useState<CreateLetterResponse | null>(null);

  const mutation = useMutation<CreateLetterResponse, ApiError, CreateLetterRequest>({
    mutationFn: async (data) => {
      // TODO: remove mock
      // const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/letters`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // if (!res.ok) throw await res.json();
      // return res.json();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 'mock-id-123',
            url: `${window.location.origin}/letter/mock-id-123`,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          });
        }, 1200);
      });
    },
    onSuccess: (data) => {
      setShareData(data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    mutation.mutate({ content });
  };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center p-4 sm:p-8 w-full text-white">
      {/* Holographic Projector Beam */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0, 245, 255, 0.1) 0%, rgba(255, 0, 255, 0.02) 50%, transparent 100%)',
          clipPath: 'polygon(15% 100%, 85% 100%, 100% 0, 0 0)',
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.3, 0.6, 0.2], scaleY: [0.9, 1.05, 1, 1.02, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{ transformOrigin: "bottom" }}
      />
      <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[50%] max-w-md h-[20px] bg-neon-cyan/40 blur-[20px] rounded-[100%] z-0" />

      {/* Floating Glitch Data */}
      <motion.div 
        className="absolute left-[5%] top-[20%] hidden lg:block text-neon-magenta font-mono text-xs opacity-50 select-none pointer-events-none glitch-text"
        animate={{ opacity: [0, 1, 0, 0, 0.8, 0], x: [-10, 5, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
      >
        ERR://0x4F_OVERRIDE
      </motion.div>
      <motion.div 
        className="absolute right-[5%] top-[70%] hidden lg:block text-neon-cyan font-mono text-[10px] opacity-40 select-none pointer-events-none"
        animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        [UPLINK_ESTABLISHED]
      </motion.div>
      <motion.div 
        className="absolute right-[15%] top-[15%] hidden lg:block text-neon-amber font-mono text-[8px] opacity-30 select-none pointer-events-none"
        animate={{ opacity: [0, 0.5, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
      >
        SYS_WARN: UNREGISTERED_DEVICE
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        className="z-10 w-full max-w-3xl relative"
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      >
        <div className="mb-8 text-center sm:text-left">
          <motion.p 
            className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan mb-3 opacity-90 flex items-center justify-center sm:justify-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
            secure channel // open
          </motion.p>
          <motion.h2 
            className="font-display text-4xl sm:text-5xl font-bold tracking-wider text-white drop-shadow-[0_0_15px_rgba(0,245,255,0.4)]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Send a <span className="text-neon-cyan relative inline-block glitch-text">Transmission</span>
          </motion.h2>
        </div>

        <Card className="border-neon-cyan/20 bg-void-900/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,245,255,0.05)] rounded-sm relative overflow-hidden">
          {/* Subtle Scanline Overlay on Card */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent animate-scanline pointer-events-none" />
          
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-neon-cyan font-display uppercase tracking-widest text-lg">
              Com-Link Interface
            </CardTitle>
            <CardDescription className="font-mono text-gray-400 text-sm mt-1">
              Draft your anonymous message. Encrypted payloads self-destruct after 30 standard rotations.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label htmlFor="content" className="font-mono text-xs text-neon-magenta uppercase tracking-widest flex items-center gap-2">
                    <span className="block w-1 h-3 bg-neon-magenta" />
                    Payload Data
                  </label>
                  <span className={cn(
                    "font-mono text-xs transition-colors",
                    content.length > 4900 ? "text-neon-amber animate-pulse" : "text-gray-500"
                  )}>
                    {content.length}/5000
                  </span>
                </div>
                
                <div className="relative group">
                  {/* Glowing border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-b from-neon-cyan/20 to-neon-magenta/20 rounded-sm opacity-0 group-focus-within:opacity-100 transition duration-500 blur-sm pointer-events-none" />
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value.slice(0, 5000))}
                    placeholder="// Begin transmission sequence..."
                    className="relative min-h-[300px] font-mono text-sm leading-relaxed bg-void-950/80 border-void-700/50 focus:border-neon-magenta focus:ring-1 focus:ring-neon-magenta/50 text-gray-100 resize-none rounded-none placeholder:text-gray-600 transition-all shadow-inner"
                    required
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 border-t border-white/5 pt-4 bg-black/20">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setContent('')}
                className="w-full sm:w-auto font-mono text-gray-400 hover:text-white hover:bg-white/5 rounded-none uppercase text-xs tracking-widest"
              >
                Clear Buffer
              </Button>
              <Button 
                type="submit" 
                disabled={!content.trim() || mutation.isPending}
                className={cn(
                  "w-full sm:w-auto font-display tracking-widest uppercase rounded-none transition-all duration-300",
                  "bg-neon-cyan text-void-950 hover:bg-white hover:shadow-[0_0_20px_rgba(0,245,255,0.8)]",
                  mutation.isPending && "opacity-80 cursor-wait bg-neon-cyan/80 animate-pulse"
                )}
              >
                {mutation.isPending ? 'Transmitting...' : 'Initiate Upload'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>

      {/* Render the ShareLink modal if a letter is successfully submitted */}
      <AnimatePresence>
        {shareData && (
          <ShareLink 
            url={shareData.url} 
            onClose={() => setShareData(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
