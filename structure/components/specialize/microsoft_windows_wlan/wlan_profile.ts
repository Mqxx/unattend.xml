export function wlanProfile(
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
    
  }
}
