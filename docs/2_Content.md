# Content Creation Guidelines

## File and Directory Naming

1. **Storage Location:**
   - Save all content files in the `public/content` directory.

2. **File Extension:**
   - Files must have a `.mdx` extension.

3. **Naming Conventions:**
   - Keep file and directory names in lowercase with no spaces.
   - Use hyphens to separate words.

   Example:
   - Incorrect: `Alpha Phase.mdx` ❌
   - Correct: `alpha-phase.mdx` ✅

## Directory Structure and URLs

- The content directory structure determines site URLs.
- For a specific directory, create an `index.mdx` file to define the base URL.
Example structure:
```md
 public/content
 ├── alpha-phase
 │   ├── index.mdx
 │   └── user-research
 │       ├── index.mdx
 │       └── round-1.mdx
```
## Resulting URLs:

- `/alpha-phase/`
- `/alpha-phase/user-research/`
- `/alpha-phase/user-research/round-1/`

## Planning Content Structure

- Consider content structure before creating.
- Group related content in nested directories for easier indexing and list creation.

## Adding Content

### Frontmatter

- Frontmatter provides metadata preceding the main content.
- Enclose frontmatter in triple-dashed lines (`---`).

#### Example Frontmatter:

```yaml
---
title: Introduction to the Alpha Phase
description: Details about using frontmatter in a project showcase site.
author: Jack Jones
team: Development
date: 2023-10-02
tags:
   - alpha
   - frontmatter
   - metadata
breadcrumbs:
   - 'Home, /'
---
```

**Attributes used by default:**

1. **title:** Page title displayed in the browser tab.
2. **description:** Description useful for lists/tables to describe content.
3. **tags:** List of relevant categories/topics.
4. **breadcrumbs:** List defining the document's position.

However, there is no restriction on the metadata you can add to the frontmatter of a document. 
You are encouraged to leverage these attributes with [data tools](4_Data.md). For example, you may wish 
to create a list of all documents authored by a particular team.

### Markdown
- Construct content using Markdown.
- Resources to get started:
  - [Markdown Guide](https://www.markdownguide.org/)
  - [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/)
  - [Basic Syntax](https://www.markdownguide.org/basic-syntax/)

**Example Markdown content with frontmatter**
```md
---
title: Introduction to the Alpha Phase
description: A webpage about how to use frontmatter in a project showcase site.
author: Jack Jones
team: Development
date: 2023-10-02
tags:
 - alpha
 - frontmatter
 - metadata
---
# Alpha phase

## Something about the purpose of this phase

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
labore et dolore magna aliqua...
```

