# FUNCTION Test Cases - Addlink Box (Modal)

## Text Field - Valid Input

### FN-001: Enter valid text with alphabet characters
- **Objective:** Verify Text field accepts alphabet characters
- **Precondition:** Modal is open
- **Test Data:** "Click here"
- **Steps:** 1. Enter "Click here" in Text field. 2. Enter valid URL in Link field. 3. Click Save.
- **Expected:** Data saved successfully. Modal closes.
- **Specs:** B, B.2
- **Priority:** High

### FN-002: Enter valid text with numeric characters
- **Objective:** Verify Text field accepts numeric characters
- **Precondition:** Modal is open
- **Test Data:** "Link123"
- **Steps:** 1. Enter "Link123" in Text field. 2. Enter valid URL in Link field. 3. Click Save.
- **Expected:** Data saved successfully. Modal closes.
- **Specs:** B, B.2
- **Priority:** High

### FN-003: Enter valid text with special characters
- **Objective:** Verify Text field accepts special characters
- **Precondition:** Modal is open
- **Test Data:** "Link @#$%&!"
- **Steps:** 1. Enter special characters in Text field. 2. Enter valid URL in Link field. 3. Click Save.
- **Expected:** Data saved with special characters preserved.
- **Specs:** B, B.2
- **Priority:** Medium

### FN-004: Enter valid text with Unicode characters
- **Objective:** Verify Text field accepts Unicode/multibyte characters
- **Precondition:** Modal is open
- **Test Data:** "Duong dan lien ket"
- **Steps:** 1. Enter Unicode text in Text field. 2. Enter valid URL in Link field. 3. Click Save.
- **Expected:** Data saved with Unicode characters preserved.
- **Specs:** B, B.2
- **Priority:** Medium

### FN-005: Enter valid text with Japanese characters
- **Objective:** Verify Text field accepts full-width Japanese characters
- **Precondition:** Modal is open
- **Test Data:** "リンクテキスト"
- **Steps:** 1. Enter Japanese text in Text field. 2. Enter valid URL in Link field. 3. Click Save.
- **Expected:** Data saved with Japanese characters preserved.
- **Specs:** B, B.2
- **Priority:** Medium

### FN-006: Enter text with redundant spaces
- **Objective:** Verify Text field handles leading/trailing/between spaces
- **Precondition:** Modal is open
- **Test Data:** "  Hello  World  "
- **Steps:** 1. Enter text with redundant spaces in Text field. 2. Enter valid URL in Link field. 3. Click Save.
- **Expected:** Data saved. Leading/trailing spaces may be trimmed.
- **Specs:** B, B.2
- **Priority:** Medium

## Text Field - Boundary

### FN-007: Text at minimum length (1 char)
- **Objective:** Verify Text field accepts min length
- **Precondition:** Modal is open
- **Test Data:** "A" (1 character)
- **Steps:** 1. Enter "A" in Text field. 2. Enter valid URL. 3. Click Save.
- **Expected:** Data saved successfully.
- **Specs:** B, B.2
- **Priority:** High

### FN-008: Text at min + 1 (2 chars)
- **Objective:** Verify Text field accepts min+1 length
- **Precondition:** Modal is open
- **Test Data:** "AB" (2 characters)
- **Steps:** 1. Enter "AB" in Text field. 2. Enter valid URL. 3. Click Save.
- **Expected:** Data saved successfully.
- **Specs:** B, B.2
- **Priority:** Medium

### FN-009: Text at maximum length (100 chars)
- **Objective:** Verify Text field accepts max length
- **Precondition:** Modal is open
- **Test Data:** 100-character string
- **Steps:** 1. Enter 100-char string in Text field. 2. Enter valid URL. 3. Click Save.
- **Expected:** Data saved successfully.
- **Specs:** B, B.2
- **Priority:** High

