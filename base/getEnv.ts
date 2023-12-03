export default function getEnv<T>(envName: string, backup: T) {
  return process.env[envName] ?? backup;
}
