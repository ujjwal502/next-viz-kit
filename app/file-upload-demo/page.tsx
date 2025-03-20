"use client";

import { FileUploadTable } from "../components/Table";
import {
  FileFormatIcon,
  DragDropIcon,
  InstantPreviewIcon,
} from "../components/icons";
import styles from "./page.module.css";

export default function FileUploadDemoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Convert Your Excel & CSV to Tables</h1>
        <p className={styles.subtitle}>
          Upload and view your tabular data from Excel or CSV files
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <FileFormatIcon className={styles.icon} />
            </div>
            <h3>Multiple Formats</h3>
            <p>
              Supports both Excel files (.xlsx, .xls) and CSV files with
              automatic format detection
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <DragDropIcon className={styles.icon} />
            </div>
            <h3>Drag & Drop</h3>
            <p>
              Easily upload files by dragging and dropping them directly onto
              the upload area
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <InstantPreviewIcon className={styles.icon} />
            </div>
            <h3>Instant Preview</h3>
            <p>
              Immediately view your data in a fully-featured table with sorting,
              filtering, and export capabilities
            </p>
          </div>
        </div>

        <div className={styles.demoCard}>
          <div className={styles.uploadDescription}>
            Upload your Excel or CSV file to instantly visualize and interact
            with your data. The table supports filtering, sorting, and even
            exporting back to different formats.
          </div>

          <FileUploadTable />
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