### FN-010: Text at max - 1 (99 chars)
- **Objective:** Verify Text field accepts max-1 length
- **Precondition:** Modal is open
- **Test Data:** 99-character string
- **Steps:** 1. Enter 99-char string in Text field. 2. Enter valid URL. 3. Click Save.
- **Expected:** Data saved successfully.
- **Specs:** B, B.2
- **Priority:** Medium

## Text Field - Invalid Input

### FN-011: Text field empty
- **Objective:** Verify error when Text field is empty
- **Precondition:** Modal is open
- **Test Data:** (empty)
- **Steps:** 1. Leave Text field empty. 2. Enter valid URL. 3. Click Save.
- **Expected:** Error message displayed. Modal remains open.
- **Specs:** B, B.2
- **Priority:** High

### FN-012: Text field whitespace only
- **Objective:** Verify error when Text field has only spaces
- **Precondition:** Modal is open
- **Test Data:** "     "
- **Steps:** 1. Enter only spaces in Text field. 2. Enter valid URL. 3. Click Save.
- **Expected:** Error message displayed. Modal remains open.
- **Specs:** B, B.2
- **Priority:** High

### FN-013: Text exceeds max length (101 chars)
- **Objective:** Verify behavior when Text exceeds 100 chars
- **Precondition:** Modal is open
- **Test Data:** 101-character string
- **Steps:** 1. Enter 101-char string in Text field. 2. Enter valid URL. 3. Click Save.
- **Expected:** Input truncated to 100 chars or error message displayed.
- **Specs:** B, B.2
- **Priority:** High

## Link Field - Valid Input

### FN-014: Valid HTTP URL
- **Objective:** Verify Link field accepts HTTP URL
- **Precondition:** Modal is open
- **Test Data:** "http://example.com"
- **Steps:** 1. Enter valid text. 2. Enter "http://example.com" in Link field. 3. Click Save.
- **Expected:** Data saved. Modal closes.
- **Specs:** C, C.2
- **Priority:** High

### FN-015: Valid HTTPS URL
- **Objective:** Verify Link field accepts HTTPS URL
- **Precondition:** Modal is open
- **Test Data:** "https://example.com"
- **Steps:** 1. Enter valid text. 2. Enter "https://example.com" in Link field. 3. Click Save.
- **Expected:** Data saved. Modal closes.
- **Specs:** C, C.2
- **Priority:** High

### FN-016: URL with path and query params
- **Objective:** Verify Link field accepts complex URLs
- **Precondition:** Modal is open
- **Test Data:** "https://example.com/path?param=value&key=123#section"
- **Steps:** 1. Enter valid text. 2. Enter complex URL in Link field. 3. Click Save.
- **Expected:** Data saved with full URL preserved.
- **Specs:** C, C.2
- **Priority:** Medium

### FN-017: URL with encoded characters
- **Objective:** Verify Link field accepts URL-encoded characters
- **Precondition:** Modal is open
- **Test Data:** "https://example.com/path/%E3%83%86%E3%82%B9%E3%83%88"
- **Steps:** 1. Enter valid text. 2. Enter encoded URL in Link field. 3. Click Save.
- **Expected:** Data saved successfully.
- **Specs:** C, C.2
- **Priority:** Low

## Link Field - Boundary

### FN-018: URL at minimum length (5 chars)
- **Objective:** Verify Link field with min length URL
- **Precondition:** Modal is open
- **Test Data:** "h://a" (5 characters)
- **Steps:** 1. Enter valid text. 2. Enter 5-char URL. 3. Click Save.
- **Expected:** Depends on URL format validation.
- **Specs:** C, C.2
- **Priority:** High

### FN-019: URL at min + 1 (6 chars)
- **Objective:** Verify Link field with min+1 length
- **Precondition:** Modal is open
- **Test Data:** "http:a" (6 characters)
- **Steps:** 1. Enter valid text. 2. Enter 6-char URL. 3. Click Save.
- **Expected:** Depends on URL format validation.
- **Specs:** C, C.2
- **Priority:** Medium

