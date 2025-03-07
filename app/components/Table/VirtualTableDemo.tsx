"use client";

import React, { useMemo, useState } from "react";
import { VirtualTable } from "./VirtualTable";
import type { ColumnDef } from "@tanstack/react-table";
import styles from "./Table.module.css";

// Sample type for our data
type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  status: "active" | "inactive" | "pending";
};

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

export const VirtualTableDemo: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState("");

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
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          const badgeClass =
            status === "active"
              ? styles.statusActive
              : status === "inactive"
              ? styles.statusInactive
              : styles.statusPending;

          const dotClass =
            status === "active"
              ? styles.statusActiveIndicator
              : status === "inactive"
              ? styles.statusInactiveIndicator
              : styles.statusPendingIndicator;

          return (
            <span className={`${styles.statusBadge} ${badgeClass}`}>
              <span className={`${styles.statusDot} ${dotClass}`}></span>
              {status}
            </span>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(() => generateData(10000), []);

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

  const filteredData = useMemo(
    () => filterData(data, globalFilter),
    [data, globalFilter]
  );

  return (
    <div>
      <div className={styles.searchContainer}>
        <div>
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search in all columns..."
            className={styles.searchInput}
          />
        </div>
        <div className={styles.recordsContainer}>
          <span className={styles.recordsText}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="M9 12h6"></path>
              <path d="M9 16h6"></path>
              <path d="M9 8h6"></path>
            </svg>
            Total Records:{" "}
            <span className={styles.recordCount}>{filteredData.length}</span>
          </span>
        </div>
      </div>

      <VirtualTable
        data={filteredData}
        columns={columns}
        enableSorting={true}
        enableFiltering={true}
        enableColumnOrdering={true}
        height={500}
        estimatedRowHeight={40}
      />
    </div>
  );
};
