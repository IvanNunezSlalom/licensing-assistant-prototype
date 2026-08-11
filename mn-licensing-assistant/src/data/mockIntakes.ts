export interface ExistingProvider {
  name: string;
  address: string;
  county: string;
  licenseType: 'childCare' | 'adultDayCare';
}

export const existingProviders: ExistingProvider[] = [
  {
    name: 'Sunrise Child Care',
    address: '123 Main St',
    county: 'Hennepin',
    licenseType: 'childCare',
  },
  {
    name: 'Evergreen Adult Day Care',
    address: '456 Oak Ave',
    county: 'Ramsey',
    licenseType: 'adultDayCare',
  },
  {
    name: 'Little Stars Family Child Care',
    address: '789 Elm Rd',
    county: 'Dakota',
    licenseType: 'childCare',
  },
  {
    name: 'Sunrise Day Program',
    address: '321 Maple Blvd',
    county: 'Hennepin',
    licenseType: 'adultDayCare',
  },
  {
    name: 'Rainbow Kids Center',
    address: '555 Pine St',
    county: 'Anoka',
    licenseType: 'childCare',
  },
];

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
}

function wordOverlap(a: string, b: string): number {
  const wordsA = new Set(normalize(a).split(/\s+/).filter(Boolean));
  const wordsB = new Set(normalize(b).split(/\s+/).filter(Boolean));
  let count = 0;
  wordsA.forEach((w) => { if (wordsB.has(w)) count++; });
  return count;
}

export function findPotentialDuplicate(
  name: string,
  address: string
): ExistingProvider | null {
  if (!name.trim() && !address.trim()) return null;

  for (const p of existingProviders) {
    const nameOverlap = wordOverlap(name, p.name);
    const addrOverlap = wordOverlap(address, p.address);
    // Flag if name has 2+ overlapping words OR both name and address have 1+ overlap each
    if (nameOverlap >= 2 || (nameOverlap >= 1 && addrOverlap >= 1)) {
      return p;
    }
  }
  return null;
}
