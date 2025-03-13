"use client";

import { TableDemo } from "../components/Table/TableDemo";
import { VirtualTableDemo } from "../components/Table/VirtualTableDemo";
import styles from "./page.module.css";
import { TableEditingDemo } from "../components/Table";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={styles.icon}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M3 10h18v10H3V10zm0-6h18v2H3V4zm4 8v6h4v-6H7zm6 0v6h4v-6h-4z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3>Powerful Features</h3>
            <p>
              Sorting, filtering, pagination, and virtualization for handling
              large datasets
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={styles.icon}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm1-8h3l-4 4-4-4h3V8h2v4z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3>High Performance</h3>
            <p>
              Optimized rendering with virtualization supporting 10,000+ rows
              efficiently
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={styles.icon}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M4 6.414L.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414zM6 7v6h11.512l1.8-6H6zm-.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                  fill="currentColor"
                />
              </svg>
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
            <p className={styles.demoDescription}>
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
            <p className={styles.demoDescription}>
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
