import type { InteractionLog } from '../types';

// Seed logs that appear on first load to show the panel is working
export const seedLogs: InteractionLog[] = [
  {
    id: 'seed-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    type: 'classification',
    staffInputSummary: 'Sunrise Child Care — child care center, new application',
    assistantSuggestionSummary: 'Child Care (DCYF)',
    accepted: true,
  },
  {
    id: 'seed-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    type: 'routing',
    staffInputSummary: 'Sunrise Child Care — Hennepin County',
    assistantSuggestionSummary: 'Child Care Licensing — DCYF, Hennepin County',
    accepted: true,
  },
  {
    id: 'seed-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    type: 'chat',
    staffInputSummary: 'What are the requirements for a new family child care license?',
    assistantSuggestionSummary: 'childcare-new-requirements',
    accepted: null,
  },
];

export function makeLogId(): string {
  return `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
