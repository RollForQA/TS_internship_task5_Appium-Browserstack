# Pixel Clock Test Cases

## TC-01: Navigate Between Main Clock Screens

Preconditions:

- Pixel Clock is installed and launched.

Steps:

1. Open the Alarm tab.
2. Open the Clock tab.
3. Open the Timer tab.
4. Open the Stopwatch tab.

Expected result:

- Each tab opens successfully.
- The screen title matches the selected tab.

## TC-02: Create an Alarm With a Label

Preconditions:

- Clock app data is reset.

Steps:

1. Open the Alarm tab.
2. Tap Add alarm.
3. Select 3:00 PM.
4. Confirm the selected time.
5. Add the label `Appium alarm`.

Expected result:

- A new enabled alarm is created.
- The `Appium alarm` label is visible in the alarm list.

## TC-03: Edit an Alarm Label

Preconditions:

- Clock app data is reset.
- An alarm with the label `Appium alarm` is created.

Steps:

1. Open the created alarm label.
2. Replace it with `Updated alarm`.
3. Confirm the change.

Expected result:

- `Updated alarm` is displayed.
- The old `Appium alarm` label is no longer displayed.

## TC-04: Start and Pause a Timer

Preconditions:

- Clock app data is reset.

Steps:

1. Open the Timer tab.
2. Enter 2 minutes.
3. Start the timer.
4. Pause the timer.

Expected result:

- The setup value is 2 minutes.
- While running, Pause, Reset, and remaining-time controls are visible.
- After pausing, Start and Reset controls are visible.

## TC-05: Record and Reset a Stopwatch Lap

Preconditions:

- Clock app data is reset.

Steps:

1. Open the Stopwatch tab.
2. Start the stopwatch.
3. Record a lap.
4. Pause the stopwatch.
5. Reset the stopwatch.

Expected result:

- Running controls include Pause, Lap, and Reset.
- `Lap 1` is recorded.
- Pausing displays the Start control.
- Reset removes the recorded lap and returns the stopwatch to its initial state.
