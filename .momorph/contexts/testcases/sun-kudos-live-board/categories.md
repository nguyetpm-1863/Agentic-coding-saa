# Test Cases: Sun* Kudos - Live Board

## 1. ACCESSING
| Category | Sub Category | Sub Sub Category |
| -------- | ------------ | ---------------- |
| Check access permission | Direct URL access | Unauthenticated user |
| Check access permission | Direct URL access | Authenticated user |
| Check authentication | Session expired | Redirect to login |
| Check navigation path | From header nav | Via Kudos nav link |

## 2. GUI
| Category | Sub Category | Sub Sub Category |
| -------- | ------------ | ---------------- |
| Check layout | Screen-wide layout | Overall structure |
| Initialize | Button ghi nhận | Placeholder text |
| Initialize | Tìm kiếm sunner | Placeholder text |
| Initialize | Highlight Carousel | Default value/state |
| Initialize | Carousel Pagination | Default value/state |

## 3. FUNCTION
| Category | Sub Category | Sub Sub Category |
| -------- | ------------ | ---------------- |
| Check component interaction | Button ghi nhận | Open |
| Check component interaction | ButtonHashtag | Open |
| Check component interaction | ButtonHashtag | Select |
| Check component interaction | Button Phòng ban | Open |
| Check component interaction | Button Phòng ban | Select |
| Check cross-component effect | Hashtag filter apply | Highlight carousel updates |
| Check cross-component effect | Department filter apply | Highlight carousel updates |
| Check component interaction | Carousel Button tiến | Navigate |
| Check component interaction | Carousel Button lùi | Navigate |
| Check state transition | Carousel Button tiến | Enabled -> Disabled |
| Check state transition | Carousel Button lùi | Enabled -> Disabled |
| Check cross-component effect | Carousel navigation | Pagination indicator updates |
| Check list behavior | Highlight Carousel | Single item |
| Check list behavior | Highlight Carousel | Multiple items |
| Check list behavior | Highlight Carousel | Boundary (first/last) |
| Check component interaction | Tìm kiếm sunner | Search |
| Check cross-component effect | Spotlight search | Word cloud highlights matching |
| Check component interaction | Pan zoom button | Toggle |
| Check business logic | Kudos counter | Total count display |
| Check business logic | Latest kudo notification | Display format |
| Check component interaction | Hearts button | Toggle |
| Check state transition | Hearts button | Not liked -> Liked |
| Check state transition | Hearts button | Liked -> Not liked |
| Check business logic | Hearts button | Like count update |
| Check component interaction | Copy link button | Copy |
| Check navigation behavior | View detail link | Kudo detail page |
| Check component interaction | Avatar hover | Preview popup |
| Check navigation behavior | Avatar click | User profile page |
| Check navigation behavior | Name click | User profile page |
| Check list behavior | Kudos feed | Empty list |
| Check list behavior | Kudos feed | Multiple items |
| Check list behavior | Kudos feed | Pagination/Load more |
| Check business logic | Kudos feed | Sort order (newest first) |
| Check business logic | Kudo post content | Truncation (max 5 lines) |
| Check business logic | Highlight kudo content | Truncation (max 3 lines) |
| Check component interaction | Hashtag in post | Filter apply |
| Check cross-component effect | Hashtag in post click | Feed filters to matching |
| Check business logic | Stats sidebar | User stats display |
| Check component interaction | Button mở quà | Open |
| Check state transition | Button mở quà | Has unopened -> Enabled |
| Check business logic | Top receivers leaderboard | Display top 10 |
| Check business logic | Highlight kudos | Sort by most liked |
| Check business logic | Spotlight word cloud | Name positioning no overlap |
| Check business logic | Time display | Format HH:mm - MM/DD/YYYY |
