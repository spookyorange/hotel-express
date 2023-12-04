export default function getAParamFromQuery(query: any, param: string) {
  const value = query[param];

  if (value === "" || value === undefined) return undefined;

  return value;
}
