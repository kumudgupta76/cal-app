export interface NagerHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export interface Holiday {
  date: string;
  name: string;
  description?: string;
}

export async function fetchHolidaysForYear(year: number): Promise<Holiday[]> {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/IN`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch holidays: ${response.statusText}`);
    }
    
    const data: NagerHoliday[] = await response.json();
    
    return data.map((holiday) => ({
      date: holiday.date,
      name: holiday.localName || holiday.name,
      description: holiday.name !== holiday.localName ? holiday.name : undefined,
    }));
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return [];
  }
}
