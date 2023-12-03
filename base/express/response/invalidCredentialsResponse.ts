import responser from "./responser";

export default function invalidCredentialsResponse(message: string) {
  return responser(401, "Invalid Credentials", message);
}
