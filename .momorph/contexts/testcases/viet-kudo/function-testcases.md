# Viet Kudo - FUNCTION Test Cases

## FUNC - Recipient Search & Select

### FUNC_001 - Search recipient by typing
- **Category:** FUNCTION > Recipient Search & Select
- **Objective:** Verify autocomplete suggestions appear when typing in the recipient field
- **Precondition:** Modal is open
- **Steps:**
  1. Click on the recipient input field
  2. Type at least 1 character of a colleague's name
- **Expected:** Dropdown shows filtered suggestions matching the input; results update as user types
- **Priority:** High

### FUNC_002 - Select recipient from dropdown
- **Category:** FUNCTION > Recipient Search & Select
- **Objective:** Verify selecting a recipient from the dropdown populates the field
- **Precondition:** Modal is open, autocomplete suggestions are visible
- **Steps:**
  1. Type a search query in the recipient field
  2. Click on a suggested name from the dropdown
- **Expected:** Selected name is populated in the recipient field; dropdown closes
- **Priority:** High

### FUNC_003 - Search with no matching results
- **Category:** FUNCTION > Recipient Search & Select
- **Objective:** Verify behavior when search query returns no matches
- **Precondition:** Modal is open
- **Steps:**
  1. Type a non-existent name in the recipient field (e.g., "zzzxxx999")
- **Expected:** Dropdown shows no results or "No results found" message
- **Priority:** Medium

### FUNC_004 - Clear selected recipient
- **Category:** FUNCTION > Recipient Search & Select
- **Objective:** Verify user can clear the selected recipient and search again
- **Precondition:** Modal is open, a recipient is already selected
- **Steps:**
  1. Clear the recipient field
  2. Type a new search query
- **Expected:** Previous recipient is removed; new autocomplete suggestions appear
- **Priority:** Medium

### FUNC_005 - Open recipient dropdown via arrow icon
- **Category:** FUNCTION > Recipient Search & Select
- **Objective:** Verify clicking the dropdown arrow opens the recipient list
- **Precondition:** Modal is open
- **Steps:**
  1. Click the dropdown arrow icon on the recipient field
- **Expected:** Dropdown opens showing available recipients to select from
- **Priority:** Medium

## FUNC - Rich Text Editing

### FUNC_006 - Apply bold formatting
- **Category:** FUNCTION > Rich Text Editing
- **Objective:** Verify bold formatting can be toggled on selected text
- **Precondition:** Modal is open, text is typed in the textarea
- **Steps:**
  1. Type text in the textarea
  2. Select a portion of text
  3. Click the Bold (B) button
- **Expected:** Selected text becomes bold; clicking Bold again removes bold formatting
- **Priority:** Medium

### FUNC_007 - Apply italic formatting
- **Category:** FUNCTION > Rich Text Editing
- **Objective:** Verify italic formatting can be toggled on selected text
- **Precondition:** Modal is open, text is typed in the textarea
- **Steps:**
  1. Type text in the textarea
  2. Select a portion of text
  3. Click the Italic (I) button
- **Expected:** Selected text becomes italic; clicking Italic again removes italic formatting
- **Priority:** Medium

### FUNC_008 - Apply strikethrough formatting
- **Category:** FUNCTION > Rich Text Editing
- **Objective:** Verify strikethrough formatting can be toggled on selected text
- **Precondition:** Modal is open, text is typed in the textarea
- **Steps:**
  1. Type text in the textarea
  2. Select a portion of text
  3. Click the Strikethrough (S) button
- **Expected:** Selected text gets strikethrough; clicking again removes it
- **Priority:** Medium

### FUNC_009 - Apply numbered list
- **Category:** FUNCTION > Rich Text Editing
- **Objective:** Verify numbered list can be toggled
- **Precondition:** Modal is open, text is typed in the textarea
- **Steps:**
  1. Type multiple lines of text
  2. Select the lines
  3. Click the Numbered list button
- **Expected:** Lines are formatted as a numbered list; clicking again removes numbering
- **Priority:** Medium

### FUNC_010 - Insert link
- **Category:** FUNCTION > Rich Text Editing
- **Objective:** Verify link insertion via the link toolbar button
- **Precondition:** Modal is open, text is typed in the textarea
- **Steps:**
  1. Select text in the textarea
  2. Click the Link button
  3. Enter a URL in the dialog
  4. Confirm
- **Expected:** Selected text becomes a hyperlink; link URL is correctly associated
- **Priority:** Medium

