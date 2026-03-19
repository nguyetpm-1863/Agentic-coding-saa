# FUNCTION Test Cases - Countdown - Prelaunch Page

## FUN-001: Verify countdown calculates correct remaining days
- **Category:** FUNCTION > Countdown Calculation
- **Test Objective:** Verify the Days counter displays the correct number of remaining days
- **Precondition:** Target date is known and set to a future date
- **Test Data:** Target date set to 10 days from now
- **Steps:**
  1. Note the current date and time
  2. Open the countdown page
  3. Calculate the expected remaining days manually
  4. Compare with the displayed Days value
- **Expected Result:** The Days counter shows the correct number of remaining days matching the manual calculation
- **Priority:** High
- **Testcase Type:** Normal

## FUN-002: Verify countdown calculates correct remaining hours
- **Category:** FUNCTION > Countdown Calculation
- **Test Objective:** Verify the Hours counter displays the correct number of remaining hours
- **Precondition:** Target date is known and set to a future date
- **Test Data:** Target date set to a specific future date/time
- **Steps:**
  1. Note the current date and time
  2. Open the countdown page
  3. Calculate the expected remaining hours (within the current day) manually
  4. Compare with the displayed Hours value
- **Expected Result:** The Hours counter shows the correct remaining hours (00-23) matching the manual calculation
- **Priority:** High
- **Testcase Type:** Normal

## FUN-003: Verify countdown calculates correct remaining minutes
- **Category:** FUNCTION > Countdown Calculation
- **Test Objective:** Verify the Minutes counter displays the correct number of remaining minutes
- **Precondition:** Target date is known and set to a future date
- **Test Data:** Target date set to a specific future date/time
- **Steps:**
  1. Note the current date and time
  2. Open the countdown page
  3. Calculate the expected remaining minutes (within the current hour) manually
  4. Compare with the displayed Minutes value
- **Expected Result:** The Minutes counter shows the correct remaining minutes (00-59) matching the manual calculation
- **Priority:** High
- **Testcase Type:** Normal

## FUN-004: Verify minutes counter auto-updates every minute
- **Category:** FUNCTION > Auto-Update
- **Test Objective:** Verify the Minutes counter decrements automatically in real-time
- **Precondition:** Countdown page is loaded with a target date in the future
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Note the current Minutes value
  3. Wait for approximately 1 minute
  4. Observe the Minutes value
- **Expected Result:** The Minutes counter decrements by 1 after one minute passes
- **Priority:** High
- **Testcase Type:** Normal

## FUN-005: Verify countdown updates without page refresh
- **Category:** FUNCTION > Auto-Update
- **Test Objective:** Verify the countdown timer updates automatically without requiring manual page refresh
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page
  2. Note all countdown values (Days, Hours, Minutes)
  3. Wait for several minutes without interacting with the page
  4. Observe the countdown values
- **Expected Result:** Countdown values update automatically without any user action or page refresh
- **Priority:** High
- **Testcase Type:** Normal

## FUN-006: Verify minutes rollover from 00 to 59
- **Category:** FUNCTION > Boundary Values
- **Test Objective:** Verify that when Minutes reaches 00, it rolls over to 59 and Hours decrements by 1
- **Precondition:** Countdown page is loaded when Minutes is at 00
- **Test Data:** Observe at a time when minutes = 00
- **Steps:**
  1. Open the countdown page when minutes display is "00"
  2. Observe the transition as the next minute passes (or wait at 01 until it becomes 00)
  3. Check both Minutes and Hours values
- **Expected Result:** Minutes rolls over from 00 to 59 and the Hours counter decrements by 1
- **Priority:** High
- **Testcase Type:** Normal

## FUN-007: Verify hours rollover from 00 to 23
- **Category:** FUNCTION > Boundary Values
- **Test Objective:** Verify that when Hours reaches 00 and minutes go past 00, Hours rolls to 23 and Days decrements
- **Precondition:** Countdown is running with Hours at 00 and Days > 0
- **Test Data:** Observe when Hours = 00, Minutes = 00
- **Steps:**
  1. Open the countdown page when Hours = 00 and Minutes = 00
  2. Wait for the transition
  3. Check Hours and Days values
