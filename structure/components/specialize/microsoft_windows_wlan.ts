import { wlanProfiles, type WlanProfiles } from "./microsoft_windows_wlan/wlan_profiles.ts";

export function microsoftWindowsWlan(profiles : WlanProfiles) {
  return {
    'component': {
      '@name': 'Microsoft-Windows-WLAN',
      '@processorArchitecture': 'amd64',
      '@publicKeyToken': '31bf3856ad364e35',
      '@language': 'neutral',
      '@versionScope': 'nonSxS',
      '@xmlns:wcm': 'http://schemas.microsoft.com/WMIConfig/2002/State',
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'WLANProfiles': wlanProfiles(profiles)
    }
  }
}
