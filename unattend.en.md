# Documentation of `unattend.xml` for Windows 11

## Introduction

The `unattend.xml` (or `autounattend.xml`) file is an XML-based answer file used to automate and customize the Windows 11 installation process. It allows predefining settings such as language, disk partitioning, user accounts, privacy options, and more, eliminating the need for manual input during setup. Typically, it is created using the **Windows System Image Manager (SIM)**, a component of the **Windows Assessment and Deployment Kit (ADK)**. The file can be placed on a USB drive, in the root directory of the installation media, or in specific directories of the Windows image (e.g., `%WINDIR%\Panther`).

The file name matters:
- **`autounattend.xml`**: Automatically detected during the Windows Preinstallation Environment (WinPE) phase if placed in the root of a USB drive or installation media.
- **`unattend.xml`**: Used in later phases (e.g., OOBE) or when explicitly specified with the setup command `/unattend:<path>`.

## Basic Structure of `unattend.xml`

The `unattend.xml` follows a hierarchical XML structure, organized into multiple **configuration passes**, each corresponding to a phase of the Windows installation. The basic structure is as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<unattend xmlns="urn:schemas-microsoft-com:unattend">
    <settings pass="windowsPE">
        <!-- Settings for the WinPE phase -->
    </settings>
    <settings pass="offlineServicing">
        <!-- Settings for offline image servicing -->
    </settings>
    <settings pass="specialize">
        <!-- Settings for the specialize phase -->
    </settings>
    <settings pass="oobeSystem">
        <!-- Settings for the OOBE phase -->
    </settings>
    <!-- Additional passes like generalize, auditSystem, auditUser -->
</unattend>
```

### Key XML Attributes and Namespaces
- **XML Version and Encoding**: The file starts with `<?xml version="1.0" encoding="utf-8"?>` to define the XML format and character encoding.
- **Namespace**: The `unattend` tag uses the namespace `urn:schemas-microsoft-com:unattend` to reference schema definitions for Windows setup components.
- **Settings Pass**: Each `<settings>` element specifies a configuration pass (e.g., `windowsPE`, `specialize`, `oobeSystem`), indicating the installation phase where the settings apply.

## Configuration Passes

The `unattend.xml` supports several configuration passes, each addressing specific tasks during installation. Below are the main passes and their purposes:

1. **windowsPE**:
   - Executed during the Windows Preinstallation Environment phase.
   - Configures basic setup options like language, keyboard layout, disk partitioning, and Windows image selection.
   - Common components: `Microsoft-Windows-International-Core-WinPE`, `Microsoft-Windows-Setup`.

2. **offlineServicing**:
   - Applied to an offline Windows image, e.g., using DISM (Deployment Image Servicing and Management).
   - Used to add drivers, updates, or language packs before installation.
   - Common component: `Microsoft-Windows-PnpCustomizationsNonWinPE`.

3. **specialize**:
   - Runs after the first reboot following installation.
   - Configures system-specific settings like computer name, time zone, network settings, and product activation.
   - Common components: `Microsoft-Windows-Shell-Setup`, `Microsoft-Windows-International-Core`.

4. **oobeSystem**:
   - Executed during the Out-of-Box Experience (OOBE), the interactive setup users typically see on first boot.
   - Automates user account creation, privacy settings, and OOBE dialogs.
   - Common components: `Microsoft-Windows-Shell-Setup`, `Microsoft-Windows-Deployment`.

5. **generalize**:
   - Used when preparing an image with `sysprep /generalize` to remove hardware-specific settings.
   - Common component: `Microsoft-Windows-Security-SPP`.

6. **auditSystem** and **auditUser**:
   - Used in Audit Mode for additional customizations or testing.
   - Common components: `Microsoft-Windows-Deployment`.

## Key Components and Settings

Each configuration pass contains **components** that control specific Windows setup functions. Below are some of the most common components and their settings:

### 1. `Microsoft-Windows-International-Core-WinPE` (windowsPE)
This component defines regional settings for the WinPE phase.

```xml
<component name="Microsoft-Windows-International-Core-WinPE" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <SetupUILanguage>
        <UILanguage>en-US</UILanguage>
    </SetupUILanguage>
    <InputLocale>0409:00000409</InputLocale>
    <SystemLocale>en-US</SystemLocale>
    <UILanguage>en-US</UILanguage>
    <UILanguageFallback>en-US</UILanguageFallback>
    <UserLocale>en-US</UserLocale>
</component>
```

- **SetupUILanguage**: Specifies the language of the setup UI (e.g., `en-US` for English).
- **InputLocale**: Sets the keyboard layout (e.g., `0409:00000409` for US English).
- **SystemLocale**, **UILanguage**, **UserLocale**: Define the system language, UI language, and user region.

### 2. `Microsoft-Windows-Setup` (windowsPE)
This component controls setup configuration, including disk partitioning and license agreement.

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
        <Organization>Example Corp</Organization>
        <FullName>John Doe</FullName>
    </UserData>
</component>
```

- **DiskConfiguration**: Defines disk partitioning (e.g., EFI and primary partitions for UEFI systems).
- **UserData**: Accepts the EULA (`AcceptEula`) and sets user or organization details.
- **ImageInstall**: Specifies which Windows image to install (e.g., Windows 11 Pro).

### 3. `Microsoft-Windows-Shell-Setup` (specialize, oobeSystem)
This component configures system and user settings.

