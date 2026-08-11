import { useState } from 'react';
import Layout from './components/Layout';
import IntakeForm from './components/IntakeForm';
import AssistantPanel from './components/AssistantPanel';
import CompletenessPanel from './components/CompletenessPanel';
import StaffChatPanel from './components/StaffChatPanel';
import LogPanel from './components/LogPanel';
import type { IntakeData, InteractionLog, LicenseType } from './types';
import { seedLogs } from './data/mockLogs';

const EMPTY_INTAKE: IntakeData = {
  providerName: '',
  street: '',
  city: '',
  county: '',
  applicationType: 'new',
  programDescription: '',
  hasBackgroundStudy: false,
  hasFloorPlan: false,
  hasProofOfInsurance: false,
  hasFirstAidCPR: false,
};

export default function App() {
  const [intake, setIntake] = useState<IntakeData>(EMPTY_INTAKE);
  const [lastRunAt, setLastRunAt] = useState(0);
  const [confirmedLicenseType, setConfirmedLicenseType] = useState<LicenseType | null>(null);
  const [logs, setLogs] = useState<InteractionLog[]>(seedLogs);

  function handleLogEntry(entry: InteractionLog) {
    setLogs((prev) => [...prev, entry]);
  }

  function handleRunAssistant() {
    setLastRunAt((n) => n + 1);
  }

  return (
    <Layout
      leftColumn={
        <>
          <IntakeForm
            intake={intake}
            onChange={setIntake}
            onRunAssistant={handleRunAssistant}
            isRunning={false}
          />
          <LogPanel logs={logs} />
        </>
      }
      rightColumn={
        <>
          <AssistantPanel
            intake={intake}
            lastRunAt={lastRunAt}
            onLogEntry={handleLogEntry}
            onConfirm={setConfirmedLicenseType}
          />
          <CompletenessPanel
            intake={intake}
            confirmedLicenseType={confirmedLicenseType}
            hasRunAssistant={lastRunAt > 0}
          />
          <StaffChatPanel onLogEntry={handleLogEntry} />
        </>
      }
    />
  );
}
