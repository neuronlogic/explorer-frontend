function formatNumber(num) {
  if (num >= 1e6) {
    return `${(num / 1e6).toLocaleString()}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toLocaleString()}K`;
  }
  return num.toLocaleString();
}

export default formatNumber;
