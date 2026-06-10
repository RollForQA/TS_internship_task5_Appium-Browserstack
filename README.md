# Pixel Clock Appium Tests

[![BrowserStack Appium](https://github.com/RollForQA/TS_internship_task5_Appium-Browserstack/actions/workflows/browserstack.yml/badge.svg)](https://github.com/RollForQA/TS_internship_task5_Appium-Browserstack/actions/workflows/browserstack.yml)

Mobile automation test project for the native Android Pixel Clock app, built with WebdriverIO, Appium, TypeScript, BrowserStack App Automate, GitHub Actions, and Allure reports.

## Application Under Test

- App: Pixel Clock
- Package: `com.google.android.deskclock`
- Activity: `com.android.deskclock.DeskClock`
- Local device: Android Emulator / Pixel 6 API 34
- BrowserStack device: Samsung Galaxy S23 / Android 13.0

The app was chosen because it is a native Android application with clear Alarm, Clock, Timer, and Stopwatch workflows. It does not require accounts, network access, or external test data.

## Test Coverage

The implemented test cases are documented in [TEST_CASES.md](./TEST_CASES.md).

| ID | Scenario |
| --- | --- |
| TC-01 | Navigate between Alarm, Clock, Timer, and Stopwatch screens |
| TC-02 | Create an alarm with a label |
| TC-03 | Edit an alarm label |
| TC-04 | Start and pause a timer |
| TC-05 | Record and reset a stopwatch lap |

## Project Structure

```text
test/
  screens/       Screen objects for Clock app areas
  specs/         WDIO test specs
  support/       Shared app reset helpers
```

Key config files:

- `wdio.local.conf.ts` - local Android emulator run
- `wdio.browserstack.conf.ts` - BrowserStack App Automate run
- `wdio.shared.conf.ts` - shared WDIO, Mocha, and Allure settings
- `.github/workflows/browserstack.yml` - CI run on GitHub Actions

## Setup

Install dependencies:

```powershell
npm ci
```

Check TypeScript:

```powershell
npm run typecheck
```

For a local emulator run, start an Android emulator or connect a device, then verify it:

```powershell
adb devices -l
npm run test:local
```

## BrowserStack Run

The BrowserStack config reads credentials from environment variables. Do not commit real credentials to the repository.

```powershell
$env:BROWSERSTACK_USERNAME = "your_username"
$env:BROWSERSTACK_ACCESS_KEY = "your_access_key"
$env:BROWSERSTACK_APP_ID = "bs://your_app_id"
npm run test:browserstack
```

Required GitHub repository secrets:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`
- `BROWSERSTACK_APP_ID`

The GitHub Actions workflow runs on `main` pushes and can also be started manually from the Actions tab.

## Reports

The project uses the WDIO spec reporter and Allure reporter.

Generate and open a local Allure report:

```powershell
npm run allure:generate
npm run allure:open
```

In CI, the generated Allure report is uploaded as a GitHub Actions artifact.

## Evidence

- GitHub Actions run: [BrowserStack Appium #5](https://github.com/RollForQA/TS_internship_task5_Appium-Browserstack/actions/runs/27279688569)
- BrowserStack public build: [Pixel Clock GitHub Actions CI 27279688569](https://app-automate.browserstack.com/dashboard/v2/public-build/cVN3OXo4Q09hczdQQ1NoelV3b3E4d0dVTnAxMmlIUGt3VGZScktKRzE3Y3V5MTF0bGVsMHp6V0pPNGpUMWxxb2lkbzVmMEhIeW5Ed0NkcHZIV3E2bXc9PS0tb1hJOTIvZjRIUGpubEZra0V4bUt2Zz09--5645d76131c962564a608d8db339a87637b5388e)

![GitHub Actions success](./docs/github-actions-success.png)

![BrowserStack build success](./docs/browserstack-build-success.png)

## Useful Commands

```powershell
npm run typecheck
npm run test:local
npm run test:browserstack
npm run allure:generate
npm run allure:open
npm run appium:doctor
```
