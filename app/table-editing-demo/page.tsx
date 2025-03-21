"use client";

import { TableEditingDemo } from "../components/Table";
import {
  EditCellIcon,
  SaveChangesIcon,
  KeyboardIcon,
} from "../components/icons";
import styles from "./page.module.css";

export default function TableEditingDemoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Table Editing Demo</h1>
        <p className={styles.subtitle}>
          Interact with editable tables using intuitive keyboard controls and
          instant feedback
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <EditCellIcon className={styles.icon} />
            </div>
            <h3>Inline Editing</h3>
            <p>
              Click or double-click on any cell to edit its content directly
              within the table
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <SaveChangesIcon className={styles.icon} />
            </div>
            <h3>Instant Updates</h3>
            <p>
              Changes are applied immediately with visual feedback, maintaining
              data integrity
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconContainer}>
              <KeyboardIcon className={styles.icon} />
            </div>
            <h3>Keyboard Controls</h3>
            <p>
              Press Enter to save changes or Escape to cancel, with full
              keyboard navigation support
            </p>
          </div>
        </div>

        <div className={styles.demoCard}>
          <div className={styles.demoDescription}>
            This demo showcases a table with cell editing functionality. Click
            on any cell to edit its content. Press Enter to save changes or
            Escape to cancel.
          </div>
          <div className={styles.tableWrapper}>
            <TableEditingDemo />
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
