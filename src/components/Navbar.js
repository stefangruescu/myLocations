import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { SCREENS_ENUM } from '../consts';
import routes from '../routes';

const StyledBottomNavigation = styled(BottomNavigation)`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #333;
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  color: white;
`;

const BottomNavbar = () => {
  const history = useHistory();
  const [screen, setScreen] = useState(SCREENS_ENUM.CATEGORIES);

  const onCategoryClick = () => {
    history.push(routes.CATEGORIES.path);
  };

  const onLocationClick = () => {
    history.push(routes.LOCATIONS.path);
  };

  return (
    <StyledBottomNavigation
      value={screen}
      onChange={(event, newScreenName) => {
        setScreen(newScreenName);
      }}
      showLabels
    >
      <StyledBottomNavigationAction
        label="Categories"
        value={SCREENS_ENUM.CATEGORIES}
        icon={<ListAltIcon />}
        onClick={onCategoryClick}
        selected={screen === SCREENS_ENUM.CATEGORIES}
      />
      <StyledBottomNavigationAction
        label="Locations"
        value={SCREENS_ENUM.LOCATIONS}
        icon={<LocationOnIcon />}
        onClick={onLocationClick}
        selected={screen === SCREENS_ENUM.LOCATIONS}
      />
    </StyledBottomNavigation>
  );
};

export default BottomNavbar;