### FUNC_011 - Apply quote formatting
- **Category:** FUNCTION > Rich Text Editing
- **Objective:** Verify quote/blockquote formatting can be toggled
- **Precondition:** Modal is open, text is typed in the textarea
- **Steps:**
  1. Type text in the textarea
  2. Select a paragraph
  3. Click the Quote button
- **Expected:** Selected paragraph displays in blockquote format; clicking again removes quote formatting
- **Priority:** Medium

### FUNC_012 - Apply multiple formatting simultaneously
- **Category:** FUNCTION > Rich Text Editing
- **Objective:** Verify multiple formatting options can be applied to the same text
- **Precondition:** Modal is open, text is typed in the textarea
- **Steps:**
  1. Select text
  2. Apply Bold
  3. Apply Italic
- **Expected:** Text is both bold and italic simultaneously
- **Priority:** Low

## FUNC - Mention Feature

### FUNC_013 - Trigger mention autocomplete with "@"
- **Category:** FUNCTION > Mention Feature
- **Objective:** Verify typing "@" followed by text triggers mention suggestions
- **Precondition:** Modal is open
- **Steps:**
  1. Click in the textarea
  2. Type "@" followed by a colleague's name
- **Expected:** Mention autocomplete dropdown appears with matching colleague names
- **Priority:** High

### FUNC_014 - Select mention from suggestions
- **Category:** FUNCTION > Mention Feature
- **Objective:** Verify clicking a mention suggestion inserts the mention
- **Precondition:** Modal is open, mention suggestions are visible
- **Steps:**
  1. Type "@nam" in the textarea
  2. Click on a suggested colleague name
- **Expected:** Mention is inserted into the text (formatted/highlighted); autocomplete dropdown closes
- **Priority:** High

### FUNC_015 - Mention with no matching results
- **Category:** FUNCTION > Mention Feature
- **Objective:** Verify behavior when "@" mention finds no matches
- **Precondition:** Modal is open
- **Steps:**
  1. Type "@zzznonexistent" in the textarea
- **Expected:** No suggestions shown or "No results" message displayed; user can continue typing normally
- **Priority:** Low

## FUNC - Hashtag Management

### FUNC_016 - Add a hashtag
- **Category:** FUNCTION > Hashtag Management
- **Objective:** Verify user can add a hashtag via the "+ Hashtag" button
- **Precondition:** Modal is open, no hashtags added
- **Steps:**
  1. Click the "+ Hashtag" button
  2. Select or type a hashtag from the dropdown
- **Expected:** Hashtag is added as a chip in the hashtag section
- **Priority:** High

### FUNC_017 - Remove a hashtag
- **Category:** FUNCTION > Hashtag Management
- **Objective:** Verify user can remove a hashtag by clicking "x" on the chip
- **Precondition:** Modal is open, at least one hashtag is added
- **Steps:**
  1. Click the "x" button on a hashtag chip
- **Expected:** Hashtag chip is removed from the list
- **Priority:** High

### FUNC_018 - Add maximum 5 hashtags
- **Category:** FUNCTION > Hashtag Management
- **Objective:** Verify user can add up to 5 hashtags
- **Precondition:** Modal is open
- **Steps:**
  1. Add 5 hashtags one by one
- **Expected:** All 5 hashtags display as chips; "+ Hashtag" button is hidden or disabled after 5th tag
- **Priority:** High

### FUNC_019 - Attempt to add more than 5 hashtags
- **Category:** FUNCTION > Hashtag Management
- **Objective:** Verify system prevents adding more than 5 hashtags
- **Precondition:** Modal is open, 5 hashtags already added
- **Steps:**
  1. Try to add a 6th hashtag
- **Expected:** Cannot add; "+ Hashtag" button is hidden or disabled; no error crash
- **Priority:** High

### FUNC_020 - Remove and re-add hashtag within limit
- **Category:** FUNCTION > Hashtag Management
- **Objective:** Verify removing a hashtag allows adding new ones again
- **Precondition:** Modal is open, 5 hashtags added
- **Steps:**
  1. Remove one hashtag (click "x")
  2. Click "+ Hashtag" to add a new one
- **Expected:** "+ Hashtag" button becomes available again; new hashtag can be added; total remains <= 5
- **Priority:** Medium

## FUNC - Image Upload

### FUNC_021 - Upload a single image
- **Category:** FUNCTION > Image Upload
- **Objective:** Verify user can upload an image via file picker
- **Precondition:** Modal is open
- **Steps:**
  1. Click the "+ Image" button
  2. Select a valid image file (e.g., .jpg, .png)
- **Expected:** Image is uploaded and displayed as a thumbnail with "x" remove button
- **Priority:** Medium

