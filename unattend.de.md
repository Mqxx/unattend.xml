# Dokumentation der `unattend.xml` für Windows 11

## Einführung

Die `unattend.xml`-Datei ist eine XML-basierte Antwortdatei, die während der Windows-Installation verwendet wird, um das Setup zu automatisieren. Sie wird typischerweise mit dem **Windows System Image Manager (SIM)**, einem Bestandteil des **Windows Assessment and Deployment Kit (ADK)**, erstellt. Die Datei definiert Einstellungen für verschiedene Phasen der Windows-Installation, wie z. B. die **Windows Preinstallation Environment (WinPE)**, **Specialize** oder **Out-of-Box Experience (OOBE)**. Sie kann auf einem USB-Stick, im Stammverzeichnis des Installationsmediums oder in bestimmten Verzeichnissen des Windows-Images (z. B. `%WINDIR%\Panther`) abgelegt werden.

Der Name der Datei ist wichtig:
- **`autounattend.xml`**: Wird automatisch während der WinPE-Phase erkannt, wenn sie im Stammverzeichnis eines USB-Sticks oder Installationsmediums liegt.
- **`unattend.xml`**: Wird in späteren Phasen (z. B. OOBE) verwendet oder wenn sie explizit mit dem Setup-Befehl `/unattend:<Pfad>` angegeben wird.

## Grundstruktur der `unattend.xml`

Die `unattend.xml` besteht aus einer hierarchischen XML-Struktur, die in mehrere **Konfigurationspässe** unterteilt ist. Jeder Pass entspricht einer Phase der Windows-Installation. Die grundlegende Struktur sieht wie folgt aus:

```xml
<?xml version="1.0" encoding="utf-8"?>
<unattend xmlns="urn:schemas-microsoft-com:unattend">
    <settings pass="windowsPE">
        <!-- Einstellungen für die WinPE-Phase -->
    </settings>
    <settings pass="offlineServicing">
        <!-- Einstellungen für Offline-Bildbearbeitung -->
    </settings>
    <settings pass="specialize">
        <!-- Einstellungen für die Spezialisierungsphase -->
    </settings>
    <settings pass="oobeSystem">
        <!-- Einstellungen für die OOBE-Phase -->
    </settings>
    <!-- Weitere Pässe wie generalize, auditSystem, auditUser -->
</unattend>
```

### Wichtige XML-Attribute und Namespaces
- **XML-Version und Encoding**: Die Datei beginnt mit `<?xml version="1.0" encoding="utf-8"?>`, um das XML-Format und die Zeichenkodierung zu definieren.
- **Namespace**: Der `unattend`-Tag verwendet den Namespace `urn:schemas-microsoft-com:unattend`, um die Schema-Definitionen für die Windows-Setup-Komponenten zu referenzieren.
- **Settings-Pass**: Jedes `<settings>`-Element definiert einen Konfigurationspass (z. B. `windowsPE`, `specialize`, `oobeSystem`), der die Phase der Installation angibt, in der die Einstellungen angewendet werden.

## Konfigurationspässe

Die `unattend.xml` unterstützt mehrere Konfigurationspässe, die jeweils spezifische Aufgaben während der Installation abdecken. Hier sind die wichtigsten Pässe und ihre Verwendung:

1. **windowsPE**: 
   - Wird während der Windows Preinstallation Environment-Phase ausgeführt.
   - Konfiguriert grundlegende Setup-Optionen wie Sprache, Tastaturlayout, Festplattenpartitionierung und die Auswahl des Windows-Images.
   - Typische Komponenten: `Microsoft-Windows-International-Core-WinPE`, `Microsoft-Windows-Setup`.

2. **offlineServicing**:
   - Wird auf ein offline Windows-Image angewendet, z. B. mit DISM (Deployment Image Servicing and Management).
   - Dient zum Hinzufügen von Treibern, Updates oder Sprachpaketen vor der Installation.
   - Typische Komponente: `Microsoft-Windows-PnpCustomizationsNonWinPE`.

