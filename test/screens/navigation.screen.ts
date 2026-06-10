import { $ } from '@wdio/globals';

class NavigationScreen {
  get title() {
    return $('id=com.google.android.deskclock:id/action_bar_title');
  }

  async openAlarm(): Promise<void> {
    await this.openTab('Alarm');
  }

  async openClock(): Promise<void> {
    await this.openTab('Clock');
  }

  async openTimer(): Promise<void> {
    await this.openTab('Timer');
  }

  async openStopwatch(): Promise<void> {
    await this.openTab('Stopwatch');
  }

  private async openTab(expectedTitle: string): Promise<void> {
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      if (await this.hasTitle(expectedTitle)) {
        return;
      }

      const tab = $(`~${expectedTitle}`);
      await tab.waitForDisplayed();

      try {
        await tab.click();
      } catch {
        continue;
      }

      if (await this.hasTitle(expectedTitle, 3000)) {
        return;
      }
    }

    throw new Error(`Expected screen title to be "${expectedTitle}"`);
  }

  private async hasTitle(
    expectedTitle: string,
    timeout = 500
  ): Promise<boolean> {
    try {
      await this.title.waitUntil(
        async () => (await this.title.getText()) === expectedTitle,
        { timeout }
      );

      return true;
    } catch {
      return false;
    }
  }
}

export const navigationScreen = new NavigationScreen();