### FUNC_022 - Upload maximum 5 images
- **Category:** FUNCTION > Image Upload
- **Objective:** Verify user can upload up to 5 images
- **Precondition:** Modal is open
- **Steps:**
  1. Upload 5 images one by one
- **Expected:** All 5 thumbnails displayed; "+ Image" button is hidden after 5th image
- **Priority:** Medium

### FUNC_023 - Attempt to upload more than 5 images
- **Category:** FUNCTION > Image Upload
- **Objective:** Verify system prevents uploading more than 5 images
- **Precondition:** Modal is open, 5 images already uploaded
- **Steps:**
  1. Observe the "+ Image" button
- **Expected:** "+ Image" button is hidden; no way to upload additional images
- **Priority:** Medium

### FUNC_024 - Remove an uploaded image
- **Category:** FUNCTION > Image Upload
- **Objective:** Verify user can remove an image by clicking "x" on thumbnail
- **Precondition:** Modal is open, at least one image uploaded
- **Steps:**
  1. Click the "x" button on an image thumbnail
- **Expected:** Image is removed from the list; "+ Image" button reappears if count was at 5
- **Priority:** Medium

### FUNC_025 - Upload unsupported file type
- **Category:** FUNCTION > Image Upload
- **Objective:** Verify error when uploading a non-image file
- **Precondition:** Modal is open
- **Steps:**
  1. Click "+ Image"
  2. Select a non-image file (e.g., .csv, .txt, .mp3)
- **Expected:** Error message displayed; file is not uploaded
- **Priority:** Medium

### FUNC_026 - Upload image exceeding size limit
- **Category:** FUNCTION > Image Upload
- **Objective:** Verify error when uploading an image that exceeds maximum file size
- **Precondition:** Modal is open
- **Steps:**
  1. Click "+ Image"
  2. Select an image file larger than the allowed maximum size
- **Expected:** Error message displayed; file is not uploaded
- **Priority:** Medium

### FUNC_027 - Remove and re-upload image within limit
- **Category:** FUNCTION > Image Upload
- **Objective:** Verify removing images allows uploading new ones
- **Precondition:** Modal is open, 5 images uploaded
- **Steps:**
  1. Remove one image
  2. Upload a new image
- **Expected:** "+ Image" button reappears after removal; new image can be uploaded; total remains <= 5
- **Priority:** Low

## FUNC - Anonymous Toggle

### FUNC_028 - Enable anonymous mode
- **Category:** FUNCTION > Anonymous Toggle
- **Objective:** Verify toggling anonymous mode on shows the anonymous name field
- **Precondition:** Modal is open, anonymous toggle is off
- **Steps:**
  1. Click the "Gui an danh" toggle
- **Expected:** Toggle becomes checked/enabled; anonymous name text field appears
- **Priority:** Medium

### FUNC_029 - Disable anonymous mode
- **Category:** FUNCTION > Anonymous Toggle
- **Objective:** Verify toggling anonymous mode off hides the anonymous name field
- **Precondition:** Modal is open, anonymous toggle is on
- **Steps:**
  1. Click the "Gui an danh" toggle to disable it
- **Expected:** Toggle becomes unchecked; anonymous name text field is hidden
- **Priority:** Medium

### FUNC_030 - Submit with anonymous mode enabled
- **Category:** FUNCTION > Anonymous Toggle
- **Objective:** Verify kudo is sent anonymously when toggle is enabled
- **Precondition:** Modal is open, all required fields filled, anonymous toggle is on
- **Steps:**
  1. Enable anonymous mode
  2. Fill in all required fields
  3. Click "Gui"
- **Expected:** Kudo is submitted successfully; sender identity is hidden in the kudo display
- **Priority:** High

## FUNC - Form Validation

### FUNC_031 - Submit with all required fields empty
- **Category:** FUNCTION > Form Validation
- **Objective:** Verify form cannot be submitted when all required fields are empty
- **Precondition:** Modal is open, no fields filled
- **Steps:**
  1. Observe the "Gui" button without filling any fields
- **Expected:** "Gui" button is disabled and cannot be clicked
- **Priority:** High

### FUNC_032 - Submit with only recipient filled
- **Category:** FUNCTION > Form Validation
- **Objective:** Verify form cannot be submitted with only the recipient field filled
- **Precondition:** Modal is open
- **Steps:**
  1. Select a recipient
  2. Leave message and hashtag fields empty
  3. Observe the "Gui" button
- **Expected:** "Gui" button remains disabled
- **Priority:** High