3. **specialize**:
   - Wird nach dem ersten Neustart nach der Installation ausgeführt.
   - Konfiguriert systemspezifische Einstellungen wie Computernamen, Zeitzone, Netzwerkeinstellungen und Produktaktivierung.
   - Typische Komponenten: `Microsoft-Windows-Shell-Setup`, `Microsoft-Windows-International-Core`.

4. **oobeSystem**:
   - Wird während der Out-of-Box Experience (OOBE) ausgeführt, dem interaktiven Setup, das Benutzer normalerweise beim ersten Start sehen.
   - Automatisiert Benutzerkontoerstellung, Datenschutzeinstellungen und OOBE-Dialoge.
   - Typische Komponenten: `Microsoft-Windows-Shell-Setup`, `Microsoft-Windows-Deployment`.

5. **generalize**:
   - Wird bei der Vorbereitung eines Images mit `sysprep /generalize` verwendet, um hardwareabhängige Einstellungen zu entfernen.
   - Typische Komponente: `Microsoft-Windows-Security-SPP`.

6. **auditSystem** und **auditUser**:
   - Wird im Audit-Modus verwendet, um zusätzliche Anpassungen oder Tests an einem System vorzunehmen.
   - Typische Komponenten: `Microsoft-Windows-Deployment`.

## Wichtige Komponenten und Einstellungen

Jeder Konfigurationspass enthält **Komponenten**, die spezifische Windows-Setup-Funktionen steuern. Hier sind einige der häufigsten Komponenten und ihre Einstellungen:

### 1. `Microsoft-Windows-International-Core-WinPE` (windowsPE)
Diese Komponente definiert regionale Einstellungen für die WinPE-Phase.

```xml
<component name="Microsoft-Windows-International-Core-WinPE" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <SetupUILanguage>
        <UILanguage>de-DE</UILanguage>
    </SetupUILanguage>
    <InputLocale>0407:00000407</InputLocale>
    <SystemLocale>de-DE</SystemLocale>
    <UILanguage>de-DE</UILanguage>
    <UILanguageFallback>de-DE</UILanguageFallback>
    <UserLocale>de-DE</UserLocale>
</component>
```

- **SetupUILanguage**: Definiert die Sprache der Setup-Benutzeroberfläche (z. B. `de-DE` für Deutsch).
- **InputLocale**: Legt das Tastaturlayout fest (z. B. `0407:00000407` für Deutsch).
- **SystemLocale**, **UILanguage**, **UserLocale**: Definieren die Systemsprache, Benutzeroberflächensprache und Benutzerregion.

### 2. `Microsoft-Windows-Setup` (windowsPE)
Diese Komponente steuert die Setup-Konfiguration, einschließlich Festplattenpartitionierung und Lizenzvereinbarung.

```xml
<component name="Microsoft-Windows-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <DiskConfiguration>
        <Disk wcm:action="add">
            <DiskID>0</DiskID>
            <WillWipeDisk>true</WillWipeDisk>
            <CreatePartitions>
                <CreatePartition wcm:action="add">
                    <Order>1</Order>
                    <Size>100</Size>
                    <Type>EFI</Type>
                </CreatePartition>
                <CreatePartition wcm:action="add">
                    <Order>2</Order>
                    <Size>16</Size>
                    <Type>MSR</Type>
                </CreatePartition>
                <CreatePartition wcm:action="add">
                    <Order>3</Order>
                    <Extend>true</Extend>
                    <Type>Primary</Type>
                </CreatePartition>
            </CreatePartitions>
            <ModifyPartitions>
                <ModifyPartition wcm:action="add">
                    <Order>1</Order>
                    <PartitionID>1</PartitionID>
                    <Format>FAT32</Format>
                    <Label>System</Label>
                </ModifyPartition>
                <ModifyPartition wcm:action="add">
                    <Order>2</Order>
                    <PartitionID>3</PartitionID>
                    <Format>NTFS</Format>
                    <Label>Windows</Label>
                    <Letter>C</Letter>
                </ModifyPartition>
            </ModifyPartitions>
        </Disk>
    </DiskConfiguration>
    <UserData>
        <AcceptEula>true</AcceptEula>
        <Organization>Firma Mustermann</Organization>
        <FullName>Max Mustermann</FullName>
    </UserData>
</component>
```

