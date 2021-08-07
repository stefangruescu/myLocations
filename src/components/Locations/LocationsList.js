import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MenuItem from '@material-ui/core/MenuItem';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { orderBy } from 'lodash';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';

import TopBar from '../TopBar';
import routes from '../../routes';
import * as actions from '../../state/actions';

const Label = styled.label`
  margin-right: 5px;
  font-size: 15px;
`;

const LocationsList = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const categories = useSelector((state) => state.categories);
  const locations = useSelector((state) => state.locations);

  const selectedLocation = locations.filter(
    (location) => location.id === selectedId
  );

  const onSelectLocation = (id) => {
    setSelectedId(id);
  };

  const toAddLocation = () => {
    history.push(routes.LOCATION_ADD.path);
  };

  const toEditLocation = () => {
    if (!selectedId) {
      return;
    }

    history.push(`${routes.LOCATION_EDIT.clearPath}/${selectedId}`);
  };

  const viewLocationInGoogle = () => {
    if (selectedLocation.length) {
      window.open(
        `https://www.google.com/maps/?q=${selectedLocation[0].lat},${selectedLocation[0].lng}`
      );
    }
  };

  const toViewLocation = () => {
    if (!selectedId) {
      return;
    }

    history.push(`${routes.LOCATION.clearPath}/${selectedId}`);
  };

  const onRemoveLocation = () => {
    dispatch(actions.removeLocation(selectedId));
  };

  const filterAndSortLocationByCategory = (locations, category) => {
    if (category === 'alphabetical') {
      return orderBy(locations, 'name', 'asc');
    }

    if (category === 'grouped') {
      return orderBy(locations, 'categories', 'asc');
    }

    if (category) {
      const filteredArray = locations.filter((location) =>
        location.categories.includes(category)
      );
      return filteredArray;
    }

    return locations;
  };

  return (
    <>
      <TopBar
        onAddClick={toAddLocation}
        onEditClick={toEditLocation}
        onItemViewClick={toViewLocation}
        onRemoveClick={onRemoveLocation}
        viewInGoogleAction={viewLocationInGoogle}
        showSearch
        title="Locations"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Label>Filter By</Label>
                <Select
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                  defaultValue=""
                >
                  {categories.map((category) => (
                    <MenuItem value={category} key={category}>
                      {category}
                    </MenuItem>
                  ))}
                  <MenuItem value="alphabetical">alphabetical</MenuItem>
                  <MenuItem value="grouped">grouped</MenuItem>
                </Select>
              </TableCell>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Coordinates</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterAndSortLocationByCategory(locations, selectedCategory).map(
              (location) => {
                const isSelected = selectedId === location.id;
                return (
                  <TableRow
                    hover
                    key={location.id}
                    onClick={() => onSelectLocation(location.id)}
                    role="checkbox"
                    selected={isSelected}
                  >
                    <TableCell key={1} />
                    <TableCell padding="checkbox" key={2}>
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell key={3}>{location.name}</TableCell>
                    <TableCell key={4}>{location.address}</TableCell>
                    <TableCell key={5}>
                      {location.lat}, {location.lng}
                    </TableCell>
                    <TableCell key={6}>
                      {location.categories.join(', ')}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LocationsList;
