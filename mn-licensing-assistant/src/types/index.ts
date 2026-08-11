export type LicenseType = 'childCare' | 'adultDayCare' | 'unknown';

export type ApplicationType = 'new' | 'renewal' | 'changeOfAddress' | 'other';

export interface IntakeData {
  providerName: string;
  street: string;
  city: string;
  county: string;
  applicationType: ApplicationType;
  programDescription: string;
  // Document flags (checkboxes in the form)
  hasBackgroundStudy: boolean;
  hasFloorPlan: boolean;
  hasProofOfInsurance: boolean;
  hasFirstAidCPR: boolean;
}

export interface RoutingSuggestion {
  program: string;
  county: string;
  explanation: string;
}

export interface AssistantResult {
  suggestedLicenseType: LicenseType;
  licenseTypeExplanation: string;
  routing: RoutingSuggestion;
  timestamp: string;
}

export interface InteractionLog {
  id: string;
  timestamp: string;
  type: 'classification' | 'routing' | 'completeness' | 'chat';
  staffInputSummary: string;
  assistantSuggestionSummary: string;
  accepted: boolean | null; // null for chat entries
}

export interface CompletenessResult {
  missingFields: string[];
  missingDocs: string[];
  duplicateWarning: string | null;
  isReadyForReview: boolean;
}
