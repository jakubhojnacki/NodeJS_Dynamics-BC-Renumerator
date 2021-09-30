# Dynamics Renumberator

![Dynamics Renumberator](/res/img/logo120x120.png)

## Overview

Tool to renumber Dynamics (AL) solution from one range of IDs to another.

The source of IDs for renumberation is nHanced ID Manager Dynamics application to which Dynamics Renumberator connects through API (REST web service).

## Usage

```
node main.js "{solution_folder_path}" [-s "{settings_file_path}"] [-d [-dd "{debug_folder_path}"]]
```

Where:

| Parameter               | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| {solution_folder_path}  | Path to a folder with solution to be renumbered              |
| -s {settings_file_path} | Path to settings file (if not provided, "settings.json" file from "main.js" folder is used) |
| -d                      | Debug mode - the application starts providing more detailed information about its activities |
| -dd {debug_folder_path} | Optional debug folder path where the application dumps some extra debug information (as files) |

## Settings

Settings are stored in a JSON file. As default, "settings.json" file (from main folder) is used.

```
{
    "general" : {
        "renumberationCode": "{renumberation_code}",
        "endOfLineType": "{end_of_line_type}"
    },
    "ignore": {
        "directories": [
            "{directory_ignore_pattern}",
            "{directory_ignore_pattern}",
            ...
        ],
        "files": [
            "{file_ignore_pattern}",
            "{file_ignore_pattern}",
            ...
        ]
    },
    "dynamicsWebService": {
        "protocol": "{protocol}",
        "server": "{server}",
        "port": {port},
        "instance": "{instance}",
        "user": "{user}",
        "password": "{password}",
        "apiPublisher": "the365People",
        "apiGroup": "nHancedIdManager",
        "apiVersion": "1.0",
        "companyId": "{company_id}"
    }
}
```

Where:

| Parameter                  | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| {renumberation_code}       | Code of renumberation which has to exist in nHanced ID Manager. Renumberation holds information about target range used to renumber all objects |
| {end_of_line_type}         | End of line type applied to renumbered files. There are the following choices:<br />- windows: Windows end of line is used (CR LF or  /r/n) <br />- linux: Linux end of line is used (LF or /n) |
| {directory_ignore_pattern} | Pattern for a directory to be ignored. Characters like "*" and "?" can be used |
| {file_ignore_pattern}      | SImilar pattern for files                                    |
| {protocol}                 | Protocol used for connecting to a web service. There are the following choices:<br />- http: Standard HTTP protocol,<br />- https: Secure HTTPS protocol |
| {server}                   | Address of the server hosting web services                   |
| {port}                     | Port of web services service                                 |
| {instance}                 | Web services service instance                                |
| {user}                     | User for web service authentication                          |
| {password}                 | Password for web service authentication                      |
| {company_id}               | ID (GUID) of a company in ID manager databaase               |

## Changelog

### Version 2

#### 2.0.0 - 22/09/2021 - JH
- First new generation version working
- Connecting to ID manager via web services
- Translating manifests, AL files, permission set files

#### 2.1.0 - 22/09/2021 - JH
- Better progress information  
- Some housekeeping done

#### 2.1.1 - 22/09/2021 - JH
- Web service call bugfixes
- Progress display fixed
- ODATA filter fixed
