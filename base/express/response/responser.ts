export default function responser(
  statusCode: number,
  message: string,
  data?: any
) {
  return {
    statusCode,
    message,
    data,
  };
}
