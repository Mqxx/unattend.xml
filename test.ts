import * as xml from "jsr:@libs/xml";
import { wlanProfiles } from "./structure/components/specialize/microsoft_windows_wlan/wlan_profiles.ts";


Deno.writeTextFileSync(
  './structure/components/windows_pe/microsoft_windows_win_pe.json',
  JSON.stringify(xml.parse(Deno.readTextFileSync('./structure/components/windows_pe/microsoft_windows_win_pe.xml')), null, 2)
)

console.log(xml.stringify(wlanProfiles().add(
  'MyWiFiProfile',
  'MyWiFiNetwork',
  'ESS',
  'auto',
  {
    security: {
      authEncryption: {
        authentication: 'WPA2PSK',
        encryption: 'AES',
        useOneX: false
      },
      sharedKey: {
        keyType: 'passPhrase',
        protected: true,
        keyMaterial: 'MyWiFiPassword'
      }
    }
  }
)));
