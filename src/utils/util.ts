export const prettifyJSON = (data: any) => {
  if (data === null || data === undefined || data === "") return;
  return typeof data === "string"
    ? JSON.stringify(JSON.parse(data), null, 2)
    : JSON.stringify(data);
};
