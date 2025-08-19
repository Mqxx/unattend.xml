import * as xml from "jsr:@libs/xml";
import { wlanProfiles } from "./structure/components/specialize/microsoft_windows_wlan/wlan_profiles.ts";

console.log(xml.stringify(wlanProfiles([{
  autoSwitch: true,
  connectionMode: "auto",
  connectionType: "ESS",
  profileName: 'MyWiFiProfile',
  ssid: 'MyWiFiNetwork',
  msm: {
    security: {
      authEncryption: {
        authentication: "WPA2PSK",
        encryption: "AES",
        useOneX: false
      },
      sharedKey: {
        keyMaterial: 'MyWiFiPassword',
        keyType: "passPhrase",
        protected: false
      }
    }
  }
}])));
