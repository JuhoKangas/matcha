import { publicIpv4 } from 'public-ip'

export const getIP = async () => {
  const ip = await publicIpv4()
  return ip
}