- **Expected Result:** Hours rolls to 23, Days decrements by 1
- **Priority:** High
- **Testcase Type:** Normal

## FUN-008: Verify Days displays "00" when less than 1 day remains
- **Category:** FUNCTION > Boundary Values
- **Test Objective:** Verify the Days counter shows "00" when remaining time is less than 24 hours
- **Precondition:** Target date is less than 24 hours away
- **Test Data:** Target date set to less than 24 hours from now (e.g., 12 hours away)
- **Steps:**
  1. Set the target date to less than 24 hours in the future
  2. Open the countdown page
  3. Observe the Days counter
- **Expected Result:** Days counter displays "00"
- **Priority:** High
- **Testcase Type:** Normal

## FUN-009: Verify countdown behavior when target date is reached (all zeros)
- **Category:** FUNCTION > Target Date Reached
- **Test Objective:** Verify the countdown displays 00:00:00 when the target date/time is reached
- **Precondition:** Target date is imminent (within 1 minute)
- **Test Data:** Target date set to the current time
- **Steps:**
  1. Open the countdown page just before the target date/time
  2. Wait until the target time passes
  3. Observe all countdown values
- **Expected Result:** All counters display "00" (Days: 00, Hours: 00, Minutes: 00); no negative values are shown
- **Priority:** High
- **Testcase Type:** Normal

## FUN-010: Verify countdown does not display negative values after target date
- **Category:** FUNCTION > Target Date Reached
- **Test Objective:** Verify the countdown does not show negative values after the launch time has passed
- **Precondition:** Target date has already passed
- **Test Data:** Target date set to a past date/time
- **Steps:**
  1. Set the target date to a time in the past
  2. Open the countdown page
  3. Observe all countdown values
- **Expected Result:** All counters display "00" or the page shows an appropriate post-launch state; no negative values are displayed
- **Priority:** High
- **Testcase Type:** Abnormal

## FUN-011: Verify countdown accuracy after page refresh
- **Category:** FUNCTION > Page Lifecycle
- **Test Objective:** Verify the countdown recalculates correctly after a page refresh
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page and note the displayed values
  2. Wait for 2 minutes
  3. Press F5 to refresh the page
  4. Observe the countdown values
- **Expected Result:** The countdown values are recalculated from the current time and display accurately (approximately 2 minutes less than the initial values)
- **Priority:** High
- **Testcase Type:** Normal

## FUN-012: Verify countdown continues correctly after switching tabs
- **Category:** FUNCTION > Page Lifecycle
- **Test Objective:** Verify the countdown remains accurate after switching to another tab and returning
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page and note the displayed values
  2. Switch to another browser tab
  3. Wait for 2-3 minutes
  4. Switch back to the countdown page tab
  5. Observe the countdown values
- **Expected Result:** The countdown displays the correct remaining time (accounting for the elapsed time), not the stale values from before the tab switch
- **Priority:** High
- **Testcase Type:** Normal

## FUN-013: Verify countdown continues after minimizing and restoring browser
- **Category:** FUNCTION > Page Lifecycle
- **Test Objective:** Verify the countdown remains accurate after minimizing and restoring the browser
- **Precondition:** Countdown page is loaded
- **Test Data:**
- **Steps:**
  1. Open the countdown page and note the displayed values
  2. Minimize the browser window
  3. Wait for 2-3 minutes
  4. Restore the browser window
  5. Observe the countdown values
- **Expected Result:** The countdown displays the correct remaining time, updated to reflect the elapsed time
- **Priority:** Medium
- **Testcase Type:** Normal

## FUN-014: Verify countdown with target date far in the future (large day count)
- **Category:** FUNCTION > Boundary Values
- **Test Objective:** Verify the Days counter handles large values correctly
- **Precondition:** Target date is far in the future
- **Test Data:** Target date set to 99+ days from now
- **Steps:**
  1. Set target date to 99 days or more in the future
  2. Open the countdown page
  3. Observe the Days counter
