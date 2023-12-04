export default function getPaginationFromQuery(params: {
  take: number;
  skip: number;
}) {
  const { take, skip } = params;

  return {
    skip: skip ? Number(skip) : 0,
    take: take ? Number(take) : 10,
  };
}
