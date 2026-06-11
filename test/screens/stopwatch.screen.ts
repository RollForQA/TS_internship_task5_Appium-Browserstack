import { $, browser } from '@wdio/globals';

class StopwatchScreen {
  get startButton() {
    return $('~Start');
  }

  get pauseButton() {
    return $('~Pause');
  }

  get resetButton() {
    return $('~Reset');
  }

  get lapButton() {
    return $('~Lap');
  }

  get firstLap() {
    return $('~Lap 1');
  }

  get firstLapTime() {
    return $('id=com.google.android.deskclock:id/lap_time');
  }

  get timeText() {
    return $('id=com.google.android.deskclock:id/stopwatch_time_text');
  }

  async getElapsedDisplay(): Promise<string> {
    const timeText = this.timeText;
    await timeText.waitForDisplayed();
    return timeText.getText();
  }

  async waitForElapsedTimeChange(initialDisplay: string): Promise<string> {
    let elapsedDisplay = initialDisplay;

    await browser.waitUntil(
      async () => {
        elapsedDisplay = await this.getElapsedDisplay();
        return elapsedDisplay !== initialDisplay;
      },
      {
        timeout: 5_000,
        interval: 100,
        timeoutMsg: 'Expected stopwatch elapsed time to increase'
      }
    );

    return elapsedDisplay;
  }

  async hasNonZeroFirstLapTime(): Promise<boolean> {
    const firstLapTime = this.firstLapTime;
    await firstLapTime.waitForDisplayed();
    const digits = (await firstLapTime.getText()).match(/\d/g) ?? [];
    return digits.some((digit) => digit !== '0');
  }
}

export const stopwatchScreen = new StopwatchScreen();
