import { expect } from '@wdio/globals';
import { alarmScreen } from '../screens/alarm.screen.js';
import { navigationScreen } from '../screens/navigation.screen.js';
import { stopwatchScreen } from '../screens/stopwatch.screen.js';
import { timerScreen } from '../screens/timer.screen.js';
import { resetClockApp } from '../support/clock-app.js';

describe('Pixel Clock', () => {
  beforeEach(async () => {
    await resetClockApp();
  });

  it('TC-01 navigates between the main Clock screens', async () => {
    await navigationScreen.openAlarm();
    await expect(navigationScreen.title).toHaveText('Alarm');

    await navigationScreen.openClock();
    await expect(navigationScreen.title).toHaveText('Clock');

    await navigationScreen.openTimer();
    await expect(navigationScreen.title).toHaveText('Timer');

    await navigationScreen.openStopwatch();
    await expect(navigationScreen.title).toHaveText('Stopwatch');
  });

  it('TC-02 creates an alarm with a label', async () => {
    await alarmScreen.createAlarm('Appium alarm');

    await expect(alarmScreen.label('Appium alarm')).toBeDisplayed();
  });

  it('TC-03 edits an alarm label', async () => {
    await alarmScreen.createAlarm('Appium alarm');
    await alarmScreen.editLabel('Appium alarm', 'Updated alarm');

    await expect(alarmScreen.label('Updated alarm')).toBeDisplayed();
    await expect(alarmScreen.label('Appium alarm')).not.toExist();
  });

  it('TC-04 starts and pauses a timer', async () => {
    await timerScreen.setTwoMinutes();

    await expect(timerScreen.setupTime).toHaveAttr(
      'content-desc',
      '0 hours, 2 minutes, 0 seconds'
    );

    await timerScreen.startButton.click();
    await expect(timerScreen.pauseButton).toBeDisplayed();
    await expect(timerScreen.resetButton).toBeDisplayed();
    await expect(timerScreen.remainingTime).toBeDisplayed();

    await timerScreen.pauseButton.click();
    await expect(timerScreen.startButton).toBeDisplayed();
    await expect(timerScreen.resetButton).toBeDisplayed();
  });

  it('TC-05 records and resets a stopwatch lap', async () => {
    await navigationScreen.openStopwatch();
    await stopwatchScreen.startButton.click();

    await expect(stopwatchScreen.pauseButton).toBeDisplayed();
    await expect(stopwatchScreen.lapButton).toBeDisplayed();
    await expect(stopwatchScreen.resetButton).toBeDisplayed();

    await stopwatchScreen.lapButton.click();
    await expect(stopwatchScreen.firstLap).toBeDisplayed();

    await stopwatchScreen.pauseButton.click();
    await expect(stopwatchScreen.startButton).toBeDisplayed();

    await stopwatchScreen.resetButton.click();
    await expect(stopwatchScreen.startButton).toBeDisplayed();
    await expect(stopwatchScreen.firstLap).not.toExist();
  });
});
