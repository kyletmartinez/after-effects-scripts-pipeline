# After Effects Scripts Pipeline

This Gulp workflow was built to keep my [After Effects Scripts](https://github.com/kyletmartinez/after-effects-scripts) consistent and easily build all `README.md` files from preexisting documentation.

## Gulp

Simply navigate to the locallly cloned repository and run the `gulp` command. The gulpfile will default to running 3 tasks but each task can be run individually as well.

`after-effects-scripts-pipeline % gulp`

## Lint

`after-effects-scripts-pipeline % gulp lint`

I'm using [eslint](https://eslint.org/) to keep script files bug-free and consistently formatted based on [.eslintrc.json](https://github.com/kyletmartinez/after-effects-scripts-pipeline/blob/master/.eslintrc.json).

* `Global variables` - variables defined within the ExtendScript environment in After Effects
* `Rules` - formatting standards based on personal preferrence

## Build

`after-effects-scripts-pipeline % gulp build`

Because each script contains extensive [JSDoc](https://jsdoc.app/) comments I can automatically build all `README.md` files using [Handlebars](https://handlebarsjs.com/).

* `@name` - Script name
* `@version` - Script version
* `@description` - Script description

Knowing the build process is specifically targeting `README.md` files for GitHub I am able to take advantage of GitHub-centric markdown.

* Links on GitHub are built by converting spaces to `%20` because GitHub is annoying
* Double quotes within the `@description` are converted to backticks and render as `inline-code snippets`
* Some scripts make use of GitHub-rendered alert blockquotes to provide additional information

## Version

`after-effects-scripts-pipeline % gulp version`

The `@version` number within each script can be automatically updated based on if a file contains and `git diff hunks` since the previous commit.
