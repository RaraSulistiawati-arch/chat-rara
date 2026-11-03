'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading || isComposing) return;

    const message = input.trim();
    setInput('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Blur textarea to hide mobile keyboard
    if (textareaRef.current) {
      textareaRef.current.blur();
    }

    await onSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tombol Enter sekarang hanya berfungsi untuk baris baru
    // Fitur kirim via Enter telah dimatikan sesuai permintaan user
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        120
      ) + 'px';
    }
  }, [input]);



  return (
    <div className="border-t border-violet-200/80 dark:border-violet-900/70 pt-4">
      <div className="relative flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="Tanya apa aja, asal jangan tanya kapan kiamat"
          disabled={isLoading}
          rows={1}
          className="flex-1 p-3 text-sm md:text-base rounded-xl border border-violet-200 dark:border-violet-800 bg-white/90 dark:bg-[#21172f] text-violet-950 dark:text-violet-50 placeholder-violet-400 dark:placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-fuchsia-500 resize-none max-h-[120px] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-violet-100/60 dark:shadow-black/10"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="px-4 py-3 bg-gradient-to-br from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 dark:from-violet-500 dark:to-fuchsia-500 dark:hover:from-violet-600 dark:hover:to-fuchsia-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md shadow-violet-300/40 dark:shadow-violet-950/40"
        >
          {isLoading ? (
            <i className="fas fa-spinner animate-spin"></i>
          ) : (
            <i className="fas fa-paper-plane"></i>
          )}
        </button>
      </div>
      <div className="text-xs text-violet-500 dark:text-violet-400 mt-6 text-center space-y-1">
        <p>“Rara AI Asisten adalah AI, jadi jawabannya bisa saja kurang tepat.”</p>
        <p>© 2026 Hak Cipta Dilindungi.</p>
        <p>
          Developed by{' '}
          <a
            href="https://adi-muhamad.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-700 dark:text-fuchsia-300 hover:text-violet-900 dark:hover:text-fuchsia-200 hover:underline transition-colors"
          >
            adi-muhamad.my.id
          </a>
        </p>
      </div>
    </div>
  );
}
