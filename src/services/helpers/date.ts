export function getCurrentWeek(startWeekDate: string, endWeekDate: string, lang: string = 'ru'): string {
  const startOfWeek = new Date(startWeekDate);
  const endOfWeek = new Date(endWeekDate);

  const startWeekMonth = startOfWeek.toLocaleString(lang, { month: 'long' });
  const endWeekMonth = endOfWeek.toLocaleString(lang, { month: 'long' });
  const startWeek = startOfWeek.toLocaleString(lang, { day: 'numeric', month: 'long' });
  const endWeek = endOfWeek.toLocaleString(lang, { day: 'numeric', month: 'long' });

  if (startWeekMonth === endWeekMonth) {
    // Если неделя в одном месяце
    return `${startOfWeek.getDate()} - ${endWeek}`;
  } else {
    // Если неделя в разных месяцах
    return `${startWeek} - ${endWeek}`;
  }
}

export function getCurrentWeekDates(
  language: string = 'ru',
  length: 'long' | 'short' = 'long'
): { date: string; day: string }[] {
  let lang;
  if (language === 'ua') {
    lang = 'uk-UA';
  } else {
    lang = 'ru-RU';
  }
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    let day;
    if (length === 'long') {
      day = date.toLocaleDateString(lang, { weekday: 'long' });
    } else {
      day = date.toLocaleDateString(lang, { weekday: 'short' });
    }
    day = day.charAt(0).toUpperCase() + day.slice(1);
    weekDates.push({ date: date.toISOString().slice(0, 10), day });
  }
  return weekDates;
}

export function convertDate(inputDate: string): string {
  const dateParts = inputDate.split('-');
  const outputDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  return outputDate;
}

export function getDay(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getDayOfWeek(dateString: string, lang: string = 'ru', length: 'long' | 'short' = 'long'): string {
  const date = new Date(dateString);
  let day;
  if (length === 'long') {
    day = date.toLocaleString(lang, { weekday: 'long' });
  } else {
    day = date.toLocaleString(lang, { weekday: 'short' });
  }
  day = day.charAt(0).toUpperCase() + day.slice(1);
  return day;
}

export function getFormattedDateRange(startWeekDate: string, endWeekDate: string): string {
  const startDate: Date = new Date(startWeekDate);
  const endDate: Date = new Date(endWeekDate);

  const startDay: string = startDate.getDate().toString().padStart(2, '0');
  const endDay: string = endDate.getDate().toString().padStart(2, '0');
  const endMonth: string = (endDate.getMonth() + 1).toString().padStart(2, '0');
  const endYear: number = endDate.getFullYear();

  return `${startDay}-${endDay}.${endMonth}.${endYear}`;
}

export function getDayStatus(date: string): 'before' | 'today' | 'after' | undefined {
  if (date.length === 0) return;
  const today = new Date().toISOString().slice(0, 10);

  if (date < today) {
    return 'before';
  } else if (date === today) {
    return 'today';
  } else {
    return 'after';
  }
}

export function compareDates(dateString: string): boolean {
  const dateFromString: Date = new Date(dateString);
  const currentDate: Date = new Date();
  dateFromString.setHours(0, 0, 0, 0);
  dateFromString.setHours(0, 0, 0, 0);
  if (dateFromString.getTime() < currentDate.getTime()) {
    return true;
  }
  return false;
}
