export function checkAsin(asin: any) {
  if (asin === null) {
    return false;
  } else if (["NOT_ON_AMAZON", "DUPLICATE_ASIN"].includes(asin)) {
    return false;
  }
  return true;
}