### FN-020: URL at maximum length (2048 chars)
- **Objective:** Verify Link field accepts max length URL
- **Precondition:** Modal is open
- **Test Data:** Valid URL of 2048 characters
- **Steps:** 1. Enter valid text. 2. Enter 2048-char URL. 3. Click Save.
- **Expected:** Data saved successfully.
- **Specs:** C, C.2
- **Priority:** High

### FN-021: URL at max - 1 (2047 chars)
- **Objective:** Verify Link field with max-1 length
- **Precondition:** Modal is open
- **Test Data:** Valid URL of 2047 characters
- **Steps:** 1. Enter valid text. 2. Enter 2047-char URL. 3. Click Save.
- **Expected:** Data saved successfully.
- **Specs:** C, C.2
- **Priority:** Medium

## Link Field - Invalid Input

### FN-022: Link field empty
- **Objective:** Verify error when Link field is empty
- **Precondition:** Modal is open
- **Test Data:** (empty)
- **Steps:** 1. Enter valid text. 2. Leave Link field empty. 3. Click Save.
- **Expected:** Error message displayed. Modal remains open.
- **Specs:** C, C.2
- **Priority:** High

### FN-023: Invalid URL - no protocol
- **Objective:** Verify error for URL without http/https
- **Precondition:** Modal is open
- **Test Data:** "example.com"
- **Steps:** 1. Enter valid text. 2. Enter "example.com". 3. Blur Link field. 4. Click Save.
- **Expected:** Error message for invalid URL format.
- **Specs:** C, C.2
- **Priority:** High

### FN-024: Invalid URL - random text
- **Objective:** Verify error for non-URL text
- **Precondition:** Modal is open
- **Test Data:** "not a url at all"
- **Steps:** 1. Enter valid text. 2. Enter "not a url at all". 3. Click Save.
- **Expected:** Error message for invalid URL format.
- **Specs:** C, C.2
- **Priority:** High

### FN-025: URL exceeds max length (2049 chars)
- **Objective:** Verify error when URL exceeds 2048 chars
- **Precondition:** Modal is open
- **Test Data:** 2049-character URL string
- **Steps:** 1. Enter valid text. 2. Enter 2049-char URL. 3. Click Save.
- **Expected:** Input truncated or error message displayed.
- **Specs:** C, C.2
- **Priority:** High

### FN-026: URL below min length (4 chars)
- **Objective:** Verify error when URL is below 5 chars
- **Precondition:** Modal is open
- **Test Data:** "http" (4 characters)
- **Steps:** 1. Enter valid text. 2. Enter "http". 3. Click Save.
- **Expected:** Error message displayed.
- **Specs:** C, C.2
- **Priority:** Medium

### FN-027: URL validation on blur
- **Objective:** Verify URL validated on field blur
- **Precondition:** Modal is open
- **Test Data:** "invalid-url"
- **Steps:** 1. Enter "invalid-url" in Link field. 2. Click into Text field (blur Link).
- **Expected:** Error message displayed immediately on blur.
- **Specs:** C, C.2
- **Priority:** Medium

## Save Action

### FN-028: Save with all valid data
- **Objective:** Verify successful save
- **Precondition:** Modal is open
- **Test Data:** Text: "My Link", Link: "https://example.com"
- **Steps:** 1. Enter "My Link" in Text. 2. Enter "https://example.com" in Link. 3. Click Save.
- **Expected:** Data saved. Modal closes. Link added to parent.
- **Specs:** D.2, B, C
- **Priority:** High

### FN-029: Save with both fields empty
- **Objective:** Verify errors when both fields empty
- **Precondition:** Modal is open
- **Steps:** 1. Leave both fields empty. 2. Click Save.
- **Expected:** Error messages for both fields. Modal remains open.
- **Specs:** D.2, B, C
- **Priority:** High

