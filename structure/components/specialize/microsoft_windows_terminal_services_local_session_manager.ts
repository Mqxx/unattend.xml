import { component } from "../../component.ts";

/**
 * Configures Remote Desktop session management settings
 * 
 * @param fDenyTSConnections Specifies whether to deny Remote Desktop connections
 * @param fSingleSessionPerUser Specifies whether to limit users to a single Remote Desktop session
 */
export function microsoftWindowsTerminalServicesLocalSessionManager(
  fDenyTSConnections : boolean,
  fSingleSessionPerUser : boolean
) {
  return component(
    'Microsoft-Windows-TerminalServices-LocalSessionManager',
    {
      'fDenyTSConnections': fDenyTSConnections,
      'fSingleSessionPerUser': fSingleSessionPerUser
    }
  )
}
