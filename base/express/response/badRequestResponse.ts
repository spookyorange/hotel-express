import responser from "./responser";

export default function badRequestResponse(message: string) {
  return responser(400, "Bad Request", message);
}
