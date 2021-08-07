import CategoriesPage, {
  UpsertCategory,
  Category,
} from './components/Categories';
import LocationsList, {
  UpsertLocation,
  ViewLocation,
} from './components/Locations';

const routes = {
  CATEGORIES: { path: '/', Component: CategoriesPage, exact: true },
  CATEGORY_ADD: {
    path: '/category/add',
    clearPath: '/category/add',
    Component: UpsertCategory,
  },
  CATEGORY_EDIT: {
    path: '/category/edit/:categoryId',
    clearPath: '/category/edit',
    Component: UpsertCategory,
  },
  CATEGORY: {
    path: '/category/:categoryId',
    clearPath: '/category',
    Component: Category,
  },

  LOCATIONS: { path: '/locations', Component: LocationsList, exact: true },
  LOCATION_ADD: {
    path: '/location/add',
    clearPath: '/location/add',
    Component: UpsertLocation,
  },
  LOCATION_EDIT: {
    path: '/location/edit/:locationId',
    clearPath: '/location/edit',
    Component: UpsertLocation,
  },
  LOCATION: {
    path: '/location/:locationId',
    clearPath: '/location',
    Component: ViewLocation,
  },
};

export default routes;
