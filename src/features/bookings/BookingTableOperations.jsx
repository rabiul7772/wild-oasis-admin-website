import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';
import Sort from '../../ui/Sort';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'checked_out', label: 'Checked out' },
  { value: 'checked_in', label: 'Checked in' },
  { value: 'unconfirmed', label: 'Unconfirmed' }
];

const sortOptions = [
  { value: 'startDate_desc', label: 'Sort by date (recent first)' },
  { value: 'startDate_asc', label: 'Sort by date (earlier first)' },
  {
    value: 'totalPrice_desc',
    label: 'Sort by amount (high first)'
  },
  { value: 'totalPrice_asc', label: 'Sort by amount (low first)' }
];

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="status" options={filterOptions} />
      <Sort sortByField="sortBy" sortOptions={sortOptions} />
    </TableOperations>
  );
}

export default BookingTableOperations;
