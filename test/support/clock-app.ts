import { $, driver } from '@wdio/globals';

export const CLOCK_PACKAGE = 'com.google.android.deskclock';

export async function resetClockApp(): Promise<void> {
  await driver.updateSettings({ waitForIdleTimeout: 100 });
  await driver.terminateApp(CLOCK_PACKAGE);
  await driver.execute('mobile: clearApp', { appId: CLOCK_PACKAGE });
  await driver.activateApp(CLOCK_PACKAGE);
  await $('~Alarm').waitForDisplayed();
  await $('id=com.google.android.deskclock:id/action_bar_title').waitForDisplayed();
}
