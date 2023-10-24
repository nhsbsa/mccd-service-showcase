# Working with data

## ReadData component
`ReadData` a wrapper component that provides data to child components.
Components that use `ReadData`:
- [FacetSearch](3_Components.md#facetted-search)
- [Pagination](3_Components.md#pagination)
- [SortableLists](3_Components.md#sortable-list)
- [SummaryList](3_Components.md#summarylist)
- [Table](3_Components.md#table)

Properties:
- **fields:** a restrictive list of fields names available to children.
- **include:** a JSON object that will be appended to each record in the data.
- **url:** URL of data source: can be external source or an api route ( see [Data 
  Sources](#data-sources) )
- **where:** a series of key value pairs for filtering data.

### "where" statement construction
1. Wrap in quote marks
2. keys and values are delimited by a colon
3. key value pairs are delimited by a comma
  **Example:** `where="key1:value1,key2:value2,key3:value3"`
  **Purpose:** To filter records

### "fields" statement construction
1. Wrap in quote marks.
2. key or series of keys delimited by a colon.
  **Example:** `fields="key1:key2:key3"`.
  **Purpose:** To limit the fields output to children.

### Data sources
#### Default site data
Site data generated from [frontmatter](2_Content.md#frontmatter) is the default data source.
Creating an `url` property in the ReadData component will override the default source.

#### Uploading and storing data
- Upload JSON files to `public/data`.
- Upload CSV files to `public/csv`: these will be converted to JSON and automatically added to 
  the data directory.
- The same rules apply to directory and file naming for the data and csv directories as they do for 
  the [content](2_Content.md#file-and-directory-naming) directory.

The URL path for uploaded/local data files is `/api/data/data-file-name/`

Example data directory:
```md
public/data
├── document-archive.json
├── nested
│   └── new-data.json
└── site-data.json ( default data )
```
Resulting API URL's:
- `/api/document-archive/`
- `/api/nested/new-data/`

#### External data sources
- Enter the full URL to the data source `url="https://my-data-source.com/data-location/"`

**Example with properties:**
```mdxjs
<ReadData 
        url="/api/document-archive/" 
        where="category:features,complexity:high complexity" 
        fields="title:priority:value:complexity:description"
        include={{
          extraField: "To be included in data."
        }}
>
  <Table />
</ReadData>
```
