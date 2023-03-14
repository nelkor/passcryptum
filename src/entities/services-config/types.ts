type Logins = Record<string, number>
type ServiceData = [number, Logins]
type Services = Record<string, ServiceData | Logins>

export type ServicesConfig = [Services[], Services[]]
