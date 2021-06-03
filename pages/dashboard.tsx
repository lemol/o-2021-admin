import * as React from "react";
import NextLink from "next/link";
import { Link } from "@material-ui/core";

import { DataGrid, GridColumns } from "@material-ui/data-grid";
import { useParticipantsListQuery } from "../generated/graphql";

export default function Dashboard() {
  const { data, loading } = useParticipantsListQuery();

  const columns: GridColumns = [
    { field: "code", headerName: "Código", width: 130 },
    { field: "name", headerName: "Nome", width: 256 },
    { field: "email", headerName: "E-mail", width: 200 },
    {
      field: "options",
      headerName: "Opções",
      width: 200,
      renderCell: ({ row }) => (
        <NextLink href={`/participant/${row.code}`}>
          <Link>Detalhes</Link>
        </NextLink>
      ),
    },
  ];

  const rows =
    data?.participants?.items?.map((x) => ({ ...x, id: x.code })) ?? [];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        loading={loading || !data}
        rows={rows}
        columns={columns}
        pageSize={20}
        pagination
        // onPageChange={(params) => {
        //   const skip = (params.page - 1) * params.pageSize;
        //   const take = params.pageSize;

        //   refetch({
        //     skip,
        //     take,
        //   })
        // }}
      />
    </div>
  );
}
