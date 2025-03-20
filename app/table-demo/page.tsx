"use client";

import { TableDemo } from "../components/Table/demos/TableDemo";
import { VirtualTableDemo } from "../components/Table/demos/VirtualTableDemo";
import { TableEditingDemo } from "../components/Table/demos/TableEditingDemo";
import {
  TableFeaturesIcon,
  HighPerformanceIcon,
  ExportOptionsIcon,
} from "../components/icons";
import styles from "./page.module.css";

export default function TableDemoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Next Viz Kit - Table Components</h1>
        <p className={styles.subtitle}>
          Advanced, performant table components built with TanStack React Table
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.overview}>
          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <TableFeaturesIcon className={styles.icon} />
            </div>
            <h3>Powerful Features</h3>
            <p>
              Sorting, filtering, pagination, and virtualization for handling
              large datasets
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <HighPerformanceIcon className={styles.icon} />
            </div>
            <h3>High Performance</h3>
            <p>
              Optimized rendering with virtualization supporting 10,000+ rows
              efficiently
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <ExportOptionsIcon className={styles.icon} />
            </div>
            <h3>Export Options</h3>
            <p>
              Export your table data to CSV, Excel or PDF with just one click
            </p>
          </div>
        </div>

        <div className={styles.demoSection}>
          <div className={styles.demoCard}>
            <h2 className={styles.demoTitle}>Standard Table</h2>
            <p className={styles.standardDescription}>
              A standard table with sorting, filtering, pagination, and export
              functionality. Perfect for displaying and interacting with
              moderate amounts of data.
            </p>
            <div className={styles.tableWrapper}>
              <TableDemo />
            </div>
          </div>
        </div>

        <div className={styles.demoSection}>
          <div className={styles.demoCard}>
            <h2 className={styles.demoTitle}>Virtualized Table</h2>
            <p className={styles.virtualizedDescription}>
              A high-performance virtualized table capable of handling 10,000+
              rows efficiently. Ideal for large datasets where traditional
              tables would struggle with performance.
            </p>
            <div className={styles.tableWrapper}>
              <VirtualTableDemo />
            </div>
          </div>
        </div>

        <div className={styles.demoSection}>
          <div className={styles.demoCard}>
            <h2 className={styles.demoTitle}>Table Editing Demo</h2>
            <p className={styles.demoDescription}>
              This demo showcases the editable table component.
            </p>
            <div className={styles.tableWrapper}>
              <TableEditingDemo />
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>
          Next Viz Kit - Powerful visualization components for Next.js
          applications
        </p>
        <div className={styles.links}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="/docs" target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
          <a href="/examples" target="_blank" rel="noopener noreferrer">
            Examples
          </a>
        </div>
      </footer>
    </div>
  );
}
