import { $, browser } from '@wdio/globals';
import { navigationScreen } from './navigation.screen.js';

function parseDurationInSeconds(value: string): number {
  const units: Array<[RegExp, number]> = [
    [/(\d+)\s*hours?/i, 3_600],
    [/(\d+)\s*minutes?/i, 60],
    [/(\d+)\s*seconds?/i, 1]
  ];

  return units.reduce((total, [pattern, multiplier]) => {
    const match = value.match(pattern);
    return total + (match ? Number(match[1]) * multiplier : 0);
  }, 0);
}

class TimerScreen {
  get setupTime() {
    return $('id=com.google.android.deskclock:id/timer_setup_time');
  }

  get startButton() {
    return $('~Start');
  }

  get pauseButton() {
    return $('~Pause');
  }

  get resetButton() {
    return $('~Reset');
  }

  get deleteButton() {
    return $('~Delete');
  }

  get remainingTime() {
    return $('id=com.google.android.deskclock:id/timer_text');
  }

  async setTwoMinutes(): Promise<void> {
    await navigationScreen.openTimer();

    for (const digit of ['2', '0', '0']) {
      await $(
        `id=com.google.android.deskclock:id/timer_setup_digit_${digit}`
      ).click();
    }
  }

  async getRemainingSeconds(): Promise<number> {
    const remainingTime = this.remainingTime;
    await remainingTime.waitForDisplayed();
    const description =
      (await remainingTime.getAttribute('content-desc')) ?? '';
    const seconds = parseDurationInSeconds(description);

    if (seconds === 0 && !description.match(/\b0\s*seconds?\b/i)) {
      throw new Error(`Could not parse timer duration from "${description}"`);
    }

    return seconds;
  }

  async waitForRemainingTimeBelow(
    initialSeconds: number
  ): Promise<number> {
    let remainingSeconds = initialSeconds;

    await browser.waitUntil(
      async () => {
        remainingSeconds = await this.getRemainingSeconds();
        return remainingSeconds < initialSeconds;
      },
      {
        timeout: 10_000,
        interval: 250,
        timeoutMsg: `Expected timer to count down from ${initialSeconds} seconds`
      }
    );

    return remainingSeconds;
  }
}

export const timerScreen = new TimerScreen();
