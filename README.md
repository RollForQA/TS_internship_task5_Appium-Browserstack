# 5. Appium

## Goal

Mobile Automation on BrowserStack + WebdriverIO + Appium.

## Current Setup

- Node.js project initialized.
- WebdriverIO 9 and TypeScript configured.
- Appium 3 installed as a local project dependency.
- UiAutomator2 installed as the Android automation driver.
- Appium Doctor reports 0 required fixes.
- Local WDIO config launches the native Pixel Clock already installed on the emulator.
- A local Pixel Clock APK copy is available at `apps/pixel-clock.apk` for private BrowserStack upload.
- BrowserStack App Automate smoke test passes on Android 13.
- GitHub Actions workflow is ready for repository secrets.

Useful commands:

```powershell
npm run typecheck
npm run appium:drivers
npm run appium:doctor
npm run test:local
npm run test:browserstack
```

Before the first local test:

1. Start an Android emulator or connect an Android device.
2. Verify it with `adb devices -l`.
3. Open or launch the native Clock app at least once.

The APK is excluded from Git because it is a third-party binary.

## BrowserStack Setup

The BrowserStack configuration reads credentials and the uploaded app ID from
environment variables. Do not add their real values to repository files.

Local PowerShell session:

```powershell
$env:BROWSERSTACK_USERNAME = "your_username"
$env:BROWSERSTACK_ACCESS_KEY = "your_access_key"
$env:BROWSERSTACK_APP_ID = "bs://your_app_id"
npm run test:browserstack
```

GitHub repository secrets:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`
- `BROWSERSTACK_APP_ID`

The workflow is stored at `.github/workflows/browserstack.yml`. It installs
dependencies, runs TypeScript validation, and executes the tests on
BrowserStack App Automate. Test sessions, Appium logs, screenshots, and video
are available in the BrowserStack dashboard.

Deliverables:

- 5 test cases for a native mobile app.
- Automated tests with WebdriverIO + Appium.
- Optional reporter setup.
- Screenshot evidence for the task.
- BrowserStack App Automate run.
- GitHub Actions run with BrowserStack credentials from secrets.

## Application Under Test

Native Pixel Clock included in the Android 14 emulator system image.

- Package: `com.google.android.deskclock`
- Activity: `com.android.deskclock.DeskClock`
- Emulator: `Appium_Pixel_6_API_34`
- Android version: Android 14 / API 34

Why this app:

- It is a native Android application.
- It has clear Alarm, Timer, and Stopwatch screens.
- It does not require registration, internet access, or test accounts.
- It is already installed on the emulator, so no APK upload is needed for local tests.
- Test data can be created and removed during the tests.

## Candidate Test Cases

1. Verify navigation between Alarm, Clock, Timer, and Stopwatch screens.
2. Create an alarm with a test label and verify that it appears in the alarm list.
3. Edit the created alarm, change its label or repeat day, and verify the update.
4. Set a short timer, start it, pause it, and verify that the controls and countdown state change.
5. Start the stopwatch, add a lap, pause it, and reset it.

Test cleanup:

- Remove the test alarm after the alarm tests.
- Reset the timer and stopwatch after every related test.
- Avoid asserting an exact elapsed time because cloud-device timing can vary.

## Action Plan

1. Watch the setup playlist and note framework conventions.
2. Launch the native Pixel Clock on the Android emulator.
3. Initialize a TypeScript WebdriverIO Appium project.
4. Add configs:
   - local Appium config if we want emulator/device support;
   - BrowserStack config for App Automate;
   - shared test data and capabilities.
5. Add page objects/screens:
   - navigation component;
   - alarm screen;
   - timer screen;
   - stopwatch screen.
6. Write 5 specs with stable waits and selectors.
7. Add scripts:
   - `test:local`;
   - `test:browserstack`;
   - optional `report`.
8. Configure reporter:
   - start with WDIO spec reporter;
   - optionally add Allure if time allows.
9. Upload/run on BrowserStack:
   - set `BROWSERSTACK_USERNAME`;
   - set `BROWSERSTACK_ACCESS_KEY`;
   - privately upload `apps/pixel-clock.apk`;
   - use the returned `bs://...` app id.
10. Add GitHub Actions:
   - store BrowserStack credentials in GitHub Secrets;
   - run install + BrowserStack test command;
   - keep workflow manual or on push.
11. Collect evidence:
   - terminal output;
   - BrowserStack dashboard session screenshots/video;
   - GitHub Actions successful run screenshot.

## Useful Links

- BrowserStack WDIO Appium quick start: https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio
- BrowserStack WDIO Appium integration: https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio/integrate-your-tests
- BrowserStack WDIO App Automate capabilities: https://www.browserstack.com/docs/app-automate/appium/wdio-browserstack-capabilities
- BrowserStack GitHub Actions docs: https://www.browserstack.com/docs/automate/selenium/github-actions
