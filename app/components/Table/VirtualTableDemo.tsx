"use client";

import React, { useMemo, useState } from "react";
import { VirtualTable } from "./VirtualTable";
import type { ColumnDef } from "@tanstack/react-table";

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
          return (
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                backgroundColor:
                  status === "active"
                    ? "#dcfce7"
                    : status === "inactive"
                    ? "#fee2e2"
                    : "#fef9c3",
                color:
                  status === "active"
                    ? "#166534"
                    : status === "inactive"
                    ? "#991b1b"
                    : "#854d0e",
              }}
            >
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
      <h2>Virtualized Table Demo (10,000 rows)</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div>
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search in all columns..."
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              width: "300px",
            }}
          />
        </div>
        <div>
          <span>Total Records: {filteredData.length}</span>
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