- **DiskConfiguration**: Definiert die Partitionierung der Festplatte (z. B. EFI- und Primärpartitionen für UEFI-Systeme).
- **UserData**: Akzeptiert die Lizenzvereinbarung (`AcceptEula`) und legt Benutzer- oder Organisationsdaten fest.
- **ImageInstall**: Gibt an, welches Windows-Image installiert werden soll (z. B. Windows 11 Pro).

### 3. `Microsoft-Windows-Shell-Setup` (specialize, oobeSystem)
Diese Komponente konfiguriert System- und Benutzereinstellungen.

#### Beispiel für specialize:
```xml
<component name="Microsoft-Windows-Shell-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <ComputerName>PC01</ComputerName>
    <TimeZone>W. Europe Standard Time</TimeZone>
    <ProductKey>VK7JG-NPHTM-C97JM-9MPGT-3V66T</ProductKey>
</component>
```

- **ComputerName**: Setzt den Namen des Computers.
- **TimeZone**: Legt die Zeitzone fest (z. B. `W. Europe Standard Time` für MEZ).
- **ProductKey**: Gibt einen generischen KMS-Schlüssel oder MAK-Schlüssel an.

#### Beispiel für oobeSystem:
```xml
<component name="Microsoft-Windows-Shell-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <OOBE>
        <HideEULAPage>true</HideEULAPage>
        <HideOEMRegistrationScreen>true</HideOEMRegistrationScreen>
        <HideOnlineAccountScreens>true</HideOnlineAccountScreens>
        <HideWirelessSetupInOOBE>true</HideWirelessSetupInOOBE>
        <ProtectYourPC>3</ProtectYourPC>
    </OOBE>
    <UserAccounts>
        <LocalAccounts>
            <LocalAccount wcm:action="add">
                <Password>
                    <Value>P@ssword</Value>
                    <PlainText>true</PlainText>
                </Password>
                <Name>Admin</Name>
                <Group>Administrators</Group>
            </LocalAccount>
        </LocalAccounts>
    </UserAccounts>
</component>
```

- **OOBE**: Automatisiert die OOBE-Phase, z. B. durch Ausblenden von Dialogen (`HideEULAPage`, `HideOnlineAccountScreens`) oder Deaktivieren von Telemetrie (`ProtectYourPC=3`).
- **UserAccounts**: Erstellt lokale Benutzerkonten, einschließlich Passwort und Gruppenzugehörigkeit.

### 4. `Microsoft-Windows-Deployment` (oobeSystem)
Diese Komponente steuert Bereitstellungsoptionen, z. B. den Audit-Modus oder die Ausführung von Skripten.

```xml
<component name="Microsoft-Windows-Deployment" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Reseal>
        <Mode>Audit</Mode>
    </Reseal>
</component>
```

- **Reseal**: Startet das System im Audit-Modus, um zusätzliche Anpassungen vorzunehmen.

## Beispiel einer vollständigen `unattend.xml`

Hier ist ein Beispiel für eine vollständige `unattend.xml`, die eine Windows 11-Installation für ein UEFI-System mit deutscher Sprache, automatisierter Partitionierung, lokalem Benutzerkonto und deaktivierten OOBE-Dialogen konfiguriert:

