# After Effects Scripts Pipeline

This Gulp workflow helps update all `README.md` files within the [after-effects-scripts](https://github.com/kyletmartinez/after-effects-scripts) repository using [Handlebars](https://handlebarsjs.com/).

Simply navigate to the locally cloned repository and run the `gulp` command.

`after-effects-scripts-pipeline % gulp`

## JSDoc

Because each script is correctly annotated using [JSDoc](https://jsdoc.app/) the template can automatically pull the `@name`, `@version`, and `@description` from within each file.

## Links

Links on Github are annoying because the require using `%20` in the URL instead of spaces. Using a custom helper, Handlebars will rebuild the URLs to use the correct formatting.

## Todo

Eventually I would like to learn how to build a Github action to update the correct `README.md` whenever a new script or modified script is pushed to the `after-effects-scripts` repository. But for now, this works great!
