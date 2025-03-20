# Table Components

Highly performant and feature-rich table components for Next.js applications, built on top of TanStack React Table.

## Components

### Standard Table

A feature-rich table with sorting, filtering, and pagination.

### Virtualized Table

A high-performance table that can handle large datasets (10,000+ rows) efficiently using virtualization.

### FileUploadTable

A specialized table component that allows users to upload Excel (.xlsx, .xls) or CSV files and instantly convert them to interactive tables.

## Features

- ✅ Sorting
- ✅ Filtering
- ✅ Pagination
- ✅ Virtualization for large datasets
- ✅ Excel and CSV file uploading and parsing
- ✅ Modular architecture
- ✅ Styling with CSS modules
- ✅ TypeScript support
- ✅ Customizable columns
- ✅ Responsive design
- ✅ "No results" state
- Virtualized rows/columns for handling thousands of records
- Fixed headers and column freezing
- Column resizing, reordering, and hiding
- Advanced filtering (range, multi-select, custom functions)
- Custom cell renderers and editors
- Row selection, multi-selection, and batch operations
- Expandable rows for hierarchical data
- Server-side operations support
- Pagination with customizable controls
- Export to CSV, Excel, PDF
- Keyboard navigation and accessibility
- Row/cell highlighting based on conditions

## Usage - Standard Table

```tsx
import { Table } from "./Table";
import type { ColumnDef } from "@tanstack/react-table";

// Define your data type
type Person = {
  id: number;
  name: string;
  age: number;
};

// Sample data
const data: Person[] = [
  { id: 1, name: "John", age: 30 },
  { id: 2, name: "Jane", age: 25 },
  // ...
];

// Define columns
const columns: ColumnDef<Person, unknown>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];

// In your component
function MyComponent() {
  return (
    <Table
      data={data}
      columns={columns}
      enableSorting={true}
      enableFiltering={true}
      enablePagination={true}
      pageSize={10}
    />
  );
}
```

## Usage - Virtualized Table

```tsx
import { VirtualTable } from "./VirtualTable";
import type { ColumnDef } from "@tanstack/react-table";

// Same data and columns setup as above

function MyComponent() {
  return (
    <VirtualTable
      data={largeDataset} // Works efficiently with 10,000+ rows
      columns={columns}
      enableSorting={true}
      enableFiltering={true}
      height={500} // Container height
      estimatedRowHeight={40} // Estimated height of each row
    />
  );
}
```

## Usage - FileUploadTable

```tsx
import { FileUploadTable } from "./FileUploadTable";

function MyComponent() {
  return (
    <FileUploadTable
      // Use standard Table by default
      useVirtualization={false}
      // Or use virtualization for large files
      // useVirtualization={true}
      // virtualTableHeight={500}
    />
  );
}
```

The FileUploadTable component allows users to:

- Drag and drop Excel or CSV files
- Browse and select files from their device
- See file details and data statistics
- Interact with the data using all standard table features (sorting, filtering, etc.)
- Export the data to different formats

## Standard Table Props

| Prop               | Type                      | Default | Description                                |
| ------------------ | ------------------------- | ------- | ------------------------------------------ |
| `data`             | `T[]`                     | -       | Array of data to display in the table      |
| `columns`          | `ColumnDef<T, unknown>[]` | -       | Column definitions                         |
| `enableSorting`    | `boolean`                 | `true`  | Enable/disable sorting                     |
| `enableFiltering`  | `boolean`                 | `true`  | Enable/disable filtering                   |
| `enablePagination` | `boolean`                 | `true`  | Enable/disable pagination                  |
| `pageSize`         | `number`                  | `10`    | Default page size for pagination           |
| `className`        | `string`                  | -       | Additional CSS class for the table wrapper |

## Virtualized Table Props

| Prop                 | Type                      | Default | Description                                |
| -------------------- | ------------------------- | ------- | ------------------------------------------ |
| `data`               | `T[]`                     | -       | Array of data to display in the table      |
| `columns`            | `ColumnDef<T, unknown>[]` | -       | Column definitions                         |
| `enableSorting`      | `boolean`                 | `true`  | Enable/disable sorting                     |
| `enableFiltering`    | `boolean`                 | `true`  | Enable/disable filtering                   |
| `height`             | `number`                  | `400`   | Height of the table container              |
| `estimatedRowHeight` | `number`                  | `40`    | Estimated height of each row               |
| `className`          | `string`                  | -       | Additional CSS class for the table wrapper |

## FileUploadTable Props

| Prop                 | Type      | Default | Description                                      |
| -------------------- | --------- | ------- | ------------------------------------------------ |
| `useVirtualization`  | `boolean` | `false` | Whether to use virtualization for large datasets |
| `virtualTableHeight` | `number`  | `500`   | Height of the virtualized table (when enabled)   |

## Modular Components

The table is built with a modular architecture using the following components:

- `TableHeader`: Renders the table header with sorting and filtering capabilities
- `TableBody`: Renders the table rows and cells
- `TablePagination`: Renders the pagination controls

You can import and use these components separately if needed:

```tsx
import { TableHeader, TableBody, TablePagination } from "./components";
```

## Advanced Usage

For more complex use cases, check out the demo files, which demonstrate:

- Custom cell rendering
- Global filtering
- Styling based on data values
- Handling large datasets with virtualization

## Customization

The components use CSS modules for styling. You can customize the appearance by:

1. Passing a custom `className` prop
2. Overriding the CSS variables in your global CSS
3. Editing the `Table.module.css` file

## Props

| Prop                 | Type                               | Default                   | Description                                   |
| -------------------- | ---------------------------------- | ------------------------- | --------------------------------------------- |
| data                 | `T[]`                              | -                         | The data to display in the table              |
| columns              | `ColumnDef<T, unknown>[]`          | -                         | Column definitions                            |
| enableSorting        | `boolean`                          | `true`                    | Enable sorting functionality                  |
| enableFiltering      | `boolean`                          | `true`                    | Enable filtering functionality                |
| enablePagination     | `boolean`                          | `true`                    | Enable pagination                             |
| enableColumnOrdering | `boolean`                          | `true`                    | Enable column reordering                      |
| enableExport         | `boolean`                          | `true`                    | Enable export functionality                   |
| exportFormats        | `Array<"csv" \| "excel" \| "pdf">` | `["csv", "excel", "pdf"]` | Export formats to enable                      |
| exportFilename       | `string`                           | `"table-data"`            | Base filename for exports (without extension) |
| pageSize             | `number`                           | `10`                      | Number of rows per page                       |
| className            | `string`                           | -                         | Additional CSS class for the table container  |