```xml
<?xml version="1.0" encoding="utf-8"?>
<unattend xmlns="urn:schemas-microsoft-com:unattend">
    <settings pass="windowsPE">
        <component name="Microsoft-Windows-International-Core-WinPE" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <SetupUILanguage>
                <UILanguage>de-DE</UILanguage>
            </SetupUILanguage>
            <InputLocale>0407:00000407</InputLocale>
            <SystemLocale>de-DE</SystemLocale>
            <UILanguage>de-DE</UILanguage>
            <UILanguageFallback>de-DE</UILanguageFallback>
            <UserLocale>de-DE</UserLocale>
        </component>
        <component name="Microsoft-Windows-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <DiskConfiguration>
                <Disk wcm:action="add">
                    <DiskID>0</DiskID>
                    <WillWipeDisk>true</WillWipeDisk>
                    <CreatePartitions>
                        <CreatePartition wcm:action="add">
                            <Order>1</Order>
                            <Size>100</Size>
                            <Type>EFI</Type>
                        </CreatePartition>
                        <CreatePartition wcm:action="add">
                            <Order>2</Order>
                            <Size>16</Size>
                            <Type>MSR</Type>
                        </CreatePartition>
                        <CreatePartition wcm:action="add">
                            <Order>3</Order>
                            <Extend>true</Extend>
                            <Type>Primary</Type>
                        </CreatePartition>
                    </CreatePartitions>
                    <ModifyPartitions>
                        <ModifyPartition wcm:action="add">
                            <Order>1</Order>
                            <PartitionID>1</PartitionID>
                            <Format>FAT32</Format>
                            <Label>System</Label>
                        </ModifyPartition>
                        <ModifyPartition wcm:action="add">
                            <Order>2</Order>
                            <PartitionID>3</PartitionID>
                            <Format>NTFS</Format>
                            <Label>Windows</Label>
                            <Letter>C</Letter>
                        </ModifyPartition>
                    </ModifyPartitions>
                </Disk>
            </DiskConfiguration>
            <UserData>
                <AcceptEula>true</AcceptEula>
                <Organization>Firma Mustermann</Organization>
                <FullName>Max Mustermann</FullName>
            </UserData>
        </component>
    </settings>
    <settings pass="specialize">
        <component name="Microsoft-Windows-Shell-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <ComputerName>PC01</ComputerName>
            <TimeZone>W. Europe Standard Time</TimeZone>
            <ProductKey>VK7JG-NPHTM-C97JM-9MPGT-3V66T</ProductKey>
        </component>
    </settings>
    <settings pass="oobeSystem">
        <component name="Microsoft-Windows-Shell-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <OOBE>
                <HideEULAPage>true</HideEULAPage>
                <HideOEMRegistrationScreen>true</HideOEMRegistrationScreen>
                <HideOnlineAccountScreens>true</HideOnlineAccountScreens>
                <HideWirelessSetupInOOBE>true</HideWirelessSetupInOOBE>
                <ProtectYourPC>3</ProtectYourPC>
            </OOBE>
            <UserAccounts>
                <LocalAccounts>
                    <LocalAccount wcm:action="add">
                        <Password>
                            <Value>P@ssword</Value>
                            <PlainText>true</PlainText>
                        </Password>
                        <Name>Admin</Name>
                        <Group>Administrators</Group>
                    </LocalAccount>
                </LocalAccounts>
            </UserAccounts>
        </component>
        <component name="Microsoft-Windows-Deployment" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <Reseal>
                <Mode>OOBE</Mode>
            </Reseal>
        </component>
    </settings>
</unattend>
```

## Erstellen einer `unattend.xml`

Die `unattend.xml` wird üblicherweise mit dem **Windows System Image Manager (SIM)** erstellt, das im Windows ADK enthalten ist. Hier ist eine Schritt-für-Schritt-Anleitung:

1. **Windows ADK installieren**:
   - Lade das Windows ADK von der Microsoft-Website herunter und installiere es.
   - Stelle sicher, dass die Komponente **Deployment Tools** (inklusive Windows SIM) installiert ist.

2. **Windows-Image bereitstellen**:
   - Kopiere die `install.wim`-Datei aus dem `\sources`-Verzeichnis einer Windows 11-ISO in ein Arbeitsverzeichnis (z. B. `C:\Win11-Setup\sources`).

3. **Windows SIM starten**:
   - Öffne den Windows System Image Manager.
   - Wähle unter **Datei > Windows-Bild auswählen** die `install.wim`-Datei aus.
   - Wähle die gewünschte Windows-Edition (z. B. Windows 11 Pro) und erstelle eine Katalogdatei (`.clg`), falls erforderlich.

