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
 * Generates sample data for the table editing demo
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
 * Demonstrates the table with cell editing functionality
 */
export const TableEditingDemo: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<Person[]>(() => generateData(100));

  // Define table columns with proper typing
  const columns = useMemo<ColumnDef<Person, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 60,
        enableEditing: false, // Prevent editing of ID column
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
        // Custom cell renderer for status
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

  const handleCellValueChange = (
    rowIndex: number,
    columnId: string,
    value: unknown
  ) => {
    setData((prevData) => {
      const newData = [...prevData];
      const row = { ...newData[rowIndex] };

      // Use type-safe assignment with index signature
      interface IndexableRow extends Person {
        [key: string]: unknown;
      }
      (row as IndexableRow)[columnId] = value;

      newData[rowIndex] = row;
      return newData;
    });
  };

  const filterData = (data: Person[], filterText: string) => {
    if (!filterText) return data;
    const lowercaseFilter = filterText.toLowerCase();

    return data.filter(
      (item) =>
        item.firstName.toLowerCase().includes(lowercaseFilter) ||
        item.lastName.toLowerCase().includes(lowercaseFilter) ||
        item.email.toLowerCase().includes(lowercaseFilter) ||
        item.status.toLowerCase().includes(lowercaseFilter) ||
        item.age.toString().includes(lowercaseFilter) ||
        item.id.toString().includes(lowercaseFilter)
    );
  };

  // Memoize filtered data
  const filteredData = useMemo(
    () => filterData(data, globalFilter),
    [data, globalFilter]
  );

  console.log(filteredData);

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

      <div className={styles.editingInfo}>
        Double-click any cell to edit content. Use Enter to save changes or
        Escape to cancel. All changes are instantly applied.
      </div>

      <Table
        data={filteredData}
        columns={columns}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        enableExport={true}
        enableEditing={true}
        onCellValueChange={handleCellValueChange}
        exportFormats={["csv", "excel", "pdf"]}
        exportFilename="editable-data"
        pageSize={10}
        className={styles.demo}
      />
    </div>
  );
};
