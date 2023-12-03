import responser from "./responser";

export default function unauthorizedResponse() {
  return responser(401, "Unauthorized");
}