### FN-030: Double-click Save
- **Objective:** Verify no duplicate save on double-click
- **Precondition:** Modal is open with valid data
- **Test Data:** Text: "My Link", Link: "https://example.com"
- **Steps:** 1. Enter valid data. 2. Double-click Save.
- **Expected:** Only one link saved. No duplicates.
- **Specs:** D.2
- **Priority:** Medium

### FN-031: Save via keyboard
- **Objective:** Verify Save via Tab + Enter
- **Precondition:** Modal is open with valid data
- **Steps:** 1. Enter valid data. 2. Tab to Save button. 3. Press Enter.
- **Expected:** Data saved. Modal closes.
- **Specs:** D.2
- **Priority:** Medium

## Cancel Action

### FN-032: Cancel with data entered
- **Objective:** Verify Cancel discards data
- **Precondition:** Modal is open
- **Steps:** 1. Enter text and URL. 2. Click Cancel.
- **Expected:** Modal closes. No data saved.
- **Specs:** D.1
- **Priority:** High

### FN-033: Cancel with no data
- **Objective:** Verify Cancel works on empty form
- **Precondition:** Modal is open
- **Steps:** 1. Click Cancel without entering data.
- **Expected:** Modal closes without error.
- **Specs:** D.1
- **Priority:** Medium

### FN-034: Double-click Cancel
- **Objective:** Verify no error on double-click Cancel
- **Precondition:** Modal is open
- **Steps:** 1. Double-click Cancel.
- **Expected:** Modal closes normally.
- **Specs:** D.1
- **Priority:** Low

## Security

### FN-035: SQL injection in Text field
- **Objective:** Verify SQL injection handled safely
- **Precondition:** Modal is open
- **Test Data:** "'; DROP TABLE users; --"
- **Steps:** 1. Enter SQL injection in Text. 2. Enter valid URL. 3. Click Save.
- **Expected:** Treated as plain text. No SQL execution.
- **Specs:** B, B.2
- **Priority:** High

### FN-036: HTML/script injection in Text field
- **Objective:** Verify XSS prevention
- **Precondition:** Modal is open
- **Test Data:** "<script>alert('XSS')</script>"
- **Steps:** 1. Enter script tag in Text. 2. Enter valid URL. 3. Click Save.
- **Expected:** Input sanitized. No script execution.
- **Specs:** B, B.2
- **Priority:** High

### FN-037: JavaScript URL in Link field
- **Objective:** Verify JavaScript protocol rejected
- **Precondition:** Modal is open
- **Test Data:** "javascript:alert('XSS')"
- **Steps:** 1. Enter valid text. 2. Enter "javascript:alert('XSS')" in Link. 3. Click Save.
- **Expected:** Rejected as invalid. Only http/https accepted.
- **Specs:** C, C.2
- **Priority:** High

## Keyboard & Interaction

### FN-038: Tab navigation within modal
- **Objective:** Verify tab order and focus trap
- **Precondition:** Modal is open
- **Steps:** 1. Press Tab repeatedly through all elements.
- **Expected:** Focus: Text -> Link -> Cancel -> Save -> loops. Focus trapped in modal.
- **Specs:** B.2, C.2, D.1, D.2
- **Priority:** Medium

### FN-039: Copy/paste in fields
- **Objective:** Verify copy/paste works in input fields
- **Precondition:** Modal is open
- **Test Data:** Clipboard: "https://example.com"
- **Steps:** 1. Copy URL. 2. Click Link field. 3. Paste (Ctrl+V / Cmd+V).
- **Expected:** Text pasted correctly.
- **Specs:** B.2, C.2
- **Priority:** Medium

### FN-040: Reload page while modal open
- **Objective:** Verify page reload behavior
- **Precondition:** Modal open with data entered
- **Steps:** 1. Enter data. 2. Reload page.
- **Expected:** Modal closes. Data lost. Page returns to default.
- **Specs:** A, B, C, D
- **Priority:** Low
