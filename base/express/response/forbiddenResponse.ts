import responser from "./responser";

export default function forbiddenResponse() {
  return responser(403, "Forbidden");
}
