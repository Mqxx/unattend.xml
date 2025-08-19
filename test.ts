import * as xml from "jsr:@libs/xml";
import { microsoftWindowsWlan } from "./structure/components/specialize/microsoft_windows_wlan.ts";

console.log(xml.stringify(microsoftWindowsWlan([{
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