### FUNC_033 - Submit with only message filled
- **Category:** FUNCTION > Form Validation
- **Objective:** Verify form cannot be submitted with only the message filled
- **Precondition:** Modal is open
- **Steps:**
  1. Type a message in the textarea
  2. Leave recipient and hashtag fields empty
  3. Observe the "Gui" button
- **Expected:** "Gui" button remains disabled
- **Priority:** High

### FUNC_034 - Submit with only hashtags filled
- **Category:** FUNCTION > Form Validation
- **Objective:** Verify form cannot be submitted with only hashtags added
- **Precondition:** Modal is open
- **Steps:**
  1. Add at least one hashtag
  2. Leave recipient and message fields empty
  3. Observe the "Gui" button
- **Expected:** "Gui" button remains disabled
- **Priority:** High

### FUNC_035 - Submit with recipient and message but no hashtag
- **Category:** FUNCTION > Form Validation
- **Objective:** Verify form cannot be submitted without at least one hashtag
- **Precondition:** Modal is open
- **Steps:**
  1. Select a recipient
  2. Type a message
  3. Do not add any hashtags
  4. Observe the "Gui" button
- **Expected:** "Gui" button remains disabled
- **Priority:** High

### FUNC_036 - Submit button enabled when all required fields are filled
- **Category:** FUNCTION > Form Validation
- **Objective:** Verify "Gui" button becomes enabled when all required fields have valid values
- **Precondition:** Modal is open
- **Steps:**
  1. Select a recipient
  2. Type a message
  3. Add at least one hashtag
- **Expected:** "Gui" button becomes enabled/clickable
- **Priority:** High

### FUNC_037 - Submit with message containing only spaces
- **Category:** FUNCTION > Form Validation
- **Objective:** Verify form validation rejects message with only whitespace
- **Precondition:** Modal is open
- **Steps:**
  1. Select a recipient
  2. Type only spaces in the textarea
  3. Add a hashtag
  4. Attempt to submit
- **Expected:** Validation error; form is not submitted; "Gui" button remains disabled or error shown
- **Priority:** Medium

## FUNC - Form Submission

### FUNC_038 - Successful form submission
- **Category:** FUNCTION > Form Submission
- **Objective:** Verify kudo is successfully submitted with all valid data
- **Precondition:** Modal is open, all required fields filled with valid data
- **Steps:**
  1. Select a recipient
  2. Type a gratitude message
  3. Add 1-5 hashtags
  4. Optionally upload images
  5. Click "Gui"
- **Expected:** Loading state shown; form submits successfully; modal closes; kudo appears in the list
- **Priority:** High

### FUNC_039 - Submit with all optional fields filled
- **Category:** FUNCTION > Form Submission
- **Objective:** Verify submission works with all fields (required + optional) filled
- **Precondition:** Modal is open
- **Steps:**
  1. Select a recipient
  2. Type a rich-text message with formatting and "@" mention
  3. Add 5 hashtags
  4. Upload 5 images
  5. Enable anonymous mode
  6. Click "Gui"
- **Expected:** Form submits successfully with all data; modal closes; kudo displays with all content
- **Priority:** High

### FUNC_040 - Submit loading state
- **Category:** FUNCTION > Form Submission
- **Objective:** Verify loading indicator is shown during form submission
- **Precondition:** All required fields filled
- **Steps:**
  1. Click "Gui"
  2. Observe the button during submission
- **Expected:** "Gui" button shows loading state (spinner or disabled); prevents double submission
- **Priority:** Medium

### FUNC_041 - Double-click submit button
- **Category:** FUNCTION > Form Submission
- **Objective:** Verify double-clicking submit does not create duplicate kudos
- **Precondition:** All required fields filled
- **Steps:**
  1. Double-click the "Gui" button quickly
- **Expected:** Only one kudo is created; no duplicate submissions
- **Priority:** High

### FUNC_042 - Submit with network error
- **Category:** FUNCTION > Form Submission
- **Objective:** Verify error handling when network fails during submission
- **Precondition:** All required fields filled, network connection interrupted
- **Steps:**
  1. Fill all required fields
  2. Disconnect network
  3. Click "Gui"
- **Expected:** Error message displayed; form data is preserved; user can retry after reconnecting
- **Priority:** Medium

## FUNC - Cancel Operation

### FUNC_043 - Cancel with empty form
- **Category:** FUNCTION > Cancel Operation
- **Objective:** Verify clicking "Huy" closes the modal when no data is entered
- **Precondition:** Modal is open, no fields filled
- **Steps:**
  1. Click the "Huy" button
- **Expected:** Modal closes immediately; no data is saved
- **Priority:** High

