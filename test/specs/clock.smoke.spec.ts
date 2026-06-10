import { $, expect } from '@wdio/globals';

describe('Pixel Clock', () => {
  it('opens the app and displays the main navigation', async () => {
    await expect($('~Alarm')).toBeDisplayed();
    await expect($('~Clock')).toBeDisplayed();
    await expect($('~Timer')).toBeDisplayed();
    await expect($('~Stopwatch')).toBeDisplayed();
  });
});
