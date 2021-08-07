import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

const StyledTypography = styled(Typography)`
  flex-grow: 1;
`;

const StyledIconButton = styled(IconButton)`
  margin-right: 15px;
  color: whitesmoke;
`;

const StyledAppBar = styled(AppBar)`
  background-color: #333;
`;

const TopBar = ({
  onAddClick,
  onEditClick,
  onItemViewClick,
  onRemoveClick,
  viewInGoogleAction,
  title,
  showSearch,
}) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledTypography variant="h6">{title}</StyledTypography>
        <StyledIconButton onClick={onItemViewClick}>
          <VisibilityIcon />
        </StyledIconButton>
        <StyledIconButton onClick={onAddClick}>
          <AddCircleOutlineIcon />
        </StyledIconButton>
        <StyledIconButton onClick={onEditClick}>
          <EditIcon />
        </StyledIconButton>
        <StyledIconButton onClick={onRemoveClick}>
          <HighlightOffIcon />
        </StyledIconButton>
        {showSearch && (
          <StyledIconButton onClick={viewInGoogleAction}>
            <LocationSearchingIcon />
          </StyledIconButton>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopBar;
