# Reference Viewpoints Library - Sun* Kudos - Live Board

## Source: Carousel Screen

### Carousel Navigation (Next/Previous)
- Click Next button when current slide is first / middle / last slide
- Click Previous button when current slide is first / middle / last slide
- Click continuously on Next/Previous button at different positions
- Expected: Go to correct slide based on requirement

### Carousel Indicator Dots
- Click on first / middle / last indicator dot
- Double click on indicator dot
- Click on current (active) indicator dot → Carousel keeps unchanged

### Auto-move Slide
- No action on page → auto-move
- After click Next/Previous button → auto-move resumes
- After click indicator button → auto-move resumes

### Carousel Link Access
- Click/Double click on link in title/image
- Conditions: permitted/not permitted link × logged-in/logged-out user
- Expected: Open link successfully or redirect to login

## Source: Static_Pagination Screen

### Previous Link Operation
- Current Page = First Page → Previous disabled
- Current Page = Last Page → Previous enabled
- firstPage < currentPage < lastPage → Previous enabled
- Expected: Display pagination links correctly, go to destination page

### Next Link Operation
- Current Page = First Page → Next enabled
- Current Page = Last Page → Next disabled
- firstPage < currentPage < lastPage → Next enabled
- Expected: Display pagination links correctly, go to destination page

### First/Last Link Operation
- Navigate to first/last page from any position
- Expected: Go to destination page successfully

## Source: Search Screen - Text Search

### Default Value Search
- Search with default value → results matching condition

### Blank Field Search
- Search with blank → all results returned

### Text Match
- Exact match → matching results
- Partial match → matching results
- Non-existent text → no results / empty

### Deleted Records
- Search text of deleted record → deleted item not displayed

### Special Characters
- Search with special characters → results matching condition

### Max Length
- Search with maxlength characters → results matching
- Search with > maxlength → input not allowed

### Trim Spaces
- Auto trim leading/trailing spaces from search input

## Source: Search Screen - Dropdown List

### Default/None Selection
- Default value → results matching condition
- No value selected → all results returned

### Single/Multiple Selection
- One value selected → matching results
- Multiple values selected → results matching any selected value

### Suggestion/Autocomplete
- Input existing value → display matching suggestions
- Input partial match → display matching suggestions
- Input non-existing value → no suggestions

### Select from Suggestion
- Select one from suggestion → filtered results
- Select multiple from suggestion → results matching any selection

## Source: Search Screen - Display of Search Results

### Result Count Message
- Has results → display correct count message
- No results → display no results message

### Pagination
- Pagination operates correctly (refer to pagination checklist)

### Result Format
- All items display with correct format as spec

### Default Sort Order
- Items display with correct sort order as spec

### Result Area Operations
- All interactive items (links, buttons, checkboxes) have correct behavior
