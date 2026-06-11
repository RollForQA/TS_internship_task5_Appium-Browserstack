import { browser, expect } from '@wdio/globals';
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
    const alarmTime = await alarmScreen.getAlarmTimeDescription();
    expect(/(?:3:00\s*PM|15:00)/i.test(alarmTime)).toBe(true);
    expect(await alarmScreen.isAlarmEnabled()).toBe(true);
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
    await expect(timerScreen.startButton).not.toExist();
    const runningSeconds = await timerScreen.waitForRemainingTimeBelow(120);
    expect(runningSeconds).toBeLessThan(120);

    await timerScreen.pauseButton.click();
    await expect(timerScreen.startButton).toBeDisplayed();
    await expect(timerScreen.resetButton).toBeDisplayed();
    await expect(timerScreen.pauseButton).not.toExist();
    const pausedSeconds = await timerScreen.getRemainingSeconds();
    await browser.pause(1_500);
    expect(await timerScreen.getRemainingSeconds()).toBe(pausedSeconds);
  });

  it('TC-05 records and resets a stopwatch lap', async () => {
    await navigationScreen.openStopwatch();
    await stopwatchScreen.startButton.click();

    await expect(stopwatchScreen.pauseButton).toBeDisplayed();
    await expect(stopwatchScreen.lapButton).toBeDisplayed();
    await expect(stopwatchScreen.resetButton).toBeDisplayed();
    await expect(stopwatchScreen.startButton).not.toExist();
    expect(await stopwatchScreen.waitForElapsedTimeAbove(0)).toBeGreaterThan(0);

    await stopwatchScreen.lapButton.click();
    await expect(stopwatchScreen.firstLap).toBeDisplayed();
    expect(await stopwatchScreen.getFirstLapMilliseconds()).toBeGreaterThan(0);

    await stopwatchScreen.pauseButton.click();
    await expect(stopwatchScreen.startButton).toBeDisplayed();
    await expect(stopwatchScreen.pauseButton).not.toExist();
    const pausedMilliseconds = await stopwatchScreen.getElapsedMilliseconds();
    await browser.pause(500);
    expect(await stopwatchScreen.getElapsedMilliseconds()).toBe(
      pausedMilliseconds
    );

    await stopwatchScreen.resetButton.click();
    await expect(stopwatchScreen.startButton).toBeDisplayed();
    await expect(stopwatchScreen.firstLap).not.toExist();
    expect(await stopwatchScreen.getElapsedMilliseconds()).toBe(0);
  });
});
