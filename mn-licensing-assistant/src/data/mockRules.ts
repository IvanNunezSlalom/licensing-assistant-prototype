import type { IntakeData, LicenseType, RoutingSuggestion } from '../types';

const CHILD_CARE_TERMS = [
  'child', 'children', 'child care', 'childcare', 'daycare', 'day care',
  'infant', 'toddler', 'preschool', 'school age', 'youth', 'kids', 'family child',
];

const ADULT_DAY_TERMS = [
  'adult day', 'adult daycare', 'senior', 'older adult', 'elderly',
  'memory care', 'dementia', 'adult care', 'day program',
];

export function suggestLicenseType(intake: IntakeData): {
  licenseType: LicenseType;
  explanation: string;
} {
  const desc = intake.programDescription.toLowerCase();

  const childScore = CHILD_CARE_TERMS.filter((t) => desc.includes(t)).length;
  const adultScore = ADULT_DAY_TERMS.filter((t) => desc.includes(t)).length;

  if (childScore > 0 && adultScore === 0) {
    return {
      licenseType: 'childCare',
      explanation: `Program description contains child care indicators (${CHILD_CARE_TERMS.filter((t) => desc.includes(t)).join(', ')}). Classified as Child Care.`,
    };
  }
  if (adultScore > 0 && childScore === 0) {
    return {
      licenseType: 'adultDayCare',
      explanation: `Program description contains adult day care indicators (${ADULT_DAY_TERMS.filter((t) => desc.includes(t)).join(', ')}). Classified as Adult Day Care.`,
    };
  }
  if (childScore > 0 && adultScore > 0) {
    const winner = childScore >= adultScore ? 'childCare' : 'adultDayCare';
    return {
      licenseType: winner,
      explanation: `Program description contains both child care and adult day care terms. Defaulting to ${winner === 'childCare' ? 'Child Care' : 'Adult Day Care'} based on stronger signal. Staff review recommended.`,
    };
  }

  return {
    licenseType: 'unknown',
    explanation: 'Program description did not match known child care or adult day care terms. Please classify manually.',
  };
}

export function suggestRouting(
  intake: IntakeData,
  licenseType: LicenseType
): RoutingSuggestion {
  const county = intake.county || 'Unknown County';

  if (licenseType === 'childCare') {
    return {
      program: 'Child Care Licensing — DCYF',
      county,
      explanation: `Routed to Child Care Licensing (Department of Children, Youth, and Families) for ${county} County. Verify county-specific requirements before processing.`,
    };
  }
  if (licenseType === 'adultDayCare') {
    return {
      program: 'Adult Day Care Licensing — DHS',
      county,
      explanation: `Routed to Adult Day Care Licensing (Department of Human Services) for ${county} County. Verify county-specific requirements before processing.`,
    };
  }

  return {
    program: 'Unclassified — Manual Review Required',
    county,
    explanation: 'License type could not be determined. Please classify manually before routing.',
  };
}
