"use client";

import React, { useMemo, useState } from "react";
import { VirtualTable } from "../VirtualTable";
import type { ColumnDef } from "@tanstack/react-table";
import styles from "../Table.module.css";

type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  status: "active" | "inactive" | "pending";
};

/**
 * Generates large sample data for virtual table demo
 */
const generateLargeData = (count: number): Person[] => {
  return Array.from({ length: count }).map((_, index) => {
    const ageOffset = (index % 5) * 10;
    const statusIndex = index % 3;
    const statusOptions = ["active", "inactive", "pending"] as const;

    return {
      id: index + 1,
      firstName: `First${index + 1}`,
      lastName: `Last${index + 1}`,
      age: 25 + ageOffset,
      email: `user${index + 1}@example.com`,
      status: statusOptions[statusIndex],
    };
  });
};

/**
 * Demonstrates the VirtualTable component for efficiently
 * rendering large datasets
 */
export const VirtualTableDemo: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  // Define table columns with proper typing
  const columns = useMemo<ColumnDef<Person, unknown>[]>(
    () => [
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
        size: 80,
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <span
              className={`${styles.badge} ${
                status === "active"
                  ? styles.badgeSuccess
                  : status === "inactive"
                  ? styles.badgeDanger
                  : styles.badgeWarning
              }`}
            >
              {status}
            </span>
          );
        },
      },
    ],
    []
  );

  // Generate large dataset (5000 rows)
  const data = useMemo(() => generateLargeData(5000), []);

  return (
    <div className={styles.demoContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className={styles.searchInput}
          placeholder="Search all columns..."
        />
      </div>

      <div className={styles.virtualTableWrapper}>
        <VirtualTable
          data={data}
          columns={columns}
          enableSorting={true}
          enableFiltering={true}
          enableColumnOrdering={true}
          height={600}
          estimatedRowHeight={40}
          className={styles.demo}
        />
      </div>

      <div className={styles.demoInfo}>
        <p>
          This table efficiently renders {data.length.toLocaleString()} rows by
          only rendering the rows that are visible in the viewport.
        </p>
      </div>
    </div>
  );
};
