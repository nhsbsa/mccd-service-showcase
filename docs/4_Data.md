# Working with Data

## ReadData Component

The `ReadData` component serves as a wrapper that provides data to its child components. Several components utilize the `ReadData` component:

- [FacetSearch](3_Components.md#facetted-search)
- [Pagination](3_Components.md#pagination)
- [SortableLists](3_Components.md#sortable-list)
- [SummaryList](3_Components.md#summarylist)
- [Table](3_Components.md#table)

### Properties

The `ReadData` component has the following properties:

- **fields:** A restrictive list of field names available to child components.
- **include:** A JSON object that will be appended to each record in the data.
- **apiEndpoint:** The URL of the data source, which can be an external source or an API route (see 
  [Data Sources](#data-sources)).
- **where:** A series of key-value pairs used for filtering data.

#### "where" Statement Construction

To construct a "where" statement:

1. Wrap it in quotation marks.
2. Delimit keys and values with a colon.
3. Delimit key-value pairs with a comma.

**Example:** `where="key1:value1,key2:value2,key3:value3"`

**Purpose:** To filter records.

#### "fields" Statement Construction

To construct a "fields" statement:

1. Wrap it in quotation marks.
2. Delimit keys or a series of keys with a colon.

**Example:** `fields="key1:key2:key3"`

**Purpose:** To limit the fields output to children.

### Data Sources

#### Default Site Data

Site data generated from [frontmatter](2_Content.md#frontmatter) serves as the default data 
source. Creating a `apiEndpoint` property in the `ReadData` component will override the default 
source.

#### Uploading and Storing Data

You can upload data in the following ways:

- Upload JSON files to `public/data`.
- Upload CSV files to `public/csv`, which will be automatically converted to JSON and added to the data directory.
- Follow the same rules for directory and file naming for data and CSV directories as you do for the [content](2_Content.md#file-and-directory-naming) directory.

The API endpoint for uploaded/local data files is `/api/data/data-file-name/`.

Example data directory structure:

```md
public/data
├── document-archive.json
├── nested
│   └── new-data.json
└── site-data.json (default data)
```
Resulting API Endpoint's:
- `/api/document-archive/`
- `/api/nested/new-data/`

#### External data sources
For external data sources, simply enter the full URL to the data source using the apiEndpoint 
property.

External data sources must return a JSON payload.

**Example with properties:**
```mdxjs
<ReadData 
        apiEndpoint="/api/document-archive/" 
        where="category:features,complexity:high complexity" 
        fields="title:priority:value:complexity:description"
        include={{
          extraField: "To be included in data."
        }}
>
  <Table />
</ReadData>
```
