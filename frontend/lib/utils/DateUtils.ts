export function dateTimeToEuropeString (date: Date): string {
    return `${date.getDate().toLocaleString('de-DE', { minimumIntegerDigits: 2 })}.${(date.getMonth() + 1).toLocaleString('de-DE', { minimumIntegerDigits: 2 })}.${date.getFullYear()} ${date.getHours().toLocaleString('de-DE', { minimumIntegerDigits: 2 })}:${date.getMinutes().toLocaleString('de-DE', { minimumIntegerDigits: 2 })}`
}

export function dateToEuropeString (date: Date): string {
    return `${date.getDate().toLocaleString('de-DE', { minimumIntegerDigits: 2 })}.${(date.getMonth() + 1).toLocaleString('de-DE', { minimumIntegerDigits: 2 })}.${date.getFullYear()}`
  }
