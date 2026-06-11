import path from 'node:path';
import { config as sharedConfig } from './wdio.shared.conf.js';

const appPath = process.env.ANDROID_APP_PATH
  ? path.resolve(process.env.ANDROID_APP_PATH)
  : undefined;

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  port: 4723,
  services: [
    [
      'appium',
      {
        command: 'appium',
        args: {
          address: '127.0.0.1',
          port: 4723
        }
      }
    ]
  ],
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME ?? 'Android Emulator',
      ...(process.env.ANDROID_UDID
        ? { 'appium:udid': process.env.ANDROID_UDID }
        : {}),
      ...(appPath ? { 'appium:app': appPath } : {}),
      'appium:appPackage': 'com.google.android.deskclock',
      'appium:appActivity': 'com.android.deskclock.DeskClock',
      'appium:autoGrantPermissions': true,
      'appium:language': 'en',
      'appium:locale': 'US',
      // Preserve a preinstalled system app; beforeEach clears its data explicitly.
      'appium:noReset': true,
      'appium:settings': {
        waitForIdleTimeout: 100
      },
      'appium:newCommandTimeout': 120
    }
  ]
};
