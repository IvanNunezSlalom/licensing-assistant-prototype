export interface CannedResponse {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  sourceReference: string;
}

export const DISCLAIMER_RESPONSE: CannedResponse = {
  id: 'disclaimer',
  keywords: ['legal', 'eligible', 'eligibility', 'decision', 'approve', 'deny', 'denied', 'approved'],
  question: '',
  answer:
    "I can't provide legal advice or make eligibility determinations. " +
    'Please consult your supervisor or the policy unit for guidance.',
  sourceReference: '',
};

export const FALLBACK_RESPONSE: CannedResponse = {
  id: 'fallback',
  keywords: [],
  question: '',
  answer:
    "I don't have a canned answer for that question yet. " +
    'Please check the policy manual or contact your supervisor.',
  sourceReference: '',
};

export const cannedResponses: CannedResponse[] = [
  {
    id: 'childcare-new-requirements',
    keywords: ['requirements', 'new', 'family child care', 'child care license', 'new license'],
    question: 'What are the requirements for a new family child care license?',
    answer:
      'A new family child care license requires a completed application, ' +
      'a background study for all household members, a home inspection, ' +
      'proof of first aid/CPR training, and a floor plan of the care space.',
    sourceReference: 'Child Care Licensing Policy Manual, Section 3.2',
  },
  {
    id: 'adultday-renewal-docs',
    keywords: ['documents', 'renewal', 'adult day care', 'renew', 'adult day'],
    question: 'What documents do I need for an adult day care renewal?',
    answer:
      'Adult day care renewal requires a completed renewal application, ' +
      'updated proof of insurance, current background studies for all staff, ' +
      'and any updated floor plans if the physical space has changed.',
    sourceReference: 'Adult Day Care Licensing Guidelines, Section 5.1',
  },
  {
    id: 'change-of-address',
    keywords: ['change of address', 'address change', 'moved', 'new address', 'relocation'],
    question: 'How do I handle a change of address for an existing provider?',
    answer:
      'A change of address requires the provider to submit a change-of-address form, ' +
      'a new home or facility inspection at the new location, and updated floor plans. ' +
      'The license is suspended until the inspection is complete.',
    sourceReference: 'Child Care Licensing Policy Manual, Section 7.4',
  },
  {
    id: 'background-study',
    keywords: ['background study', 'background check', 'background', 'household member'],
    question: 'Who needs a background study?',
    answer:
      'All persons 13 years of age or older who live in the home of a family child care provider ' +
      'must have a background study completed. For center-based care, all staff who have direct ' +
      'contact with children must have a background study on file before they begin working.',
    sourceReference: 'Child Care Licensing Policy Manual, Section 4.1',
  },
  {
    id: 'inspection-timeline',
    keywords: ['inspection', 'home inspection', 'facility inspection', 'how long', 'timeline', 'how many days'],
    question: 'How long does a home inspection take to schedule?',
    answer:
      'Initial home inspections are typically scheduled within 30 days of receiving a complete application. ' +
      'Inspection timelines may vary by county. Contact your regional licensing office for current wait times.',
    sourceReference: 'Child Care Licensing Policy Manual, Section 5.3',
  },
  {
    id: 'capacity-limits',
    keywords: ['capacity', 'how many children', 'maximum', 'limit', 'number of children'],
    question: 'What is the maximum capacity for a family child care home?',
    answer:
      'A licensed family child care home may care for no more than 14 children at one time, ' +
      'with no more than 5 children under age 5 (including the provider\'s own children under 5). ' +
      'Specific ratios vary by age group. Review your license conditions for your approved capacity.',
    sourceReference: 'Child Care Licensing Policy Manual, Section 6.2',
  },
];

export function findCannedResponse(query: string): CannedResponse {
  const q = query.toLowerCase();

  if (DISCLAIMER_RESPONSE.keywords.some((kw) => q.includes(kw))) {
    return DISCLAIMER_RESPONSE;
  }

  const match = cannedResponses.find((r) => r.keywords.some((kw) => q.includes(kw)));
  return match ?? FALLBACK_RESPONSE;
}

export const suggestedQuestions = cannedResponses.slice(0, 4).map((r) => r.question);
