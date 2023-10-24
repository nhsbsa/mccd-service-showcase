# Styling

## Setting up a dev environment
Before visualizing changes in the theme and content, follow these steps to set up your development environment:

- [Create an `.env.local` ](#create-an-env-file)file in the root of your local repository to store the `env variables` that you will need to connect to other aspects of this service.
- [Install the packages](#install-the-packages-and-start-the-service) required to start your local development environment

### Create an env file
- In the root of your local project, create a new file named `.env.local`.
- Copy and paste the following content into the file:
```dotenv
NEXTAUTH_SECRET=frltbb9LZIesEjb3nTsjSO/WBbguJsvzfTa5D8H984Q=
SECRET_PASSWORD=secretpassword
NEXTAUTH_URL=http://localhost:3000
```
> **Note.** Optionally, generate a new secret for  `NEXTAUTH_SECRET` using `openssl`
>```shell
>openssl rand -base64 32
>```
### Install the packages and start the service
From your command line prompt:

- Make sure that you are in the root of your project if not run `cd ~/my_local_project_directory`
- Run `yarn` or `npm install`
- Once package installation is complete, run `yarn dev` or `npm run dev`
- Access the local service instance in your browser at http://localhost:3000

### Theme directory and structure
All theme configuration is stored in one directory, spanning three files and one subdirectory. 
Examples of each file and its formatting can be found in the `public/theme` directory serving as 
a starting point for your site.
```md
public/theme
├── font.config.js
├── fonts
│   ├── Roboto-Bold.ttf
│   ├── Roboto-BoldItalic.ttf
│   ├── Roboto-Italic.ttf
│   └── Roboto-Regular.ttf
├── images
│   └── logo.svg
├── theme.config.js
└── theme.scss

```
## Logo
- File type - .svg (recommended), .jpg, .png, .webp
- Size - max-height 70px, max-width 300px
- File location - `public/theme/images`
- Settings location`public/theme/theme.config.js`.
- Width and height - numeric value only e.g. `140` not ~~140px~~
- Image src - relative file path e.g. `/theme/images/logo.svg`
- Alt text - essential for accessibility

**Example configuration**
```js
logo: {
        src: "/theme/images/hippo-data-logo.svg",
        height: 70,
        width: 140,
        alt: "Hippo Data logo."
    }
```
If you don't wish to use a logo, set the value of the logo's src attribute to `null` as in the 
example below. This makes the theme use the name value for the site heading.

```js
const theme = {
    pageTitlePostfix: 'Hippo Data',
    name: 'Showcase site',
    serviceName: '',
    logo: {
    src: null,
    height: 100,
    width: 282,
    alt: 'Hippo Data logo.',
    }
...
}
```
## Fonts
The theme, by default, uses two font weights (400, 700) and two font styles (normal, italic).

It allows for two font families, one for body text and one for headings. The following example 
configurations demonstrate an optimized font setup.

To change default fonts:
1. Configure the fonts for use in `public/theme/font.config.js`.
2. **Optional** Reference the fonts in `public/theme/theme.scss`.
3. **Optional** - Upload fonts and variations to `public/theme/fonts` if needed.

### Google Fonts
Utilising Google Fonts is the easiest way to add or change fonts. 
site.
#### Overview of font.config.js
```js
import { Epilogue, Anybody } from 'next/font/google';

export const bodyFont = Anybody({
weight: ['400', '700'],
subsets: ['latin'],
display: 'swap',
variable: '--font-body',
});

export const headingFont = Epilogue({
weight: ['400', '700'],
subsets: ['latin'],
display: 'swap',
variable: '--font-header',
});
```
Above, the configuration uses two fonts from Google - Epilogue and Anybody. Each font has two 
references: one in the import statement and the other in the export statement. Additionally, 
both fonts have a variable with a different value (variable: `--font-body` and variable: `--font-header`).

#### Changing the fonts

1. Choose desired fonts on [Google fonts](https://fonts.google.com/).
2. Open `public/theme/font.config.js` and replace the font name in the import statement.
3. Replace the exported font with the newly named import. 

Refactored `font.config.js`:
```js
import { Epilogue, Gabarito } from 'next/font/google';

export const bodyFont = Gabarito({
weight: ['400', '700'],
subsets: ['latin'],
display: 'swap',
variable: '--font-body',
});

export const headingFont = Epilogue({
weight: ['400', '700'],
subsets: ['latin'],
display: 'swap',
variable: '--font-header',
});
```
**Note:** Not all fonts have both 400 and 700 weights; check before making changes to avoid errors.

### Local fonts
For local fonts, add font files to the repository. Steps:

1. Upload font files to `/public/theme/fonts`.
2. Add an import statement for `localFont` in `public/theme/font.config.js`.
3. Configure local fonts in `font.config.js` with the correct route to the fonts.

#### Example `font.config.js` Using Roboto
```js
import localFont from 'next/font/local';

export const roboto = localFont({
  variable: '--font-body',
  src: [
    {
      path: 'fonts/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/Roboto-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/Roboto-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/Roboto-Bolditalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
});
```
### Using system fonts
If you prefer using system fonts only and don't want custom fonts:

1. Delete the contents of `font.config.js` (leave the file in place for the site to function).
2. Enter the system font values in `/public/theme/theme.scss`.
```scss
/*FONTS*/
$govuk-font-family: HelveticaNeue,Helvetica,Arial,sans-serif;
$govuk-font-family-headings: HelveticaNeue,Helvetica,Arial,sans-serif;
```

### Using the same font for heading and paragraph text
To use one font for both paragraph and header text, edit `public/theme/theme.scss` and reference 
the desired font variable across the site. In the example below, both heading and paragraph text 
use the font with the variable name `--font-body`, set in `font.config.js`.
```scss
$govuk-font-family: var(--font-body);
$govuk-font-family-headings: var(--font-body);
```

## Colours
### Accessibility
The theme adheres to the [GOV.UK Design System](https://design-system.service.gov.uk/) to meet 
accessibility standards. Before applying colors, check color contrast using [WebAIM's contrast checker](https://webaim.org/resources/contrastchecker/).

### Editing colours
There are 33 color variables that can be changed to match your brand, grouped for easier editing.
View the full list [here](../public/theme/theme.scss). Each variable accepts any[CSS colour value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).

**Note:** Do not rename or delete variable names, as this will result in errors preventing the 
site from building.
```scss
$govuk-page-width: 1200px;
/*FONTS*/
$govuk-font-family: var(--font-body);
$govuk-font-family-headings: var(--font-body);

/*COLOURS*/
$govuk-brand-colour: #1d70b8;
$govuk-canvas-background-colour: #fcfcfc;
$govuk-body-background-colour: #FFFFFF;
$govuk-text-colour: #0b0c0c;
$govuk-secondary-text-colour: #505a5f;
$govuk-border-colour: #b1b4b6;

/*LINKS*/
$govuk-link-colour: #1d70b8;
$govuk-hover-colour: #003078;
$govuk-link-visited-colour: #4c2c92;
$govuk-link-hover-colour: #003078;
$govuk-link-active-colour: #0b0c0c;
```
## Menus
Two menus can be configured:
1. **Standard menu** - this appears in the header.
3. **Footer menu** - always available to the user and should contain links to policies.
### Configuring menus
All three menus are configured in exactly the same way:
1. **Content:** Text in the link.k
2. **Link:** URL of the link destination
3. **Title:** Longer text description for screen readers.

A complete working example can be found in  `/public/theme/theme.config.js`
```js
footerMenu: [
    {
        content: 'Help and support',
        link: 'https://example.com/help-and-support',
        title: 'Get help and support with this service'
    },
    {
        content: 'Terms of use',
        link: 'https://example.com/terms-of-use',
        title: 'Terms of use',
    }
  ]
```
## Metadata
A brand or service name appended to page titles on the site. The configuration for 
`pageTitlePostfix` can be found in `/public/theme/theme.config.js`.
```js
const theme = {
   pageTitlePostfix: "Hippo Data",
   logo: {
      src: "/theme/images/hippo-data-logo.webp",
      height: 70,
      width: 140,
      alt: "Hippo Datag logo."
   },
...
```
