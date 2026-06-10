(function () {
  const lessons = {
    html: [
      item(
        "Paragraph",
        "<_____>Hello</p>",
        "p",
        "Which element creates a paragraph?",
        ["<p>", "<h1>", "<button>", "<img>"],
        "<p>",
        "<h1>Welcome<h1>",
        "</h1>",
        "The heading needs a closing </h1> tag."
      ),
      item(
        "Main heading",
        "<_____>My Closet</h1>",
        "h1",
        "Which element is normally the main page heading?",
        ["<h1>", "<p>", "<li>", "<footer>"],
        "<h1>",
        "<h1>My Page</h2>",
        "</h1>",
        "The opening and closing heading levels must match."
      ),
      item(
        "Links",
        '<a _____="about.html">About</a>',
        "href",
        "Which attribute tells a link where to go?",
        ["href", "src", "alt", "className"],
        "href",
        '<a src="about.html">About</a>',
        '<a href="about.html">About</a>',
        "Links use href. The src attribute is used by elements such as images."
      ),
      item(
        "Images",
        '<img _____="shirt.png" alt="Blue shirt">',
        "src",
        "Which attribute points to an image file?",
        ["src", "href", "for", "type"],
        "src",
        '<img href="shirt.png" alt="Blue shirt">',
        '<img src="shirt.png" alt="Blue shirt">',
        "An image loads its file from the src attribute."
      ),
      item(
        "Alternate text",
        '<img src="dress.png" _____="Red dress">',
        "alt",
        "What helps describe an image for someone who cannot see it?",
        ["alt text", "margin", "a script tag", "a class name"],
        "alt text",
        '<img src="dress.png" text="Red dress">',
        '<img src="dress.png" alt="Red dress">',
        "The alt attribute provides the image description."
      ),
      item(
        "Lists",
        "<ul><_____>Shoes</li></ul>",
        "li",
        "Which element creates one item inside a list?",
        ["<li>", "<ul>", "<nav>", "<span>"],
        "<li>",
        "<ul><p>Shoes</li></ul>",
        "<ul><li>Shoes</li></ul>",
        "Each list item uses matching li tags."
      ),
      item(
        "Buttons",
        '<button type="_____">Save</button>',
        "button",
        "Which type prevents a regular button from submitting a form?",
        ['type="button"', 'type="text"', 'type="link"', 'type="image"'],
        'type="button"',
        '<button type="submit">Open menu</button>',
        '<button type="button">Open menu</button>',
        "Use type button when the control should not submit a form."
      ),
      item(
        "Labels",
        '<label _____="email">Email</label>',
        "for",
        "What connects a label to an input with the same id?",
        ["for", "src", "href", "name-only"],
        "for",
        '<label id="email">Email</label><input id="email">',
        '<label for="email">Email</label><input id="email">',
        "The label for value should match the input id."
      ),
      item(
        "Main content",
        "<_____><h1>Archive</h1></main>",
        "main",
        "Which landmark wraps the primary page content?",
        ["<main>", "<head>", "<title>", "<meta>"],
        "<main>",
        "<main><h1>Archive</main></h1>",
        "<main><h1>Archive</h1></main>",
        "Nested elements close in reverse order, like closing boxes from the inside out."
      ),
      item(
        "Document body",
        "<body>Visible content goes _____.</body>",
        "here",
        "Where does visible page content belong?",
        ["Inside <body>", "Inside <title>", "Inside <meta>", "After </html>"],
        "Inside <body>",
        "<head><p>Hello</p></head>",
        "<body><p>Hello</p></body>",
        "Visible content belongs in body. Head stores page information."
      ),
    ],
    css: [
      item(
        "Text color",
        "p { _____: brown; }",
        "color",
        "Which property changes text color?",
        ["color", "background", "margin", "display"],
        "color",
        "p { text-color: brown; }",
        "p { color: brown; }",
        "CSS uses the color property for text."
      ),
      item(
        "Background",
        "body { _____: cream; }",
        "background",
        "Which property can set an element background?",
        ["background", "font-size", "padding", "width"],
        "background",
        "body { color-background: cream; }",
        "body { background: cream; }",
        "The background property controls the area behind content."
      ),
      item(
        "Inside spacing",
        ".card { _____: 20px; }",
        "padding",
        "Which property adds space inside a card?",
        ["padding", "margin", "gap-only", "position"],
        "padding",
        ".card { margin-inside: 20px; }",
        ".card { padding: 20px; }",
        "Padding is the cushion between content and its border."
      ),
      item(
        "Outside spacing",
        ".card { _____: 20px; }",
        "margin",
        "Which property adds space outside an element?",
        ["margin", "padding", "color", "font-family"],
        "margin",
        ".card { outside: 20px; }",
        ".card { margin: 20px; }",
        "Margin separates an element from its neighbors."
      ),
      item(
        "Rounded corners",
        ".card { border-_____: 16px; }",
        "radius",
        "Which property rounds corners?",
        ["border-radius", "border-color", "border-space", "corner"],
        "border-radius",
        ".card { border-round: 16px; }",
        ".card { border-radius: 16px; }",
        "Border radius controls how rounded the corners are."
      ),
      item(
        "Flexbox",
        ".row { display: _____; }",
        "flex",
        "Which display value starts a flex layout?",
        ["flex", "bold", "center", "column"],
        "flex",
        ".row { display = flex; }",
        ".row { display: flex; }",
        "CSS declarations use a colon between the property and value."
      ),
      item(
        "Grid",
        ".gallery { display: _____; }",
        "grid",
        "Which display value starts a grid layout?",
        ["grid", "block-size", "rows", "layout"],
        "grid",
        ".gallery { display: grids; }",
        ".gallery { display: grid; }",
        "The valid display value is grid, without an s."
      ),
      item(
        "Class selector",
        "____card { padding: 1rem; }",
        ".",
        "Which symbol begins a class selector?",
        [".", "#", "<", "@"],
        ".",
        "card { padding: 1rem; }",
        ".card { padding: 1rem; }",
        "A class selector begins with a period."
      ),
      item(
        "ID selector",
        "____menu { display: flex; }",
        "#",
        "Which symbol begins an id selector?",
        ["#", ".", ":", "&"],
        "#",
        ".menu { color: red; } /* HTML uses id=\"menu\" */",
        "#menu { color: red; }",
        "An HTML id is selected with a number sign."
      ),
      item(
        "Declaration ending",
        ".card { color: brown_____ }",
        ";",
        "Which symbol normally ends a CSS declaration?",
        [";", "=", "<", "?"],
        ";",
        ".card { color = brown; }",
        ".card { color: brown; }",
        "A colon assigns the value and a semicolon ends the declaration."
      ),
    ],
    javascript: [
      item(
        "Constants",
        "_____ name = \"Emma\";",
        "const",
        "Which keyword declares a variable that will not be reassigned?",
        ["const", "style", "return", "HTML"],
        "const",
        "constant name = \"Emma\";",
        "const name = \"Emma\";",
        "JavaScript uses the const keyword."
      ),
      item(
        "Changeable variables",
        "_____ score = 0;",
        "let",
        "Which keyword declares a variable that may change?",
        ["let", "const-only", "value", "change"],
        "let",
        "let score == 0;",
        "let score = 0;",
        "One equals sign assigns a value."
      ),
      item(
        "Selecting by id",
        'document._____("save");',
        "getElementById",
        "Which method finds one element by its id?",
        ["getElementById", "getStyle", "findHTML", "queryText"],
        "getElementById",
        'document.getElementByID("save");',
        'document.getElementById("save");',
        "JavaScript is case sensitive. The method ends with ById."
      ),
      item(
        "Visible text",
        'message._____ = "Saved";',
        "textContent",
        "Which property changes visible text?",
        ["textContent", "valueOnly", "innerStyle", "click"],
        "textContent",
        'message.text = "Saved";',
        'message.textContent = "Saved";',
        "textContent reads or changes an element's text."
      ),
      item(
        "Input values",
        "const name = nameInput._____;",
        "value",
        "Which property reads what a user typed?",
        [".value", ".textContent", ".style", ".idOnly"],
        ".value",
        "const name = nameInput;",
        "const name = nameInput.value;",
        "The variable needs the input's value, not the input element itself."
      ),
      item(
        "Click events",
        'button.addEventListener("_____", saveItem);',
        "click",
        "Which event runs when a button is pressed?",
        ["click", "loadText", "hovered", "changePage"],
        "click",
        'button.addEventListener("clicked", saveItem);',
        'button.addEventListener("click", saveItem);',
        "The browser event name is click."
      ),
      item(
        "Functions",
        "_____ saveItem() { }",
        "function",
        "Which keyword begins a regular function declaration?",
        ["function", "method-only", "run", "constantly"],
        "function",
        "function saveItem { }",
        "function saveItem() { }",
        "A function declaration needs parentheses after its name."
      ),
      item(
        "Arrays",
        "const colors = [\"blue\", \"_____ \"];",
        "rust",
        "Which brackets create an array?",
        ["[ ]", "{ }", "< >", "( ) only"],
        "[ ]",
        'const colors = {"blue", "rust"};',
        'const colors = ["blue", "rust"];',
        "Arrays use square brackets and commas between values."
      ),
      item(
        "Conditions",
        "_____ (score >= 8) { showWin(); }",
        "if",
        "Which keyword starts a condition?",
        ["if", "for", "const", "array"],
        "if",
        "if score >= 8 { showWin(); }",
        "if (score >= 8) { showWin(); }",
        "An if condition goes inside parentheses."
      ),
      item(
        "Form behavior",
        "event._____();",
        "preventDefault",
        "What stops a form from reloading the page?",
        ["preventDefault()", "stopHTML()", "noReload", "returnPage()"],
        "preventDefault()",
        "event.preventdefault();",
        "event.preventDefault();",
        "The D in preventDefault is uppercase."
      ),
    ],
  };

  function item(
    topic,
    fillCode,
    fillAnswer,
    choicePrompt,
    choiceOptions,
    choiceAnswer,
    bugCode,
    bugAnswer,
    explanation
  ) {
    return {
      topic,
      fillCode,
      fillAnswer,
      choicePrompt,
      choiceOptions,
      choiceAnswer,
      bugCode,
      bugAnswer,
      explanation,
    };
  }

  function makeActivities(language) {
    const languageName =
      language === "html" ? "HTML" : language === "css" ? "CSS" : "JavaScript";

    return lessons[language].flatMap(function (lesson, index) {
      const baseId = language + "-" + (index + 1);
      return [
        {
          id: baseId + "-fill",
          language,
          languageName,
          topic: lesson.topic,
          type: "fill",
          prompt: "Type the missing part.",
          code: lesson.fillCode,
          answer: lesson.fillAnswer.trim(),
          explanation: lesson.explanation,
        },
        {
          id: baseId + "-choice",
          language,
          languageName,
          topic: lesson.topic,
          type: "choice",
          prompt: lesson.choicePrompt,
          options: lesson.choiceOptions,
          answer: lesson.choiceAnswer,
          explanation: lesson.explanation,
        },
        {
          id: baseId + "-bug",
          language,
          languageName,
          topic: lesson.topic,
          type: "bug",
          prompt: "Fix the beginner bug in this code.",
          code: lesson.bugCode,
          answer: lesson.bugAnswer,
          explanation: lesson.explanation,
        },
      ];
    });
  }

  window.codingActivities = {
    html: makeActivities("html"),
    css: makeActivities("css"),
    javascript: makeActivities("javascript"),
  };
})();
