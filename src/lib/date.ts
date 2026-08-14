const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Dates on the academic record are as precise as you actually remember. A talk
// you can place to the day gets 'Mar 2025'; one you can only place to the year
// gets '2025'. Both are honest, and neither invents a month to satisfy a format.
//
// Accepts 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD'. Sorting still works on the raw
// string, since a bare year sorts alongside the same year's fuller dates.
export function academicDate(iso: string): string {
	const [year, month] = iso.split('-');
	if (!month) return year;
	return `${MONTHS[Number(month) - 1]} ${year}`;
}