- **Expected Result:** The Days counter displays the correct value; if only 2 digits are available, verify how values > 99 are handled (e.g., overflow behavior)
- **Priority:** Medium
- **Testcase Type:** Abnormal

## FUN-015: Verify Hours counter stays within 00-23 range
- **Category:** FUNCTION > Boundary Values
- **Test Objective:** Verify the Hours counter never displays a value outside the 00-23 range
- **Precondition:** Countdown is running
- **Test Data:**
- **Steps:**
  1. Open the countdown page at various times throughout the day
  2. Observe the Hours counter value
- **Expected Result:** The Hours counter always displays a value between 00 and 23 inclusive
- **Priority:** High
- **Testcase Type:** Normal

## FUN-016: Verify Minutes counter stays within 00-59 range
- **Category:** FUNCTION > Boundary Values
- **Test Objective:** Verify the Minutes counter never displays a value outside the 00-59 range
- **Precondition:** Countdown is running
- **Test Data:**
- **Steps:**
  1. Open the countdown page at various times
  2. Observe the Minutes counter value at multiple intervals
- **Expected Result:** The Minutes counter always displays a value between 00 and 59 inclusive
- **Priority:** High
- **Testcase Type:** Normal

## FUN-017: Verify countdown accuracy across different time zones
- **Category:** FUNCTION > Time Zone
- **Test Objective:** Verify the countdown shows consistent target time regardless of user's time zone
- **Precondition:** Countdown page is accessible; target date is set
- **Test Data:** Access from different time zones (or simulate using browser timezone override)
- **Steps:**
  1. Open the countdown page from a device in Time Zone A (e.g., UTC+0)
  2. Note the countdown values
  3. Open the countdown page from a device in Time Zone B (e.g., UTC+9)
  4. Note the countdown values
  5. Compare the two sets of values
- **Expected Result:** Both devices show the same countdown values (or values within 1 minute of each other due to load time differences), since the target date is absolute
- **Priority:** High
- **Testcase Type:** Normal

## FUN-018: Verify countdown handles daylight saving time transition
- **Category:** FUNCTION > Time Zone
- **Test Objective:** Verify the countdown remains accurate during a DST transition
- **Precondition:** Target date spans across a DST boundary
- **Test Data:** Simulated DST transition time
- **Steps:**
  1. Set target date to a time after a DST transition
  2. Open the countdown page before the DST transition
  3. Observe the countdown during and after the DST transition
- **Expected Result:** The countdown remains accurate and does not gain or lose an hour during the DST transition
- **Priority:** Medium
- **Testcase Type:** Abnormal

## FUN-019: Verify countdown on slow network connection
- **Category:** FUNCTION > Page Lifecycle
- **Test Objective:** Verify the countdown loads and functions correctly on a slow network
- **Precondition:** Network throttling enabled (e.g., Slow 3G)
- **Test Data:**
- **Steps:**
  1. Open browser DevTools and enable Slow 3G network throttling
  2. Navigate to the countdown page
  3. Wait for the page to fully load
  4. Observe the countdown behavior
- **Expected Result:** The page loads (may take longer) and once loaded, the countdown displays correct values and updates properly
- **Priority:** Medium
- **Testcase Type:** Normal

## FUN-020: Verify multiple countdown instances in different tabs show consistent values
- **Category:** FUNCTION > Page Lifecycle
- **Test Objective:** Verify that opening the countdown page in multiple tabs shows consistent values
- **Precondition:** Countdown page is accessible
- **Test Data:**
- **Steps:**
  1. Open the countdown page in Tab 1
  2. Open the countdown page in Tab 2
  3. Compare the countdown values in both tabs
- **Expected Result:** Both tabs display the same (or within 1 second difference) countdown values
- **Priority:** Medium
- **Testcase Type:** Normal
