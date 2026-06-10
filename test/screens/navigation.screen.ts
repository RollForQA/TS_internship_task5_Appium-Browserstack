import { $ } from '@wdio/globals';

class NavigationScreen {
  get title() {
    return $('id=com.google.android.deskclock:id/action_bar_title');
  }

  async openAlarm(): Promise<void> {
    await $('~Alarm').click();
    await this.waitForTitle('Alarm');
  }

  async openClock(): Promise<void> {
    await $('~Clock').click();
    await this.waitForTitle('Clock');
  }

  async openTimer(): Promise<void> {
    await $('~Timer').click();
    await this.waitForTitle('Timer');
  }

  async openStopwatch(): Promise<void> {
    await $('~Stopwatch').click();
    await this.waitForTitle('Stopwatch');
  }

  private async waitForTitle(expectedTitle: string): Promise<void> {
    await this.title.waitUntil(
      async () => (await this.title.getText()) === expectedTitle,
      { timeoutMsg: `Expected screen title to be "${expectedTitle}"` }
    );
  }
}

export const navigationScreen = new NavigationScreen();