#### Example for specialize:
```xml
<component name="Microsoft-Windows-Shell-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <ComputerName>PC01</ComputerName>
    <TimeZone>Pacific Standard Time</TimeZone>
    <ProductKey>VK7JG-NPHTM-C97JM-9MPGT-3V66T</ProductKey>
</component>
```

- **ComputerName**: Sets the computer name.
- **TimeZone**: Specifies the time zone (e.g., `Pacific Standard Time`).
- **ProductKey**: Provides a generic KMS or MAK key.

#### Example for oobeSystem:
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

- **OOBE**: Automates the OOBE phase, e.g., hiding dialogs (`HideEULAPage`, `HideOnlineAccountScreens`) or disabling telemetry (`ProtectYourPC=3`).
- **UserAccounts**: Creates local user accounts, including password and group membership.

### 4. `Microsoft-Windows-Deployment` (oobeSystem)
This component controls deployment options, such as Audit Mode or script execution.

```xml
<component name="Microsoft-Windows-Deployment" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Reseal>
        <Mode>Audit</Mode>
    </Reseal>
</component>
```

- **Reseal**: Boots the system into Audit Mode for further customization.

## Example of a Complete `unattend.xml`

Below is a complete `unattend.xml` example that configures a Windows 11 installation for a UEFI system with English language, automated partitioning, a local user account, and disabled OOBE dialogs:

```xml
<?xml version="1.0" encoding="utf-8"?>
<unattend xmlns="urn:schemas-microsoft-com:unattend">
    <settings pass="windowsPE">
        <component name="Microsoft-Windows-International-Core-WinPE" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <SetupUILanguage>
                <UILanguage>en-US</UILanguage>
            </SetupUILanguage>
            <InputLocale>0409:00000409</InputLocale>
            <SystemLocale>en-US</SystemLocale>
            <UILanguage>en-US</UILanguage>
            <UILanguageFallback>en-US</UILanguageFallback>
            <UserLocale>en-US</UserLocale>
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
                <Organization>Example Corp</Organization>
                <FullName>John Doe</FullName>
            </UserData>
        </component>
    </settings>
    <settings pass="specialize">
        <component name="Microsoft-Windows-Shell-Setup" processorArchitecture="amd64" publicKeyToken="31bf3856ad364e35" language="neutral" versionScope="nonSxS" xmlns:wcm="http://schemas.microsoft.com/WMIConfig/2002/State" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <ComputerName>PC01</ComputerName>
            <TimeZone>Pacific Standard Time</TimeZone>
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

## Creating an `unattend.xml`

The `unattend.xml` is typically created using the **Windows System Image Manager (SIM)**, included in the Windows ADK. Here’s a step-by-step guide:

1. **Install Windows ADK**:
   - Download and install the Windows ADK from the Microsoft website.
   - Ensure the **Deployment Tools** component (including Windows SIM) is installed.

2. **Prepare the Windows Image**:
   - Copy the `install.wim` file from the `\sources` directory of a Windows 11 ISO to a working directory (e.g., `C:\Win11-Setup\sources`).

3. **Launch Windows SIM**:
   - Open the Windows System Image Manager.
   - Go to **File > Select Windows Image** and choose the `install.wim` file.
   - Select the desired Windows edition (e.g., Windows 11 Pro) and create a catalog file (`.clg`) if prompted.

4. **Create a New Answer File**:
   - Go to **File > New Answer File**.
   - Add components from the **Windows Image** pane to the desired configuration passes by right-clicking.
   - Configure settings in the **Properties** pane.

5. **Save the Answer File**:
   - Save the file as `autounattend.xml` or `unattend.xml`.
   - Validate the file under **Tools > Validate Answer File** to check for syntax errors.

6. **Deploy the Answer File**:
   - Copy the `autounattend.xml` to the root of a USB drive or to the `%WINDIR%\Panther` directory of the Windows image.
   - Alternatively, start setup with the command: `setup.exe /unattend:<path_to_unattend.xml>`.

## Important Notes

- **Sensitive Data**: Avoid storing passwords or product keys in plaintext. Use `<PlainText>false</PlainText>` and encrypt passwords if possible. Alternatively, remove sensitive data from the file after installation.
- **UEFI vs. BIOS**: Partitioning configurations differ by system type. UEFI systems require EFI and MSR partitions, while BIOS systems use a simple primary partition.
- **Troubleshooting**: If the disk isn’t detected (e.g., on systems with VMD controllers), inject necessary drivers into `install.wim` or `boot.wim`.
- **OOBE Automation**: To bypass the online account requirement in Windows 11 Home, set `HideOnlineAccountScreens` to `true` or create a local account.
- **Documentation**: The complete reference for all components and settings is available in the **Microsoft Documentation for Unattended Windows Setup** (see [Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/windows-setup-automation-overview)).

## Resources
- **Microsoft Learn**: [Automate Windows Setup](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/automate-windows-setup)
- **Microsoft Learn**: [Unattended Windows Setup Reference](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/unattended-windows-setup-reference)
- **Windows System Image Manager**: Part of the Windows ADK, available at [Microsoft ADK Download](https://www.microsoft.com/en-us/download/details.aspx?id=103440).
- **Example Scripts**: See [TechNet](https://technet.microsoft.com) or similar resources for practical OOBE automation examples.
