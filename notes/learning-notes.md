# Learning Notes

## Analogies and Mnemonics

- `id` is like a unique name tag or location pin for an element.
- One way of thinking about it: the `id` helps JavaScript find the right thing, kind of like using `Life360` to find a specific person or place.
- `JavaScript` is the part that uses those labels to make things happen on the page.
- Life360 analogy for `const songTitleInput = document.getElementById("song-title");`:
  - `document` is the whole Life360 map, meaning the whole webpage.
  - `.getElementById()` is the feature that searches for one specific person or place.
  - `"song-title"` is the HTML element's unique name or ID.
  - `songTitleInput` is the nickname JavaScript saves for that element after finding it.
  - `const` creates that named reference and means JavaScript should not point the nickname at a different element later.
  - `songTitleInput.value` means: read what the user typed inside the song-title input.
- `console.log()` is like leaving yourself a note in the browser's hidden developer notebook.
- `margin` is space outside an element.
- `padding` is space inside an element.
- `ul` is a little like a `div` for lists: it groups list items together, but specifically for bullet-style list content.
- The `=` sign in an HTML attribute is like a label maker saying "is":
  - `class="mood-chip"` means the class is `mood-chip`.
  - `type="button"` means the type is `button`.
  - `data-mood="All"` means the stored mood is `All`.
  - The reusable pattern is `attribute="value"`.
- `let` creates a named variable whose value can change later.
- `data-mood` stores the category assigned to a song.
- `data-filter` stores the category the user wants to view.

## Cloze Card Examples

- `<p>` creates a _____ on the page. Answer: `paragraph`.
- HTML controls structure; CSS controls _____. Answer: `appearance`.
- JavaScript adds _____ to a page. Answer: `behavior`.
- `document.getElementById()` finds one HTML element using its unique _____. Answer: `id`.
- `songTitleInput.value` reads what the user _____ into the input. Answer: `typed`.
- `textContent` changes an element's visible _____. Answer: `text`.
- `addEventListener()` listens for an _____ such as a click or submit. Answer: `event`.
- `let` creates a variable whose value can be _____ later. Answer: `changed or reassigned`.
- In `class="mood-chip"`, the `=` connects the attribute name to its _____. Answer: `value`.
- `data-mood` describes the category being _____, while a filter controls what is shown. Answer: `saved`.

## Practice System Ideas

- Use cloze cards for concepts, not just exam questions.
- Use a missed-concepts log for anything that felt confusing or was answered incorrectly.
- Use "find the mistake" cards to practice debugging small broken code snippets.
- Review steps: `1d`, `3d`, `7d`, `14d`, `30d`.
- Organize cards into `HTML`, `CSS`, and `JavaScript` groups.

## Learning Approach

- Pause to ask what individual lines and symbols mean.
- Try to recognize and extend patterns before asking AI to finish them.
- Use AI as a tutor and assistant, not as a replacement for understanding the code.

## Goal for Later

- Move these notes into `Notion` once the project and study system feel more polished.

## New Topics from MusicMoodApp

- `CSS Grid` is helpful when you want items to line up in columns, like putting `Song` and `Artist` side by side.
- A `hero section` is the big opening section at the top of a page that sets the mood and explains what the app is.
- `Cards` or `panels` help separate content visually so the layout feels cleaner and easier to scan.
- `Responsive layout` means the page rearranges itself to fit smaller screens instead of staying stuck in one desktop shape.
- `Visual hierarchy` means making the most important things stand out first through size, spacing, color, and placement.
- A filter creates a smaller visible list from a larger saved list.
- `activeFilter` remembers which category the user currently wants to see.
- `entries.filter(...)` keeps only entries that pass a condition.
- `visibleEntries.length === 0` checks whether the chosen category has no saved songs.
