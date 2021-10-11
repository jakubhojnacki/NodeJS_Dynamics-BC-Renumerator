Replace "require" with "import"
-------------------------------
  Find:         const (\w+) = require\("([\w./]+)"\);
  Replace With: import $1 from "$2.mjs";