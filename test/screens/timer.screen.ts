import { $ } from '@wdio/globals';
import { navigationScreen } from './navigation.screen.js';

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
    return $('android=new UiSelector().descriptionContains("remaining")');
  }

  async setTwoMinutes(): Promise<void> {
    await navigationScreen.openTimer();

    for (const digit of ['2', '0', '0']) {
      await $(
        `id=com.google.android.deskclock:id/timer_setup_digit_${digit}`
      ).click();
    }
  }
}

export const timerScreen = new TimerScreen();
