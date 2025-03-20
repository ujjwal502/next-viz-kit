# Next Viz Kit

<div align="center">
  <img src="public/next.svg" alt="Next Viz Kit Logo" width="180" height="100" style="max-width: 100%;" />
  <h3>Modern visualization components for Next.js applications</h3>
  <p>An open-source reference implementation of feature-rich React visualizations for complex data needs</p>
</div>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#using-the-code">Using The Code</a> •
  <a href="#available-components">Components</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<div align="center">
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
</div>

## Overview

Next Viz Kit is an **open-source reference project** providing well-crafted visualizations for Next.js applications. Unlike a library, this project showcases production-ready implementations that you can:

- Study to learn best practices for building visualization components
- Copy and adapt for your own projects
- Use as a starting point for implementing your own custom visualizations

The code is modular, well-documented, and built with modern React patterns, making it easy to understand and modify for your specific needs.

## Features

Next Viz Kit currently provides the following implemented features:

- 📊 **Advanced Tables**: Feature-rich tables with:
  - ✅ Sorting
  - ✅ Filtering (global and column-specific)
  - ✅ Pagination
  - ✅ Cell editing capabilities
  - ✅ Export to CSV, Excel, and PDF
- 🚀 **Virtualization**: Support for virtualized tables capable of handling large datasets efficiently
- 📱 **Responsive Design**: Tables are responsive and work on various screen sizes
- 🎨 **Customizable**: CSS modules for easy styling and theming

## Demo

Explore our currently available interactive demos:

- [Table Components Demo](/table-demo): Standard tables with sorting, filtering, and pagination
- [Table Editing Demo](/table-editing-demo): Tables with editable cells
- [Virtual Table Demo](/table-demo): Virtualized tables for large datasets

Additional features coming soon:

- Keyboard navigation
- Enhanced accessibility features
- More visualization components

## Using The Code

This is not a library to be installed via npm. Instead, you can:

### Clone and Explore

```bash
# Clone the repository
git clone https://github.com/ujjwal502/next-viz-kit.git
cd next-viz-kit

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Copy Components

Once you understand how the components work, you can copy the relevant component folders into your own project. For example, to use the Table components, copy:

- `app/components/Table` directory to your project
- Import the dependencies listed in `package.json`

## Available Components

### Tables

#### Standard Table

A feature-rich table component with sorting, filtering, pagination, and export capabilities.

Features:

- Sorting (click on column headers)
- Filtering (global and column-specific)
- Pagination with customizable page size
- Export to CSV, Excel, and PDF formats
- Responsive design

Detailed documentation: [Table Components README](/app/components/Table/README.md)

```tsx
// After copying the component to your project:
import { Table } from "@/components/Table/Table";
```

#### Virtualized Table

A high-performance table for large datasets that efficiently renders only visible rows.

Features:

- Handles large datasets with minimal performance impact
- Maintains all standard table features (sorting, filtering)
- Smooth scrolling experience

```tsx
// After copying the component to your project:
import { VirtualTable } from "@/components/Table/VirtualTable";
```

#### Editable Table

A table component that supports inline cell editing.

Features:

- Edit cell contents directly within the table
- Enter to save, Escape to cancel
- All standard table features included

```tsx
// Import the standard Table component and enable editing
import { Table } from "@/components/Table/Table";

// Then in your component:
<Table
  data={data}
  columns={columns}
  enableEditing={true}
  onCellValueChange={(rowIndex, columnId, value) => {
    // Handle the value change
  }}
/>;
```

## Example Usage

Here's a quick example of how to use the standard table component after copying it to your project:

```tsx
import { Table } from "@/components/Table/Table";
import type { ColumnDef } from "@tanstack/react-table";

// Define your data type
type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  status: "active" | "inactive" | "pending";
};

// Define your columns
const columns: ColumnDef<Person, unknown>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 60,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as string;
      return <span className={`status-badge status-${status}`}>{status}</span>;
    },
  },
];

// Sample data
const data: Person[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    status: "active",
  },
  // More data...
];

function MyComponent() {
  return (
    <Table
      data={data}
      columns={columns}
      enableSorting={true}
      enableFiltering={true}
      enablePagination={true}
      enableExport={true}
      exportFormats={["csv", "excel", "pdf"]}
      exportFilename="people-data"
      pageSize={10}
    />
  );
}
```

## Development

To run this project locally for development:

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Table functionality powered by [TanStack Table](https://tanstack.com/table/v8)
- Fonts by [Geist](https://vercel.com/font)
