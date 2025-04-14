import React from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface ResponsiveTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (field: string) => void;
  mobileView?: (item: T) => React.ReactNode;
}

const ResponsiveTable = <T extends { id: string }>({
  columns,
  data,
  sortField,
  sortOrder,
  onSort,
  mobileView,
}: ResponsiveTableProps<T>) => {
  const SortIcon = ({ field }: { field: string }) => (
    <ChevronUpDownIcon
      className={`h-4 w-4 inline-block ml-1 cursor-pointer ${
        sortField === field
          ? "text-[#CD7F32]"
          : "text-gray-400 hover:text-[#CD7F32]"
      }`}
    />
  );

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black rounded-sm border border-gray-800 overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-black bg-opacity-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-sm font-medium text-gray-400 ${
                    column.sortable ? "cursor-pointer" : ""
                  } ${column.className || ""}`}
                  onClick={() => column.sortable && onSort?.(column.key)}
                >
                  {column.header}
                  {column.sortable && <SortIcon field={column.key} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-800/50 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-4 border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
          >
            {mobileView ? (
              mobileView(item)
            ) : (
              <div className="space-y-4">
                {columns.map((column) => (
                  <div key={column.key} className="flex justify-between">
                    <span className="text-gray-400">{column.header}:</span>
                    <span className="text-white">{column.render(item)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTable;
