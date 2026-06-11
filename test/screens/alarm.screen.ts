import { $, browser } from '@wdio/globals';
import { navigationScreen } from './navigation.screen.js';

class AlarmScreen {
  get addAlarmButton() {
    return $('~Add alarm');
  }

  get labelInput() {
    return $('id=com.google.android.deskclock:id/label_input_field');
  }

  get confirmLabelButton() {
    return $('id=android:id/button1');
  }

  get alarmTime() {
    return $('id=com.google.android.deskclock:id/digital_clock');
  }

  get alarmToggle() {
    return $('id=com.google.android.deskclock:id/onoff');
  }

  async createAlarm(label: string): Promise<void> {
    await navigationScreen.openAlarm();
    await this.addAlarmButton.waitForDisplayed();
    await this.addAlarmButton.click();

    const threePmOnTwelveHourClock = $(
      'android=new UiSelector().descriptionContains("3 o")'
    );
    const threePmOnTwentyFourHourClock = $('~15 hours');

    await browser.waitUntil(
      async () =>
        (await threePmOnTwelveHourClock.isExisting()) ||
        (await threePmOnTwentyFourHourClock.isExisting()),
      {
        timeout: 5_000,
        timeoutMsg: 'Expected the alarm time picker to display hour controls'
      }
    );

    if (await threePmOnTwelveHourClock.isExisting()) {
      await threePmOnTwelveHourClock.click();
      await $(
        'id=com.google.android.deskclock:id/material_clock_period_pm_button'
      ).click();
    } else {
      await threePmOnTwentyFourHourClock.click();
    }

    await $('~0 minutes').click();
    await $(
      'id=com.google.android.deskclock:id/material_timepicker_ok_button'
    ).click();

    await $('id=com.google.android.deskclock:id/edit_label').click();
    await this.labelInput.setValue(label);
    await this.confirmLabelButton.click();
    await this.label(label).waitForDisplayed();
  }

  async getAlarmTimeDescription(): Promise<string> {
    await this.alarmTime.waitForDisplayed();

    const text = await this.alarmTime.getText();
    const contentDescription =
      (await this.alarmTime.getAttribute('content-desc')) ?? '';

    return `${text} ${contentDescription}`.trim();
  }

  async isAlarmEnabled(): Promise<boolean> {
    await this.alarmToggle.waitForDisplayed();
    return (await this.alarmToggle.getAttribute('checked')) === 'true';
  }

  async editLabel(currentLabel: string, updatedLabel: string): Promise<void> {
    await this.label(currentLabel).click();
    await this.labelInput.waitForDisplayed();
    await this.labelInput.clearValue();
    await this.labelInput.setValue(updatedLabel);
    await this.confirmLabelButton.click();
    await this.label(updatedLabel).waitForDisplayed();
  }

  label(value: string) {
    return $(`android=new UiSelector().text("${value}")`);
  }
}

export const alarmScreen = new AlarmScreen();
