import type { ConnectionMode } from "./wlan_profile/connection_mode.ts";
import type { ConnectionType } from "./wlan_profile/connection_type.ts";
import type { MSM } from "./wlan_profile/msm.ts";


/** Defines a WLAN profile. */
export interface WlanProfile {
  /** Specifies the name of the WLAN profile. */
  profileName : string,
  /** Specifies the SSID of the wireless network. */
  ssid : string,
  /** Specifies the connection type. */
  connectionType : ConnectionType,
  /** Specifies the connection mode. */
  connectionMode : ConnectionMode,
  /** Configures security and authentication settings for the WLAN profile. */
  msm : MSM,
  /** Specifies whether the profile allows automatic switching to other networks. */
  autoSwitch : boolean
}

export function wlanProfile(parameter : WlanProfile) {
  return {
    'WLANProfile': {
      '@wcm:action': 'add',
      'ProfileName': parameter.profileName,
      'SSID': parameter.ssid,
      'ConnectionType': parameter.connectionType,
      'ConnectionMode': parameter.connectionMode,
      'MSM': parameter.msm,
      'AutoSwitch': parameter.autoSwitch
    }
  }
}
