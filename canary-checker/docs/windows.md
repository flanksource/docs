---
title: Windows
description: Installing canary-checker on a windows os
---

# Quick Start

Installing Canary Checker as a Windows service.

## 1. Check prerequisites

To run Canary Checker on windows please ensure the following

1. Your Windows machine has access to the internet, if not you can copy the [Powershell Install Script](https://link-url-here.org) , the [Canary Checker Executable](https://link-url-here.org) and the [NSSM tool](https://nssm.cc/release/nssm-2.24.zip) to a local folder.

2. You must be able to run the powershell install script as a local administrator
3. Canary Checker uses an embedded Postgres DB which requires [Microsoft Visual C++ 2015-2022 Redistributable (x64) - 14.38.33130](https://www.microsoft.com/en-us/Download/confirmation.aspx?id=52685)

4. Canary checker uses port 8080 (can be changed) for the HTTP API and port 6432 for the embedded postgresql server , ensure these ports are free

## 2. Downloading required files

You only need the powershell script below(assuming internet connectivity). Place it in the folder you wish to install Canary Checker in.

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri https://github.com/flanksource/canary-checker/blob/master/install-service.ps1 -OutFile install-service.ps1
```

### (Optional)

If you require a [specific version of Canary Checker](https://github.com/flanksource/canary-checker/releases) or want to build your own to test, place the executable in the same folder as the required powershell script above. Otherwise, the powershell install script downloads the latest release.

## 3. Create a canary

```powershell
 @'
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check
spec:
  interval: 30
  http:
    - name: http pass response 200 status code
      url: https://httpbin.demo.aws.flanksource.com/status/200
'@ | out-file -encoding ASCII $pwd\canary-checker.yaml
```

### (Optional)

To test our canary config without installing it, use the below

```powershell
.\canary-checker.exe run canary-checker.yaml
```

## 4. Install Canary Checker as a service

The powershell install script is able to download all requirements, if the windows machine does not have internet access you might need to manually download the [prerequisites](/##-1.-check-prerequisites) and place them in the script folder.

```
.\install-service.ps1 -configfile .\canary-checker.yaml -operation install
```

Note: Add `-httpPort 8081` to change http port (default is 8080)

Note: You can use the `-operation uninstall` to remove the service Or `-operation reinstall` to overwrite an exiting install
