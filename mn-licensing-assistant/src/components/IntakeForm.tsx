import type { IntakeData, ApplicationType } from '../types';

const MN_COUNTIES = [
  'Aitkin', 'Anoka', 'Becker', 'Beltrami', 'Benton', 'Big Stone', 'Blue Earth',
  'Brown', 'Carlton', 'Carver', 'Cass', 'Chippewa', 'Chisago', 'Clay', 'Clearwater',
  'Cook', 'Cottonwood', 'Crow Wing', 'Dakota', 'Dodge', 'Douglas', 'Faribault',
  'Fillmore', 'Freeborn', 'Goodhue', 'Grant', 'Hennepin', 'Houston', 'Hubbard',
  'Isanti', 'Itasca', 'Jackson', 'Kanabec', 'Kandiyohi', 'Kittson', 'Koochiching',
  'Lac qui Parle', 'Lake', 'Lake of the Woods', 'Le Sueur', 'Lincoln', 'Lyon',
  'Mahnomen', 'Marshall', 'Martin', 'McLeod', 'Meeker', 'Mille Lacs', 'Morrison',
  'Mower', 'Murray', 'Nicollet', 'Nobles', 'Norman', 'Olmsted', 'Otter Tail',
  'Pennington', 'Pine', 'Pipestone', 'Polk', 'Pope', 'Ramsey', 'Red Lake',
  'Redwood', 'Renville', 'Rice', 'Rock', 'Roseau', 'Scott', 'Sherburne',
  'Sibley', 'St. Louis', 'Stearns', 'Steele', 'Stevens', 'Swift', 'Todd',
  'Traverse', 'Wabasha', 'Wadena', 'Waseca', 'Washington', 'Watonwan',
  'Wilkin', 'Winona', 'Wright', 'Yellow Medicine',
];

const APPLICATION_TYPE_LABELS: Record<ApplicationType, string> = {
  new: 'New Application',
  renewal: 'Renewal',
  changeOfAddress: 'Change of Address',
  other: 'Other',
};

interface IntakeFormProps {
  intake: IntakeData;
  onChange: (updated: IntakeData) => void;
  onRunAssistant: () => void;
  isRunning: boolean;
}

export default function IntakeForm({
  intake,
  onChange,
  onRunAssistant,
  isRunning,
}: IntakeFormProps) {
  function set<K extends keyof IntakeData>(field: K, value: IntakeData[K]) {
    onChange({ ...intake, [field]: value });
  }

  return (
    <div className="panel">
      <h2 className="panel-title">Provider Intake</h2>

      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 var(--sp-lg)' }}>
        <legend style={{
          fontWeight: 700,
          color: 'var(--mn-blue)',
          fontSize: 'var(--font-size-base)',
          marginBottom: 'var(--sp-sm)',
        }}>
          Provider Information
        </legend>

        <div className="form-group">
          <label className="form-label" htmlFor="providerName">
            Provider Name <span aria-hidden="true" style={{ color: '#8b0000' }}>*</span>
          </label>
          <input
            id="providerName"
            type="text"
            className="form-input"
            value={intake.providerName}
            onChange={(e) => set('providerName', e.target.value)}
            autoComplete="organization"
            required
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="street">Street Address</label>
          <input
            id="street"
            type="text"
            className="form-input"
            value={intake.street}
            onChange={(e) => set('street', e.target.value)}
            autoComplete="street-address"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-md)' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              className="form-input"
              value={intake.city}
              onChange={(e) => set('city', e.target.value)}
              autoComplete="address-level2"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="county">
              County <span aria-hidden="true" style={{ color: '#8b0000' }}>*</span>
            </label>
            <select
              id="county"
              className="form-select"
              value={intake.county}
              onChange={(e) => set('county', e.target.value)}
              required
              aria-required="true"
            >
              <option value="">— Select county —</option>
              {MN_COUNTIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 var(--sp-lg)' }}>
        <legend style={{
          fontWeight: 700,
          color: 'var(--mn-blue)',
          fontSize: 'var(--font-size-base)',
          marginBottom: 'var(--sp-sm)',
        }}>
          Application Details
        </legend>

        <div className="form-group">
          <label className="form-label" htmlFor="applicationType">Application Type</label>
          <select
            id="applicationType"
            className="form-select"
            value={intake.applicationType}
            onChange={(e) => set('applicationType', e.target.value as ApplicationType)}
          >
            {(Object.entries(APPLICATION_TYPE_LABELS) as [ApplicationType, string][]).map(
              ([val, label]) => (
                <option key={val} value={val}>{label}</option>
              )
            )}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="programDescription">
            Program Description <span aria-hidden="true" style={{ color: '#8b0000' }}>*</span>
          </label>
          <p id="programDescriptionHint" style={{ margin: '0 0 var(--sp-xs)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            Describe the program or service (e.g., "Family child care home for infants and toddlers").
            The assistant uses this to suggest a license type.
          </p>
          <textarea
            id="programDescription"
            className="form-textarea"
            value={intake.programDescription}
            onChange={(e) => set('programDescription', e.target.value)}
            rows={4}
            aria-describedby="programDescriptionHint"
            required
            aria-required="true"
          />
        </div>
      </fieldset>

      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 var(--sp-lg)' }}>
        <legend style={{
          fontWeight: 700,
          color: 'var(--mn-blue)',
          fontSize: 'var(--font-size-base)',
          marginBottom: 'var(--sp-sm)',
        }}>
          Documents on File
        </legend>
        <p style={{ margin: '0 0 var(--sp-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
          Check all documents already received from the applicant.
        </p>

        {(
          [
            { field: 'hasBackgroundStudy', label: 'Background study form' },
            { field: 'hasFloorPlan', label: 'Floor plan' },
            { field: 'hasProofOfInsurance', label: 'Proof of insurance' },
            { field: 'hasFirstAidCPR', label: 'First aid / CPR certificate' },
          ] as { field: keyof IntakeData; label: string }[]
        ).map(({ field, label }) => (
          <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-xs)' }}>
            <input
              type="checkbox"
              id={field}
              checked={intake[field] as boolean}
              onChange={(e) => set(field, e.target.checked)}
              style={{ width: 18, height: 18, cursor: 'pointer', accentColor: 'var(--mn-blue)' }}
            />
            <label htmlFor={field} style={{ cursor: 'pointer', fontSize: 'var(--font-size-base)' }}>
              {label}
            </label>
          </div>
        ))}
      </fieldset>

      <button
        type="button"
        className="btn btn-primary"
        onClick={onRunAssistant}
        disabled={isRunning || !intake.providerName.trim() || !intake.programDescription.trim()}
        style={{ width: '100%', justifyContent: 'center', padding: 'var(--sp-md)' }}
        aria-busy={isRunning}
      >
        {isRunning ? 'Running…' : 'Run Assistant'}
      </button>

      {(!intake.providerName.trim() || !intake.programDescription.trim()) && (
        <p
          role="status"
          style={{ marginTop: 'var(--sp-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', textAlign: 'center' }}
        >
          Enter a provider name and program description to enable the assistant.
        </p>
      )}
    </div>
  );
}
