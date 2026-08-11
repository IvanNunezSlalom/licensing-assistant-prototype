import type { IntakeData, LicenseType } from '../types';
import { findPotentialDuplicate } from '../data/mockIntakes';

const CHILDCARE_REQUIRED_FIELDS: { field: keyof IntakeData; label: string }[] = [
  { field: 'providerName', label: 'Provider name' },
  { field: 'street', label: 'Street address' },
  { field: 'county', label: 'County' },
  { field: 'programDescription', label: 'Program description' },
];

const ADULTDAY_REQUIRED_FIELDS: { field: keyof IntakeData; label: string }[] = [
  { field: 'providerName', label: 'Provider name' },
  { field: 'street', label: 'Street address' },
  { field: 'county', label: 'County' },
  { field: 'programDescription', label: 'Program description' },
];

const CHILDCARE_REQUIRED_DOCS: { field: keyof IntakeData; label: string; action: string }[] = [
  { field: 'hasBackgroundStudy', label: 'Background study form', action: 'Request background study form from applicant.' },
  { field: 'hasFloorPlan', label: 'Floor plan', action: 'Request floor plan of the care space.' },
  { field: 'hasFirstAidCPR', label: 'First aid / CPR certificate', action: 'Request proof of first aid/CPR training.' },
];

const ADULTDAY_REQUIRED_DOCS: { field: keyof IntakeData; label: string; action: string }[] = [
  { field: 'hasBackgroundStudy', label: 'Background study form', action: 'Request background study forms for all staff.' },
  { field: 'hasProofOfInsurance', label: 'Proof of insurance', action: 'Request current proof of insurance.' },
  { field: 'hasFloorPlan', label: 'Floor plan (if space changed)', action: 'Request updated floor plan if physical space has changed.' },
];

interface CompletenessPanelProps {
  intake: IntakeData;
  confirmedLicenseType: LicenseType | null;
  hasRunAssistant: boolean;
}

function CheckRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-sm)',
        padding: 'var(--sp-xs) 0',
        fontSize: 'var(--font-size-sm)',
        color: ok ? 'var(--text-primary)' : '#8b0000',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: ok ? 'var(--mn-green-light)' : '#fce8e8',
          color: ok ? 'var(--mn-green-dark)' : '#8b0000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '0.75rem',
        }}
      >
        {ok ? '✓' : '!'}
      </span>
      <span>
        <span className="sr-only">{ok ? 'Present: ' : 'Missing: '}</span>
        {label}
      </span>
    </li>
  );
}

export default function CompletenessPanel({
  intake,
  confirmedLicenseType,
  hasRunAssistant,
}: CompletenessPanelProps) {
  if (!hasRunAssistant) {
    return (
      <div className="panel">
        <h2 className="panel-title">Completeness Check</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          Run the assistant to see completeness and duplicate checks.
        </p>
      </div>
    );
  }

  const licenseType = confirmedLicenseType ?? 'childCare';
  const isChildCare = licenseType === 'childCare';

  const requiredFields = isChildCare ? CHILDCARE_REQUIRED_FIELDS : ADULTDAY_REQUIRED_FIELDS;
  const requiredDocs = isChildCare ? CHILDCARE_REQUIRED_DOCS : ADULTDAY_REQUIRED_DOCS;

  const missingFields = requiredFields.filter(({ field }) => {
    const val = intake[field];
    return typeof val === 'string' ? !val.trim() : false;
  });

  const missingDocs = requiredDocs.filter(({ field }) => !intake[field]);

  const duplicate = findPotentialDuplicate(intake.providerName, intake.street);
  const isReady = missingFields.length === 0 && missingDocs.length === 0;

  const nextActions = [
    ...missingDocs.map((d) => d.action),
    ...(missingFields.length > 0
      ? [`Complete the following required fields: ${missingFields.map((f) => f.label).join(', ')}.`]
      : []),
  ];

  return (
    <div className="panel">
      <h2 className="panel-title">Completeness Check</h2>

      {/* Overall status */}
      <p style={{ margin: '0 0 var(--sp-md)' }}>
        {isReady ? (
          <span className="badge badge-success">Ready for review</span>
        ) : (
          <span className="badge badge-warning">
            {missingFields.length + missingDocs.length} item{missingFields.length + missingDocs.length !== 1 ? 's' : ''} missing — cannot mark ready
          </span>
        )}
      </p>

      {/* Duplicate warning */}
      {duplicate && (
        <div
          role="alert"
          style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: 'var(--radius)',
            padding: 'var(--sp-md)',
            marginBottom: 'var(--sp-md)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          <strong>Potential duplicate detected.</strong>{' '}
          This may match <em>{duplicate.name}</em> at {duplicate.address}, {duplicate.county} County.
          Please review before processing.
        </div>
      )}

      {/* Required fields */}
      <div style={{ marginBottom: 'var(--sp-md)' }}>
        <p style={{
          margin: '0 0 var(--sp-xs)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Required Fields
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {requiredFields.map(({ field, label }) => (
            <CheckRow
              key={field}
              ok={typeof intake[field] === 'string' ? !!(intake[field] as string).trim() : false}
              label={label}
            />
          ))}
        </ul>
      </div>

      {/* Required documents */}
      <div style={{ marginBottom: missingDocs.length > 0 ? 'var(--sp-md)' : 0 }}>
        <p style={{
          margin: '0 0 var(--sp-xs)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Required Documents
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {requiredDocs.map(({ field, label }) => (
            <CheckRow key={field} ok={!!intake[field]} label={label} />
          ))}
        </ul>
      </div>

      {/* Suggested next actions */}
      {nextActions.length > 0 && (
        <div style={{
          background: 'var(--mn-blue-light)',
          border: '1px solid var(--accent-bluegray)',
          borderRadius: 'var(--radius)',
          padding: 'var(--sp-md)',
        }}>
          <p style={{
            margin: '0 0 var(--sp-xs)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 700,
            color: 'var(--mn-blue)',
          }}>
            Suggested next actions:
          </p>
          <ul style={{ margin: 0, paddingLeft: 'var(--sp-lg)', fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
            {nextActions.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      {/* Screen-reader only helper text for the icon legend */}
      <p className="sr-only">
        Items marked with an exclamation mark are missing or incomplete.
        Items marked with a checkmark are present.
      </p>

      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
    </div>
  );
}
