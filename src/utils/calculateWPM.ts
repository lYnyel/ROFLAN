const calculateWPM = (text: string, duration: number): number => {
  const words = text.trim().split(/\s+/).length;
  return Math.round(words / duration);
};

export default calculateWPM;
