# Test Viewpoints - Countdown - Prelaunch Page

## Matched Reference Screens

### 1. Text_only (Fixed text)
Relevant for testing static labels ("DAYS", "HOURS", "MINUTES") on the countdown page.

#### Viewpoints:
- **Check fixed text/label displays corresponding with design, spec** (e.g., Title of page, Label of item)
  - Expected: Display correctly as design/spec (Position, Format, Value)
- **Check fixed text/label unable to edit on screen**
  - Expected: Cannot edit text by action on screen

### 2. Animation (Check displaying)
Relevant for testing the countdown animation/real-time update behavior.

#### Viewpoints:
- **Check displaying of animation: Size, Effect**
  - Expected: GUI same as spec, Animation running as spec

### 3. Animation (Check on many browsers)
Relevant for cross-browser compatibility of the countdown timer.

#### Viewpoints:
- **Check displaying of animation on specified browsers with versions** (Chrome, Firefox, Safari, Edge)
  - Expected: Animation still displays correctly as spec

### 4. Animation (Check on many screen sizes)
Relevant for responsive behavior of the countdown layout.

#### Viewpoints:
- **Check displaying of animation on specified screen sizes** (14 inches, 23 inches, Resized screen)
  - Expected: Animation still displays correctly as spec

### 5. Animation (Check when has event from user)
Relevant for countdown behavior during user interactions.

#### Viewpoints:
- **Zoom in/zoom out Animation page**
  - Expected: Animation still displays correctly as spec
- **Press F5 or Click Back/Next to Animation page from browser**
  - Expected: Animation reruns from the beginning (countdown recalculates)
- **Switch to another Tab then return to Tab which has animation**
  - Expected: Animation still working correctly
- **Copy/paste URL to another Tab to open and run**
  - Expected: Animation still working correctly

### 6. Scrollbar (Web page)
Relevant for page layout verification.

#### Viewpoints:
- **Content does not exceed the page limit** (short content, zoom in)
  - Expected: Web page doesn't display unnecessary scroll bars
- **Content exceeds the page limit** (zoom out)
  - Expected: Web page displays scroll bars as needed
