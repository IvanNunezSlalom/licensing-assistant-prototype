import type { InteractionLog } from '../types';
import { formatTimestamp } from '../data/mockLogs';

const TYPE_LABELS: Record<InteractionLog['type'], string> = {
  classification: 'Classification',
  routing: 'Routing',
  completeness: 'Completeness',
  chat: 'Chat',
};

const TYPE_BADGE_CLASS: Record<InteractionLog['type'], string> = {
  classification: 'badge-info',
  routing: 'badge-info',
  completeness: 'badge-warning',
  chat: 'badge badge-success',
};

function AcceptedCell({ accepted }: { accepted: boolean | null }) {
  if (accepted === null) return <span style={{ color: 'var(--text-secondary)' }}>—</span>;
  return accepted ? (
    <span className="badge badge-success">Accepted</span>
  ) : (
    <span className="badge badge-warning">Overridden</span>
  );
}

interface LogPanelProps {
  logs: InteractionLog[];
}

export default function LogPanel({ logs }: LogPanelProps) {
  return (
    <div className="panel">
      <h2 className="panel-title">Interaction Log</h2>

      {logs.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          No interactions recorded yet. Run the assistant or ask a question to begin.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 'var(--font-size-sm)',
            }}
            aria-label="Interaction log"
          >
            <thead>
              <tr style={{ background: 'var(--mn-blue-light)' }}>
                {(['Time', 'Type', 'Input Summary', 'Suggestion', 'Decision'] as const).map((h) => (
                  <th
                    key={h}
                    scope="col"
                    style={{
                      padding: 'var(--sp-sm) var(--sp-md)',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: 'var(--mn-blue)',
                      borderBottom: '2px solid var(--border)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...logs].reverse().map((log, i) => (
                <tr
                  key={log.id}
                  style={{
                    background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-alt)',
                    verticalAlign: 'top',
                  }}
                >
                  <td style={{ padding: 'var(--sp-sm) var(--sp-md)', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td style={{ padding: 'var(--sp-sm) var(--sp-md)', whiteSpace: 'nowrap' }}>
                    <span className={`badge ${TYPE_BADGE_CLASS[log.type]}`}>
                      {TYPE_LABELS[log.type]}
                    </span>
                  </td>
                  <td style={{ padding: 'var(--sp-sm) var(--sp-md)', maxWidth: 200 }}>
                    {log.staffInputSummary}
                  </td>
                  <td style={{ padding: 'var(--sp-sm) var(--sp-md)', maxWidth: 200, color: 'var(--text-secondary)' }}>
                    {log.assistantSuggestionSummary}
                  </td>
                  <td style={{ padding: 'var(--sp-sm) var(--sp-md)', whiteSpace: 'nowrap' }}>
                    <AcceptedCell accepted={log.accepted} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
