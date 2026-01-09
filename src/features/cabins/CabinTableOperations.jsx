import Filter from '../../ui/Filter';
import Sort from '../../ui/Sort';
import StyledTableOperations from '../../ui/TableOperations';

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'With discount', value: 'with_discount' },
  { label: 'No discount', value: 'no_discount' }
];

const sortOptions = [
  { label: 'Sort by name (A-Z)', value: 'name_asc' },
  { label: 'Sort by name (Z-A)', value: 'name_desc' },
  { label: 'Sort by price (low first)', value: 'price_asc' },
  { label: 'Sort by price (high first)', value: 'price_desc' },
  { label: 'Sort by capacity (low first)', value: 'capacity_asc' },
  { label: 'Sort by capacity (high first)', value: 'capacity_desc' }
];

const CabinTableOperations = () => {
  return (
    <StyledTableOperations>
      <Filter filterField="discount" options={filterOptions} />
      <Sort sortByField="sortBy" sortOptions={sortOptions} />
    </StyledTableOperations>
  );
};

export default CabinTableOperations;
