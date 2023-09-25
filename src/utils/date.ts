export function parseDate(date: string) {
  const dateObj = new Date(date);
  
  const year = dateObj.getFullYear() % 100;
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based
  const day = dateObj.getDate().toString().padStart(2, '0');
  
  return `${month}/${day}/${year}`;
}