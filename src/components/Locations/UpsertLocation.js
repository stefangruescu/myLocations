import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';
import { useFormik, FormikProvider } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { LOCATION_FIELDS_ENUM } from '../../consts';
import routes from '../../routes';
import * as actions from '../../state/actions';
import LocationForm from './LocationForm';

const EMPTY_STRING = '';
const EMPTY_ARRAY = [];

const EMPTY_INITIAL_VALUES = {
  [LOCATION_FIELDS_ENUM.NAME]: EMPTY_STRING,
  [LOCATION_FIELDS_ENUM.ADDRESS]: EMPTY_STRING,
  [LOCATION_FIELDS_ENUM.LAT]: EMPTY_STRING,
  [LOCATION_FIELDS_ENUM.LNG]: EMPTY_STRING,
  [LOCATION_FIELDS_ENUM.CATEGORIES]: EMPTY_ARRAY,
};

const ValidationSchema = Yup.object().shape({
  [LOCATION_FIELDS_ENUM.NAME]: Yup.string().required('Required'),
  [LOCATION_FIELDS_ENUM.ADDRESS]: Yup.string().required('Required'),
  [LOCATION_FIELDS_ENUM.LAT]: Yup.string().required('Required'),
  [LOCATION_FIELDS_ENUM.LNG]: Yup.string().required('Required'),
  [LOCATION_FIELDS_ENUM.CATEGORIES]: Yup.array().required('Required').min(1),
});

const Root = styled.div`
  margin: 20px;
`;

const StyledGoogleMap = styled(GoogleMap).attrs({
  center: {
    lat: 44.40862449941967,
    lng: 26.10481524239382,
  },
  mapContainerStyle: {
    width: '100%',
    height: '900px',
  },
})``;

const StyledTitle = styled.h1`
  text-align: center;
`;

const UpsertLocation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { locationId: locationIdFromParams } = useParams();
  const { isLoaded: isGoogleMapLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const categories = useSelector((state) => state.categories);

  const initialMappedCategories = useMemo(() => {
    return categories.reduce((allCategories, singleCategory) => {
      return { ...allCategories, [singleCategory]: false };
    }, {});
  }, [categories]);

  const [markers, setMarkers] = useState([]);

  const selectedLocation = useSelector((state) => state.locations)?.find(
    (location) => locationIdFromParams === location.id
  );

  const onSubmit = (formValues) => {
    if (locationIdFromParams) {
      dispatch(
        actions.editLocation({ ...formValues, id: locationIdFromParams })
      );
      history.push(routes.LOCATIONS.path);
      return;
    }

    dispatch(actions.addLocation(formValues));
    history.push(routes.LOCATIONS.path);
  };

  const formik = useFormik({
    initialValues: locationIdFromParams
      ? selectedLocation
      : EMPTY_INITIAL_VALUES,
    onSubmit,
    validationSchema: ValidationSchema,
  });

  const onMapClick = ({ latLng }) => {
    setMarkers([{ position: latLng, defaultAnimation: 2, key: uuidv4() }]);
    formik.setFieldValue(LOCATION_FIELDS_ENUM.LAT, latLng.lat());
    formik.setFieldValue(LOCATION_FIELDS_ENUM.LNG, latLng.lng());
  };

  return (
    <>
      <StyledTitle>
        {locationIdFromParams ? 'Edit' : 'Add'} Location
      </StyledTitle>
      <Root>
        <FormikProvider value={formik}>
          <LocationForm
            {...formik}
            initialMappedCategories={initialMappedCategories}
          />
        </FormikProvider>
      </Root>
      {isGoogleMapLoaded && (
        <StyledGoogleMap zoom={10} onClick={onMapClick} markers={markers}>
          {markers.map((marker) => {
            return <Marker key={marker.key} {...marker} />;
          })}
        </StyledGoogleMap>
      )}
    </>
  );
};

export default UpsertLocation;
