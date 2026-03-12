import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';

function CrudTable({ title, columns, data, onAdd, onEdit, onDelete, searchable = true }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = searchable
    ? data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAdd}
          sx={{ borderRadius: 2 }}
        >
          Tambah Data
        </Button>
      </Box>

      {searchable && (
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Cari data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>No</TableCell>
              {columns.map((column) => (
                <TableCell key={column.field} sx={{ color: 'white', fontWeight: 'bold' }}>
                  {column.headerName}
                </TableCell>
              ))}
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Aksi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={row.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {column.render ? column.render(row[column.field], row) : row[column.field]}
                    </TableCell>
                  ))}
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => onEdit(row)} size="small">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton color="error" onClick={() => onDelete(row)} size="small">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 2} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                    Tidak ada data
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default CrudTable;
