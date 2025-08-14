import { wlanProfile } from "./wlan_profile.ts";

export function wlanProfiles() {
  const profiles : object[] = []
  return {
    add: (
      profileName: string,
      ssid: string,
      connectionType: 'ESS' | 'IBSS',
      connectionMode: 'auto' | 'manual',
      msm: {
        security: {
          authEncryption: {
            authentication: 'WPA2PSK' | 'WPA' | 'Open' | 'WPA2' | 'WPAPSK',
            encryption: 'AES' | 'TKIP' | 'None',
            useOneX: boolean
          }
          sharedKey: {
            keyType: 'passPhrase' | 'networkKey',
            protected: boolean,
            keyMaterial: string
          }
        }
      },
      autoSwitch: boolean = true
    ) => {
      profiles.push(wlanProfile(
        profiles,
        profileName,
        ssid,
        connectionType,
        connectionMode,
        msm,
        autoSwitch
      ).profile)
    },
    profiles
  }
}
