export function wlanProfile(
  profiles : object,
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
) {
  return {
    profile: {
      'WLANProfile': {
        '@wcm:action': 'add',
        'ProfileName': profileName,
        'SSID': ssid,
        'ConnectionType': connectionType,
        'ConnectionMode': connectionMode,
        'MSM': msm,
        'AutoSwitch': autoSwitch
      }
    },
    profiles
  }
}
