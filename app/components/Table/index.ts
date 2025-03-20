export { Table } from "./Table";
export { VirtualTable } from "./VirtualTable";

export type { TableProps } from "./types";
export type { VirtualTableProps } from "./types";

// Demo components - these should ideally be moved outside the component library
// in a production environment, but kept here for this project
export { TableDemo } from "./demos/TableDemo";
export { VirtualTableDemo } from "./demos/VirtualTableDemo";
export { TableEditingDemo } from "./demos/TableEditingDemo";
export { FileUploadTable } from "./FileUploadTable";

// Re-export subcomponents for advanced usage scenarios
export {
  TableHeader,
  TableBody,
  TablePagination,
  TableToolbar,
} from "./components";

export * from "./utils";
