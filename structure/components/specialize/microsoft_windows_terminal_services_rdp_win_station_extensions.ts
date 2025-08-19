import { component } from "../../component.ts";

/**
 * Configures Remote Desktop Protocol (RDP) extensions
 * 
 * @param securityLayer Specifies the security layer for RDP connections
 * @param userAuthenticationRequired Specifies whether Network Level Authentication (NLA) is required
 * @param minEncryptionLevel Specifies the minimum encryption level for RDP connections
 */
export function microsoftWindowsTerminalServicesRdpWinStationExtensions(
  securityLayer : number,
  userAuthenticationRequired : boolean,
  minEncryptionLevel : number
) {
  return component(
    'Microsoft-Windows-TerminalServices-RDP-WinStationExtensions',
    {
      'SecurityLayer': securityLayer,
      'UserAuthenticationRequired': userAuthenticationRequired ? '1' : '0',
      'MinEncryptionLevel': minEncryptionLevel
    }
  )
}
