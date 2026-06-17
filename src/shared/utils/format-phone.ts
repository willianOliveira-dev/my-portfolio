/**
 * Formats a phone number in real-time based on the specified locale.
 *
 * @param value The raw input string
 * @param locale The active language/locale (e.g., 'pt-br', 'en', 'es')
 * @returns The formatted phone number
 */
export function formatPhone(value: string, locale: string): string {
  if (!value) return "";
  let prefix = "";
  let maxDigits = 0;
  
  if (locale === "pt-br") { prefix = "55"; maxDigits = 11; }
  else if (locale === "en") { prefix = "1"; maxDigits = 10; }
  else if (locale === "es") { prefix = "34"; maxDigits = 9; }
  else return value;

  let digits = value.replace(/\D/g, "");
  
  if (value.startsWith("+" + prefix)) {
    digits = value.slice(prefix.length + 1).replace(/\D/g, "");
  } else if (digits.startsWith(prefix) && digits.length > maxDigits) {
    digits = digits.slice(prefix.length);
  }
  
  digits = digits.slice(0, maxDigits);
  if (digits.length === 0) return "";

  let res = `+${prefix} `;
  if (locale === "pt-br") {
    if (digits.length > 0) res += `(${digits.slice(0, 2)}`;
    if (digits.length > 2) res += `) ${digits.slice(2, 7)}`;
    if (digits.length > 7) res += `-${digits.slice(7)}`;
  } else if (locale === "en") {
    if (digits.length > 0) res += `(${digits.slice(0, 3)}`;
    if (digits.length > 3) res += `) ${digits.slice(3, 6)}`;
    if (digits.length > 6) res += `-${digits.slice(6)}`;
  } else if (locale === "es") {
    if (digits.length > 0) res += `${digits.slice(0, 3)}`;
    if (digits.length > 3) res += ` ${digits.slice(3, 6)}`;
    if (digits.length > 6) res += ` ${digits.slice(6)}`;
  }
  
  return res;
}
