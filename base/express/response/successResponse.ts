import responser from "./responser";

export default function successResponse(message: string, data?: any) {
  return responser(200, message, data);
}
