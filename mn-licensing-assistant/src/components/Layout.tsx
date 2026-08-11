import type { ReactNode } from 'react';

interface LayoutProps {
  leftColumn: ReactNode;
  rightColumn: ReactNode;
}

export default function Layout({ leftColumn, rightColumn }: LayoutProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header
        role="banner"
        style={{
          background: 'var(--mn-blue)',
          color: 'var(--text-on-blue)',
          padding: 'var(--sp-md) var(--sp-xl)',
          borderBottom: '4px solid var(--mn-green)',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-md)' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>
              MN Licensing Assistant — Intake &amp; Triage
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: 'var(--font-size-sm)', opacity: 0.85 }}>
              Child Care &amp; Adult Day Care Licensing &nbsp;·&nbsp; Phase 1 Prototype &nbsp;·&nbsp; Internal Staff Only
            </p>
          </div>
          <a
            href="/prototype-overview.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--text-on-blue)',
              opacity: 0.6,
              fontSize: 'var(--font-size-sm)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.3)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Prototype Overview
          </a>
        </div>
      </header>

      <main
        id="main-content"
        role="main"
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: 'var(--sp-xl)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--sp-xl)',
          alignItems: 'start',
        }}
      >
        <section aria-label="Intake form">{leftColumn}</section>
        <section aria-label="Assistant results">{rightColumn}</section>
      </main>

      <style>{`
        @media (max-width: 900px) {
          main[role="main"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
