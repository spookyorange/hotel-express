import responser from "./responser";

export default function alreadyExistsResponse() {
  return responser(400, `A record with same unique attribute already exists`);
}
