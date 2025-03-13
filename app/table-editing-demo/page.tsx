"use client";

import { TableEditingDemo } from "../components/Table";
import styles from "./page.module.css";

export default function TableEditingDemoPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Table Editing Demo</h1>
      <p className={styles.description}>
        This demo showcases a table with cell editing functionality. Click on
        any cell to edit its content. Press Enter to save changes or Escape to
        cancel.
      </p>
      <div className={styles.card}>
        <TableEditingDemo />
      </div>
    </div>
  );
}
