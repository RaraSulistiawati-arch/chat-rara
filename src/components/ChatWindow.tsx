'use client';

import { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatWindow({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto space-y-4 pr-4 mb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="bg-gradient-to-br from-violet-100 via-fuchsia-100 to-pink-100 dark:from-violet-900/70 dark:via-purple-900/60 dark:to-fuchsia-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner shadow-white/70 dark:shadow-black/10">
              <i className="fas fa-wand-magic-sparkles text-3xl text-violet-600 dark:text-fuchsia-300"></i>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-violet-950 dark:text-white">Selamat datang!</h2>
            <p className="text-violet-800/80 dark:text-violet-200/80 max-w-sm">
              Halo, aku Rara AI Asisten!<br>
              </br>
              Anda bisa bertanya tentang apapun terkait informasi yang ada di dalam konten blog saya!
            </p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 animate-fadeIn ${message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${message.role === 'user'
                ? 'bg-violet-200 text-violet-800 dark:bg-violet-900 dark:text-violet-100'
                : 'bg-gradient-to-br from-violet-500 to-fuchsia-500'
                }`}
            >
              <i
                className={`fas text-xs ${                message.role === 'user' ? 'fa-user' : 'fa-wand-magic-sparkles'
                  }`}
              ></i>
            </div>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.role === 'user'
                ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-tr-none shadow-sm shadow-violet-300/40 dark:shadow-violet-950/30'
                : 'bg-white dark:bg-[#21172f] text-[#291b3b] dark:text-violet-50 rounded-tl-none border border-violet-100 dark:border-violet-900/80 shadow-sm shadow-violet-100/50 dark:shadow-black/10'
                }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {message.role === 'assistant' ? (
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-xl font-bold mt-2 mb-1" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-lg font-bold mt-2 mb-1" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-base font-bold mt-1 mb-1" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside my-0 space-y-0" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside my-0 space-y-0" {...props} />
                      ),
                      li: ({ node, ...props }) => <li className="ml-1 leading-snug [&>p]:mb-0 [&>p]:inline" {...props} />,
                      strong: ({ node, ...props }) => (
                        <strong className="font-bold text-violet-950 dark:text-violet-100" {...props} />
                      ),
                      p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-snug" {...props} />,
                    }}
                  >
                    {message.content
                      // Collapse 3+ newlines to max 2 (prevent huge gaps)
                      .replace(/\n{3,}/g, '\n\n')
                      // Force single newline before any list marker (Markdown, Digit, or Bullet Char) to ensure tight lists
                      .replace(/\n+(?=[-•*] |\d+\.)/g, '\n')}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
              <p
                className={`text-xs mt-2 ${message.role === 'user'
                  ? 'text-violet-100'
                  : 'text-violet-500 dark:text-violet-300'
                  }`}
              >
                {new Date(message.timestamp).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
