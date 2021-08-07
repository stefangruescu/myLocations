import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const CategoriesList = ({ onCategoryClick, selectedCategoryId }) => {
  const categories = useSelector((state) => state.categories);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>NAME</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((categoryId) => {
            const isItemSelected = categoryId === selectedCategoryId;
            return (
              <TableRow
                hover
                key={categoryId}
                onClick={() => onCategoryClick(categoryId)}
                role="checkbox"
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isItemSelected} />
                </TableCell>
                <TableCell>{categoryId}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesList;
