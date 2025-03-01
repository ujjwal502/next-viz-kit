import { TableDemo } from "../components/Table/TableDemo";
import { VirtualTableDemo } from "../components/Table/VirtualTableDemo";

export default function TableDemoPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Next Viz Kit - Table Components</h1>
      <p>
        Advanced, performant table components built with TanStack React Table
      </p>

      <div style={{ marginTop: "20px", marginBottom: "40px" }}>
        <h2>Standard Table</h2>
        <p>A standard table with sorting, filtering, and pagination.</p>
        <TableDemo />
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Virtualized Table</h2>
        <p>
          A high-performance virtualized table capable of handling 10,000+ rows
          efficiently.
        </p>
        <VirtualTableDemo />
      </div>
    </div>
  );
}
