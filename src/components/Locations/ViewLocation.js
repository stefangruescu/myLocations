import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import styled from 'styled-components';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const StyledCard = styled(Card)`
  width: 500px;
  height: 500px;
  background-color: #555;
  color: white;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;
const StyledInnerContainer = styled.div`
  display: flex;
`;
const StyledColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
`;

const ViewLocation = () => {
  const locations = useSelector((state) => state.locations);
  const { locationId } = useParams();
  const selectedLocation = locations.filter(
    (location) => location.id === locationId
  );

  return (
    <StyledContainer>
      <Typography variant="h2">View Location</Typography>
      <StyledCard>
        <CardContent>
          <StyledInnerContainer>
            <StyledColumn>
              <Typography variant="h5">name:</Typography>
              <Typography variant="h5">address:</Typography>
              <Typography variant="h5">lattitude:</Typography>
              <Typography variant="h5">longitude:</Typography>
              {!!selectedLocation[0].categories.length && (
                <Typography variant="h5">category:</Typography>
              )}
            </StyledColumn>
            <StyledColumn>
              <Typography variant="h6">{selectedLocation[0].name}</Typography>
              <Typography variant="h6">
                {selectedLocation[0].address}
              </Typography>
              <Typography variant="h6">{selectedLocation[0].lat}</Typography>
              <Typography variant="h6">{selectedLocation[0].lng}</Typography>
              <Typography variant="h6">
                {selectedLocation[0].categories.join(', ')}
              </Typography>
            </StyledColumn>
          </StyledInnerContainer>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default ViewLocation;
