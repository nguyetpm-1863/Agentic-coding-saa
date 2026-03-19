# Countdown - Prelaunch Page - Specifications

## 1. Screen Overview

- **Screen Name:** Countdown - Prelaunch page
- **Frame ID:** 2268:35127
- **File Key:** 9ypp4enmFmdK3YAFJLIu6C
- **Status:** spec
- **Description:** A prelaunch countdown page that displays a real-time countdown timer showing the remaining time (Days, Hours, Minutes) until a launch event. The page features LED-style digit displays with uppercase white labels.

## 2. UI Elements

### 2.1 Days Counter (ID: 2268:35139)
- **Type:** Info Block (Others)
- **Display:** 2 LED-style digit boxes showing the number of remaining days
- **Label:** "DAYS" - uppercase, white text
- **Behavior:** Auto-updates to show remaining days; displays "00" when less than 1 day remains

### 2.2 Hours Counter (ID: 2268:35144)
- **Type:** Info Block (Others)
- **Display:** 2 LED-style digit boxes showing the number of remaining hours
- **Label:** "HOURS" - uppercase, white text
- **Behavior:** Auto-updates to show remaining hours; range 00-23

### 2.3 Minutes Counter (ID: 2268:35149)
- **Type:** Info Block (Others)
- **Display:** 2 LED-style digit boxes showing the number of remaining minutes
- **Label:** "MINUTES" - uppercase, white text
- **Behavior:** Auto-updates to show remaining minutes; range 00-59

## 3. Validation Rules

- Days counter: Displays "00" when less than 1 day remains (no negative values)
- Hours counter: Valid range is 00-23
- Minutes counter: Valid range is 00-59
- All counters must display 2-digit format (zero-padded)
- Countdown must not display negative values after the target date/time has passed

## 4. User Interactions

- **Passive Display:** The countdown page is primarily a display-only page with no direct user input interactions
- **Auto-refresh:** The countdown values update automatically in real-time without user action
- **Navigation:** Users can navigate to/from this page via standard browser navigation
- **Page Refresh:** Refreshing the page should recalculate and display the correct remaining time

## 5. Security Considerations

- The target launch date/time should be managed server-side to prevent client-side manipulation
- No sensitive data is displayed on this page
- Standard HTTP security headers should be applied (X-Content-Type-Options, X-Frame-Options, etc.)
- The page should be accessible without authentication (public prelaunch page)
