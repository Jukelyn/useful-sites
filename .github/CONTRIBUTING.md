# Contributing Guidelines

In general, any changes that you think would be good are welcomed. I just ask that when adding sites to the list, you follow the template and make sure all the details are present.

## Adding New Site

When adding a new site, please edit the `src/data/sites.json` file and fill out the info in the PR template. This is what the PR template looks like:

````
## Add Site(s): Site1, Site2, ...

- Closes #: (if there is an associated issue open that this PR resolves)
- Site (link):
- Site's Brand Guidelines (link): _(may not be present)_
- Site's TOS (link): _(may not be present)_
- Link to Site's Logo or Favicon: **Do NOT upload files and attach them to the PR**

<hr />

- [ ] This brand allow usage of their logo. (leave unchecked if unsure)
- [ ] I filled in the json for the site info in `src/data/sites.json` (order doesn't matter)
- [ ] I added a date for the site
- [ ] I copied the json for the PR below.
- [ ] I have not created new categories
- [ ] I have created new categories (explain rationale below)

```json
  {
    "name": "",
    "categories": [""],
    "link": "",
    "lastUpdated": "2025-08-13",
    "description": "",
    "logoPath": ""
  },
````

## New Categories Rationale

_Explaination here_

```

```
