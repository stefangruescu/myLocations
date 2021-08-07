import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ViewCategory = () => {
  const categories = useSelector((state) => state.categories);
  const { categoryId } = useParams();
  const selectedCategory = categories.filter(
    (category) => category === categoryId
  );

  return (
    <StyledContainer>
      <h1>View Category</h1>
      <h1>{selectedCategory}</h1>
    </StyledContainer>
  );
};

export default ViewCategory;
