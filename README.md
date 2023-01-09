# notion2sb

Convert an exported Notion page Markdown file to Scrapbox page text

## Installation

```shell-session
$ npm install -g @tommy6073/notion2sb
```

## Usage

1. Export Notion workspace from "Settings & members" -> "Settings" -> "Export content" -> "Export all workspace content" with options set to following:
   - Export format: Markdown & CSV
   - Include content: Everything
   - Create folders for subpages: On
2. Unzip exported zip file to somewhere.
3. Execute notion2sb with an argument which is a path to the Notion page .md file to convert

### Examples

#### Write to stdout

```shell-session
$ notion2sb '/Users/tnagatomi/Export-0b036b8c-1cdf-4481-811f-209d2480627c/Page 1 bca29e3a1793444ea56b27e1b8486347/Sub page 1 731aae2b15064faca1cfdc564119e8a9.md'
```

#### Write to a file

```shell-session
$ notion2sb '/Users/tnagatomi/Export-0b036b8c-1cdf-4481-811f-209d2480627c/Page 1 bca29e3a1793444ea56b27e1b8486347/Sub page 1 731aae2b15064faca1cfdc564119e8a9.md'
```