4. **Neue Antwortdatei erstellen**:
   - Gehe zu **Datei > Neue Antwortdatei**.
   - Füge Komponenten aus dem Bereich **Windows-Image** hinzu, indem du sie per Rechtsklick zu den gewünschten Konfigurationspässen hinzufügst.
   - Konfiguriere die Einstellungen im Bereich **Eigenschaften**.

5. **Antwortdatei speichern**:
   - Speichere die Datei als `autounattend.xml` oder `unattend.xml`.
   - Validiere die Datei unter **Extras > Antwortdatei validieren**, um Syntaxfehler zu vermeiden.

6. **Antwortdatei bereitstellen**:
   - Kopiere die `autounattend.xml` in das Stammverzeichnis eines USB-Sticks oder in das Verzeichnis `%WINDIR%\Panther` des Windows-Images.
   - Alternativ starte das Setup mit dem Befehl: `setup.exe /unattend:<Pfad_zur_unattend.xml>`.

## Wichtige Hinweise

- **Sensible Daten**: Vermeide das Speichern von Passwörtern oder Produktschlüsseln im Klartext. Setze `<PlainText>false</PlainText>` und verschlüssle Passwörter, wenn möglich. Alternativ kannst du sensible Daten aus der Datei entfernen, nachdem die Installation abgeschlossen ist.[](https://learn.microsoft.com/de-de/windows-hardware/manufacture/desktop/windows-setup-automation-overview?view=windows-11)
- **UEFI vs. BIOS**: Die Partitionierungskonfiguration unterscheidet sich je nach Systemtyp. UEFI-Systeme benötigen EFI- und MSR-Partitionen, während BIOS-Systeme eine einfache Primärpartition verwenden.[](https://learn.microsoft.com/de-de/windows-hardware/manufacture/desktop/automate-windows-setup?view=windows-11)
- **Fehlersuche**: Wenn die Festplatte nicht erkannt wird (z. B. auf Geräten mit VMD-Controller), füge die erforderlichen Treiber in die `install.wim` oder `boot.wim` ein.[](https://www.computerbase.de/forum/threads/windows-11-installation-mit-autounattend-xml-festplatte-wird-nicht-erkannt.2158453/)
- **OOBE-Automatisierung**: Um den Online-Kontozwang in Windows 11 Home zu umgehen, setze `HideOnlineAccountScreens` auf `true` oder erstelle ein lokales Konto.[](https://u-labs.de/portal/windows-10-11-mit-2-klicks-automatisch-installieren-windows-11-beschraenkungen-entfernen/)
- **Dokumentation**: Die vollständige Referenz für alle Komponenten und Einstellungen findest du in der **Microsoft-Dokumentation für unbeaufsichtigte Windows-Installationen** (siehe [Microsoft Learn](https://learn.microsoft.com/de-de/windows-hardware/manufacture/desktop/windows-setup-automation-overview)).[](https://learn.microsoft.com/de-de/windows-hardware/manufacture/desktop/update-windows-settings-and-scripts-create-your-own-answer-file-sxs?view=windows-11)

## Ressourcen
- **Microsoft Learn**: [Automatisieren von Windows Setup](https://learn.microsoft.com/de-de/windows-hardware/manufacture/desktop/automate-windows-setup)[](https://learn.microsoft.com/de-de/windows-hardware/manufacture/desktop/automate-windows-setup?view=windows-11)
- **Microsoft Learn**: [Referenz für unbeaufsichtigte Windows-Installation](https://learn.microsoft.com/de-de/windows-hardware/manufacture/desktop/unattended-windows-setup-reference)[](https://learn.microsoft.com/de-de/windows-hardware/manufacture/desktop/update-windows-settings-and-scripts-create-your-own-answer-file-sxs?view=windows-11)
- **Windows System Image Manager**: Teil des Windows ADK, verfügbar unter [Microsoft ADK-Download](https://www.microsoft.com/en-us/download/details.aspx?id=103440).
- **Beispielskripte**: Siehe [WindowsPro](https://www.windowspro.de) für praktische Beispiele zur OOBE-Automatisierung.[](https://www.windowspro.de/wolfgang-sommergut/windows-11-antwortdatei-installieren-dialoge-fuer-privatsphaere-benutzerkonto)
