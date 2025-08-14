import * as xml from "jsr:@libs/xml";


Deno.writeTextFileSync(
  './structure/components/windows_pe/microsoft_windows_win_pe.json',
  JSON.stringify(xml.parse(Deno.readTextFileSync('./structure/components/windows_pe/microsoft_windows_win_pe.xml')), null, 2)
)
