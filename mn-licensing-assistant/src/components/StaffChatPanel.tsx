import { useState, useRef, useEffect } from 'react';
import type { InteractionLog } from '../types';
import { findCannedResponse, suggestedQuestions } from '../data/mockCannedResponses';
import { makeLogId } from '../data/mockLogs';

interface Message {
  id: string;
  role: 'staff' | 'assistant';
  text: string;
  sourceReference?: string;
}

interface StaffChatPanelProps {
  onLogEntry: (entry: InteractionLog) => void;
}

export default function StaffChatPanel({ onLogEntry }: StaffChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function submit(query: string) {
    const q = query.trim();
    if (!q) return;

    const staffMsg: Message = {
      id: makeLogId(),
      role: 'staff',
      text: q,
    };

    const response = findCannedResponse(q);
    const assistantMsg: Message = {
      id: makeLogId(),
      role: 'assistant',
      text: response.answer,
      sourceReference: response.sourceReference || undefined,
    };

    setMessages((prev) => [...prev, staffMsg, assistantMsg]);
    setInput('');

    onLogEntry({
      id: makeLogId(),
      timestamp: new Date().toISOString(),
      type: 'chat',
      staffInputSummary: q.slice(0, 80),
      assistantSuggestionSummary: response.id,
      accepted: null,
    });

    // Return focus to input after chip click
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  }

  return (
    <div className="panel">
      <h2 className="panel-title">Staff Assistant Chat</h2>

      {/* Suggested question chips */}
      <div
        role="group"
        aria-label="Suggested questions"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--sp-xs)',
          marginBottom: 'var(--sp-md)',
        }}
      >
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => submit(q)}
            style={{
              background: 'var(--mn-blue-light)',
              color: 'var(--mn-blue)',
              border: '1px solid var(--accent-bluegray)',
              borderRadius: 12,
              padding: '4px 12px',
              fontSize: 'var(--font-size-sm)',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              lineHeight: 1.4,
              textAlign: 'left',
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message list */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Chat conversation"
        style={{
          minHeight: 120,
          maxHeight: 320,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-sm)',
          marginBottom: 'var(--sp-md)',
          padding: messages.length ? 'var(--sp-sm)' : 0,
          background: messages.length ? 'var(--surface-alt)' : 'transparent',
          borderRadius: 'var(--radius)',
          border: messages.length ? '1px solid var(--border)' : 'none',
        }}
      >
        {messages.length === 0 && (
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', fontStyle: 'italic' }}>
            Ask a question or select a suggestion above.
          </p>
        )}
        {messages.map((msg) =>
          msg.role === 'staff' ? (
            <div
              key={msg.id}
              style={{
                alignSelf: 'flex-end',
                background: 'var(--mn-blue)',
                color: 'var(--text-on-blue)',
                borderRadius: '12px 12px 2px 12px',
                padding: 'var(--sp-sm) var(--sp-md)',
                maxWidth: '85%',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              <span className="sr-only">You: </span>
              {msg.text}
            </div>
          ) : (
            <div
              key={msg.id}
              style={{
                alignSelf: 'flex-start',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px 12px 12px 2px',
                padding: 'var(--sp-sm) var(--sp-md)',
                maxWidth: '85%',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              <span className="sr-only">Assistant: </span>
              <p style={{ margin: 0 }}>{msg.text}</p>
              {msg.sourceReference && (
                <p style={{
                  margin: 'var(--sp-xs) 0 0',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                }}>
                  Source: {msg.sourceReference}
                </p>
              )}
            </div>
          )
        )}
        <div ref={bottomRef} aria-hidden="true" />
      </div>

      {/* Input row */}
      <div style={{ display: 'flex', gap: 'var(--sp-sm)' }}>
        <label htmlFor="chatInput" className="sr-only">Type your question</label>
        <input
          ref={inputRef}
          id="chatInput"
          type="text"
          className="form-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a question and press Enter…"
          aria-label="Type your question"
          style={{ flexGrow: 1 }}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => submit(input)}
          disabled={!input.trim()}
          aria-label="Send question"
          style={{ flexShrink: 0 }}
        >
          Send
        </button>
      </div>

      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
    </div>
  );
}
