import { wlanProfile, WlanProfile } from "./wlan_profile.ts";

/** Configures WLAN profiles for network connections. */
export type WlanProfiles = WlanProfile[]

export function wlanProfiles(profiles : WlanProfiles) {
  return {
    'WLANProfiles': profiles.map((profile) => wlanProfile(profile))
  }
}
