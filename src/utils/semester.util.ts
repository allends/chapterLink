import { Semester, Year } from "~/types";

export const generateSemesterOptions = (): Semester[] => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1];

  const options: string[] = years.reduce((acc: string[], year) => {
    acc.push(`spring ${year}`);
    acc.push(`fall ${year}`);
    return acc;
  }, []);

  return options.reverse() as unknown as Semester[];
}

export const getCurrentSemester = (): Semester => {
  const currentYear = new Date().getFullYear() as unknown as Year;
  const currentMonth = new Date().getMonth();
  const isSpring = currentMonth < 6;
  return `${isSpring ? 'spring' : 'fall'} ${currentYear}`;
}