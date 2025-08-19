/**
 * Describes a simple component.
 * 
 * @param name Name of the component
 * @param children Child elements
 */
export function component(
  name : string,
  children : Record<string, unknown>
) {
  return {
    'component': {
      '@name': name,
      '@processorArchitecture': 'amd64',
      '@publicKeyToken': '31bf3856ad364e35',
      '@language': 'neutral',
      '@versionScope': 'nonSxS',
      '@xmlns:wcm': 'http://schemas.microsoft.com/WMIConfig/2002/State',
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      ...children
    }
  }
}
