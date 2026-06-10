import { $ } from '@wdio/globals';

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
}

export const stopwatchScreen = new StopwatchScreen();
