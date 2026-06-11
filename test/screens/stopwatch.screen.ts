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

  get hundredthsText() {
    return $('id=com.google.android.deskclock:id/stopwatch_hundredths_text');
  }

  async getElapsedMilliseconds(): Promise<number> {
    await this.timeText.waitForDisplayed();

    const timeParts = ((await this.timeText.getText()).match(/\d+/g) ?? []).map(
      Number
    );
    const hundredths =
      Number((await this.hundredthsText.getText()).match(/\d+/)?.[0] ?? 0) %
      100;

    if (timeParts.length < 2 || timeParts.length > 3) {
      throw new Error(
        `Could not parse stopwatch time from "${await this.timeText.getText()}"`
      );
    }

    const [hours, minutes, seconds] =
      timeParts.length === 3
        ? timeParts
        : [0, timeParts[0], timeParts[1]];

    return ((hours * 60 + minutes) * 60 + seconds) * 1_000 + hundredths * 10;
  }

  async waitForElapsedTimeAbove(minimumMilliseconds: number): Promise<number> {
    let elapsedMilliseconds = 0;

    await browser.waitUntil(
      async () => {
        elapsedMilliseconds = await this.getElapsedMilliseconds();
        return elapsedMilliseconds > minimumMilliseconds;
      },
      {
        timeout: 5_000,
        interval: 100,
        timeoutMsg: 'Expected stopwatch elapsed time to increase'
      }
    );

    return elapsedMilliseconds;
  }

  async getFirstLapMilliseconds(): Promise<number> {
    await this.firstLapTime.waitForDisplayed();
    const parts = ((await this.firstLapTime.getText()).match(/\d+/g) ?? []).map(
      Number
    );

    if (parts.length < 3 || parts.length > 4) {
      throw new Error(
        `Could not parse lap time from "${await this.firstLapTime.getText()}"`
      );
    }

    const hundredths = parts.at(-1) ?? 0;
    const wholeTime = parts.slice(0, -1);
    const [hours, minutes, seconds] =
      wholeTime.length === 3
        ? wholeTime
        : [0, wholeTime[0], wholeTime[1]];

    return ((hours * 60 + minutes) * 60 + seconds) * 1_000 + hundredths * 10;
  }
}

export const stopwatchScreen = new StopwatchScreen();
