export const cn = <T>(classes: T[]): string => {
  return classes.filter(Boolean).join(" ");
};
