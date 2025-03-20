"use client";

import React, { useMemo, useState } from "react";
import { Table } from "../Table";
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
 * Generates sample data for the table demo
 */
const generateData = (count: number): Person[] => {
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
 * Demonstrates the basic features of the Table component
 */
export const TableDemo: React.FC = () => {
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

  // Generate sample data
  const data = useMemo(() => generateData(100), []);

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

      <Table
        data={data}
        columns={columns}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        enableColumnOrdering={true}
        enableExport={true}
        exportFormats={["csv", "excel", "pdf"]}
        exportFilename="people-data"
        pageSize={10}
        className={styles.demo}
      />
    </div>
  );
};
