"use client";

import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

interface DetailsTableProps {
  columns: GridColDef[];
  data: any[];
  selectedBooks: any[];
  onSelectionChange: (selectedBooks: any[]) => void;
}

const DetailsTable: React.FC<DetailsTableProps> = ({
  columns,
  data,
  selectedBooks,
  onSelectionChange
}) => {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);

  useEffect(() => {
    setSelectionModel(selectedBooks.map((book) => book.id));
  }, [selectedBooks]);

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
    const selectedBooks = data.filter((row) => newSelection.includes(row.id));
    onSelectionChange(selectedBooks);
  };

  const isRowSelectable = (params: any) => {
    return params.row.bookState !== "AVAILABLE"; 
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionChange}
        isRowSelectable={isRowSelectable}
      />
    </Box>
  );
};

export default DetailsTable;