### FUNC_044 - Cancel with filled form data
- **Category:** FUNCTION > Cancel Operation
- **Objective:** Verify clicking "Huy" closes the modal and discards all entered data
- **Precondition:** Modal is open, some fields filled
- **Steps:**
  1. Fill in recipient, message, and hashtags
  2. Click "Huy"
- **Expected:** Modal closes; all entered data is discarded; no kudo is created
- **Priority:** High

### FUNC_045 - Reopen modal after cancel
- **Category:** FUNCTION > Cancel Operation
- **Objective:** Verify modal opens fresh after a previous cancel
- **Precondition:** User previously opened and cancelled the modal
- **Steps:**
  1. Open the modal, fill some data, click "Huy"
  2. Open the modal again
- **Expected:** Modal opens with all fields in default/empty state; no previously entered data is retained
- **Priority:** Medium

## FUNC - Modal Behavior

### FUNC_046 - Close modal by clicking outside
- **Category:** FUNCTION > Modal Behavior
- **Objective:** Verify behavior when clicking outside the modal overlay
- **Precondition:** Modal is open
- **Steps:**
  1. Click on the overlay area outside the modal
- **Expected:** Modal closes or stays open per specification; if data was entered, confirm discard behavior
- **Priority:** Medium

### FUNC_047 - Close modal with ESC key
- **Category:** FUNCTION > Modal Behavior
- **Objective:** Verify pressing ESC key closes the modal
- **Precondition:** Modal is open
- **Steps:**
  1. Press the ESC key
- **Expected:** Modal closes; entered data is discarded
- **Priority:** Medium

### FUNC_048 - Tab order within modal
- **Category:** FUNCTION > Modal Behavior
- **Objective:** Verify Tab key navigates through form fields in correct order
- **Precondition:** Modal is open
- **Steps:**
  1. Press Tab repeatedly
  2. Observe focus movement
- **Expected:** Focus moves through fields in logical order: Recipient -> Toolbar buttons -> Textarea -> Hashtag -> Image -> Anonymous toggle -> Cancel -> Submit; focus is trapped within modal
- **Priority:** Medium

### FUNC_049 - Scroll background while modal is open
- **Category:** FUNCTION > Modal Behavior
- **Objective:** Verify background page does not scroll while modal is open
- **Precondition:** Modal is open, background page has scrollable content
- **Steps:**
  1. Attempt to scroll the page behind the modal
- **Expected:** Background page does not scroll; modal stays in position
- **Priority:** Low

### FUNC_050 - Reload page while modal is open
- **Category:** FUNCTION > Modal Behavior
- **Objective:** Verify behavior when page is reloaded with modal open
- **Precondition:** Modal is open, some data entered
- **Steps:**
  1. Press F5 or Ctrl+R to reload the page
- **Expected:** Page reloads; modal is closed; all entered data is lost
- **Priority:** Low

## FUNC - Edge Cases

### FUNC_051 - Submit kudo to self
- **Category:** FUNCTION > Edge Cases
- **Objective:** Verify behavior when user tries to send a kudo to themselves
- **Precondition:** Modal is open
- **Steps:**
  1. Search for and select own name in the recipient field
- **Expected:** System prevents self-kudo or shows appropriate message (per business rules)
- **Priority:** Medium

### FUNC_052 - Special characters in message
- **Category:** FUNCTION > Edge Cases
- **Objective:** Verify message accepts and properly handles special characters
- **Precondition:** Modal is open
- **Steps:**
  1. Type message with special characters: <script>, HTML tags, emojis, Vietnamese diacritics
  2. Submit the form
- **Expected:** Special characters are properly escaped/sanitized; no XSS; content displays correctly after submission
- **Priority:** High

### FUNC_053 - Very long message text
- **Category:** FUNCTION > Edge Cases
- **Objective:** Verify behavior with extremely long message text
- **Precondition:** Modal is open
- **Steps:**
  1. Paste a very long text (e.g., 10,000+ characters) into the textarea
  2. Attempt to submit
- **Expected:** System handles gracefully; either allows submission or shows max length error
- **Priority:** Low

### FUNC_054 - Concurrent modal opens in multiple tabs
- **Category:** FUNCTION > Edge Cases
- **Objective:** Verify behavior when modal is opened in multiple browser tabs
- **Precondition:** User is logged in in multiple tabs
- **Steps:**
  1. Open Viet Kudo modal in Tab 1
  2. Open Viet Kudo modal in Tab 2
  3. Submit kudo in both tabs
- **Expected:** Both submissions succeed independently; no conflicts or errors
- **Priority:** Low
