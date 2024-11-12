export const convertToPersianDigits = (value: string | number) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return value
    .toString()
    .replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit)]);
};
