export type CalculatePassword = (
  serviceName: string,
  loginName: string,
  version: number,
  useSpecialCharacters: boolean,
  length: number
) => Promise<string>

export interface PasswordGenerator {
  calculate: CalculatePassword | null
}
