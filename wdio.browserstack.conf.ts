import { config as sharedConfig } from './wdio.shared.conf.js';

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const username = requiredEnvironmentVariable('BROWSERSTACK_USERNAME');
const accessKey = requiredEnvironmentVariable('BROWSERSTACK_ACCESS_KEY');
const appId = requiredEnvironmentVariable('BROWSERSTACK_APP_ID');

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  user: username,
  key: accessKey,
  hostname: 'hub.browserstack.com',
  maxInstances: 1,
  services: [
    [
      'browserstack',
      {
        app: appId
      }
    ]
  ],
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:appPackage': 'com.google.android.deskclock',
      'appium:appActivity': 'com.android.deskclock.DeskClock',
      'appium:autoGrantPermissions': true,
      'appium:noReset': false,
      'appium:language': 'en',
      'appium:locale': 'US',
      'bstack:options': {
        deviceName: process.env.BROWSERSTACK_DEVICE ?? 'Samsung Galaxy S23',
        osVersion: process.env.BROWSERSTACK_OS_VERSION ?? '13.0',
        projectName: 'TS Internship Appium',
        buildName: process.env.BROWSERSTACK_BUILD_NAME ?? 'Pixel Clock Appium',
        sessionName: 'Pixel Clock tests',
        debug: true,
        networkLogs: false
      }
    }
  ]
};
