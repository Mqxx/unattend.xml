import { component } from "../../component.ts";
import { wlanProfiles, type WlanProfiles } from "./microsoft_windows_wlan/wlan_profiles.ts";

/**
 * Configures wireless network settings, such as Wi-Fi profiles
 * 
 * @param profiles List of WLAN profiles
 */
export function microsoftWindowsWlan(profiles : WlanProfiles) {
  return component(
    'Microsoft-Windows-WLAN',
    {'WLANProfiles': wlanProfiles(profiles)}
  )
}
