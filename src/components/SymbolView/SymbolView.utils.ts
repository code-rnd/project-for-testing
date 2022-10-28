export const objUpdate = <P, N>({
  prevObj,
  nextValue,
  key,
}: {
  prevObj: P;
  nextValue: N;
  key: symbol;
}) => {
  return { ...prevObj, [key]: nextValue };
};
