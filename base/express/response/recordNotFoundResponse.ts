import responser from "./responser";

export default function invalidCredentialsResponse(message: string) {
  return responser(404, "Not Found", message);
}
