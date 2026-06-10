import { config as sharedConfig } from './wdio.shared.conf.js';

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
      'appium:appPackage': 'com.google.android.deskclock',
      'appium:appActivity': 'com.android.deskclock.DeskClock',
      'appium:noReset': true,
      'appium:settings': {
        waitForIdleTimeout: 100
      },
      'appium:newCommandTimeout': 120
    }
  ]
};
