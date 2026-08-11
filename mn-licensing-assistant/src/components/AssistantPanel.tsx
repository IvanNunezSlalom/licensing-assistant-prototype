import { useState, useEffect } from 'react';
import type { IntakeData, LicenseType, AssistantResult, InteractionLog } from '../types';
import { suggestLicenseType, suggestRouting } from '../data/mockRules';
import { makeLogId } from '../data/mockLogs';

const LICENSE_TYPE_LABELS: Record<LicenseType, string> = {
  childCare: 'Child Care (DCYF)',
  adultDayCare: 'Adult Day Care (DHS)',
  unknown: 'Unknown — Classify Manually',
};

const SELECTABLE_TYPES: LicenseType[] = ['childCare', 'adultDayCare'];

interface AssistantPanelProps {
  intake: IntakeData;
  lastRunAt: number;
  onLogEntry: (entry: InteractionLog) => void;
  onConfirm: (licenseType: LicenseType) => void;
}

type Phase = 'idle' | 'pending' | 'confirmed';

export default function AssistantPanel({
  intake,
  lastRunAt,
  onLogEntry,
  onConfirm,
}: AssistantPanelProps) {
  const [result, setResult] = useState<AssistantResult | null>(null);
  const [overrideType, setOverrideType] = useState<LicenseType>('childCare');
  const [confirmedType, setConfirmedType] = useState<LicenseType | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');

  // Run assistant logic whenever lastRunAt increments (triggered by "Run Assistant" button)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (lastRunAt === 0) return;
    const { licenseType, explanation } = suggestLicenseType(intake);
    const routing = suggestRouting(intake, licenseType);
    setResult({
      suggestedLicenseType: licenseType,
      licenseTypeExplanation: explanation,
      routing,
      timestamp: new Date().toISOString(),
    });
    setOverrideType(licenseType !== 'unknown' ? licenseType : 'childCare');
    setPhase('pending');
    setConfirmedType(null);
  }, [lastRunAt]); // intake intentionally omitted — effect runs only on explicit "Run" click

  function confirmWith(finalType: LicenseType, accepted: boolean) {
    if (!result) return;
    const routing = suggestRouting(intake, finalType);
    setConfirmedType(finalType);
    setPhase('confirmed');
    onConfirm(finalType);

    const overrideNote = accepted
      ? LICENSE_TYPE_LABELS[result.suggestedLicenseType]
      : `Suggested: ${LICENSE_TYPE_LABELS[result.suggestedLicenseType]} → Override: ${LICENSE_TYPE_LABELS[finalType]}`;

    onLogEntry({
      id: makeLogId(),
      timestamp: new Date().toISOString(),
      type: 'classification',
      staffInputSummary: `${intake.providerName || 'Unknown'} — ${intake.programDescription.slice(0, 60)}`,
      assistantSuggestionSummary: overrideNote,
      accepted,
    });
    onLogEntry({
      id: makeLogId(),
      timestamp: new Date().toISOString(),
      type: 'routing',
      staffInputSummary: `${intake.providerName || 'Unknown'} — ${intake.county || 'Unknown'} County`,
      assistantSuggestionSummary: routing.program,
      accepted,
    });
  }

  // ── Idle ──────────────────────────────────────────────────────────────────
  if (phase === 'idle') {
    return (
      <div className="panel">
        <h2 className="panel-title">Classification &amp; Routing</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          Fill out the intake form and click <strong>Run Assistant</strong> to see a
          classification and routing suggestion.
        </p>
      </div>
    );
  }

  // ── Pending (suggestion shown, awaiting staff decision) ───────────────────
  if (phase === 'pending' && result) {
    const isSameAsOverride = overrideType === result.suggestedLicenseType;

    return (
      <div className="panel">
        <h2 className="panel-title">Classification &amp; Routing</h2>

        {/* Suggestion */}
        <div style={{ marginBottom: 'var(--sp-lg)' }}>
          <p style={{
            margin: '0 0 var(--sp-xs)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Suggested License Type
          </p>
          <p style={{ margin: '0 0 var(--sp-sm)' }}>
            <span className={`badge ${result.suggestedLicenseType === 'unknown' ? 'badge-warning' : 'badge-info'}`}>
              {LICENSE_TYPE_LABELS[result.suggestedLicenseType]}
            </span>
          </p>
          <p style={{
            margin: '0 0 var(--sp-md)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-secondary)',
            fontStyle: 'italic',
          }}>
            {result.licenseTypeExplanation}
          </p>

          {/* Routing box */}
          <div style={{
            background: 'var(--surface-alt)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: 'var(--sp-md)',
          }}>
            <p style={{
              margin: '0 0 var(--sp-xs)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Suggested Routing
            </p>
            <p style={{ margin: '0 0 var(--sp-xs)', fontWeight: 600 }}>{result.routing.program}</p>
            <p style={{ margin: '0 0 var(--sp-xs)', fontSize: 'var(--font-size-sm)' }}>
              County: <strong>{result.routing.county || 'Not specified'}</strong>
            </p>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              {result.routing.explanation}
            </p>
          </div>
        </div>

        {/* Staff decision controls */}
        <div
          role="group"
          aria-labelledby="decision-label"
          style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--sp-md)' }}
        >
          <p
            id="decision-label"
            style={{ margin: '0 0 var(--sp-sm)', fontSize: 'var(--font-size-sm)', fontWeight: 700 }}
          >
            Staff decision — accept or override:
          </p>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => confirmWith(result.suggestedLicenseType, true)}
            style={{ marginBottom: 'var(--sp-md)', width: '100%', justifyContent: 'center' }}
          >
            Accept Suggestion
          </button>

          <div style={{ display: 'flex', gap: 'var(--sp-sm)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ margin: 0, flexGrow: 1, minWidth: 160 }}>
              <label className="form-label" htmlFor="overrideLicenseType" style={{ fontSize: 'var(--font-size-sm)' }}>
                Override license type:
              </label>
              <select
                id="overrideLicenseType"
                className="form-select"
                value={overrideType}
                onChange={(e) => setOverrideType(e.target.value as LicenseType)}
              >
                {SELECTABLE_TYPES.map((t) => (
                  <option key={t} value={t}>{LICENSE_TYPE_LABELS[t]}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => confirmWith(overrideType, false)}
              disabled={isSameAsOverride}
              aria-disabled={isSameAsOverride}
            >
              Override
            </button>
          </div>
          {isSameAsOverride && (
            <p
              role="status"
              style={{ margin: 'var(--sp-xs) 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}
            >
              Select a different type to enable override.
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── Confirmed ─────────────────────────────────────────────────────────────
  const finalType = confirmedType ?? 'childCare';
  const finalRouting = suggestRouting(intake, finalType);

  return (
    <div className="panel">
      <h2 className="panel-title">Classification &amp; Routing</h2>

      <p style={{ margin: '0 0 var(--sp-md)' }}>
        <span className="badge badge-success">Confirmed by staff</span>
      </p>

      <div style={{ marginBottom: 'var(--sp-md)' }}>
        <p style={{
          margin: '0 0 var(--sp-xs)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          License Type
        </p>
        <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--mn-blue)' }}>
          {LICENSE_TYPE_LABELS[finalType]}
        </p>
      </div>

      <div style={{
        background: 'var(--surface-alt)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 'var(--sp-md)',
        marginBottom: 'var(--sp-lg)',
      }}>
        <p style={{
          margin: '0 0 var(--sp-xs)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Routing
        </p>
        <p style={{ margin: '0 0 var(--sp-xs)', fontWeight: 600 }}>{finalRouting.program}</p>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
          {finalRouting.county} County
        </p>
      </div>

      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => setPhase('pending')}
        style={{ fontSize: 'var(--font-size-sm)' }}
      >
        Change classification
      </button>
    </div>
  );
}
