import { component } from "../../component.ts";

/**
 * Configures TCP/IP network settings, such as IP addresses and DNS
 * 
 * @param interfaces Configures settings for specific network interfaces
 * @param globalSettings Configures global TCP/IP settings
 * @param dnsServerSearchOrder Configures the DNS server search order
 * @param dnsDomain Specifies the DNS domain suffix
 */
export function microsoftWindowsTcpip(
  interfaces : {},
  globalSettings : {},
  dnsServerSearchOrder : {},
  dnsDomain : string
) {
  return component(
    'Microsoft-Windows-TCPIP',
    {
      'Interfaces': interfaces,
      'GlobalSettings': globalSettings,
      'DNSServerSearchOrder': dnsServerSearchOrder,
      'DNSDomain': dnsDomain
    }
  )
}
