import Filter from '../../ui/Filter';

const options = [
  { label: 'All', value: 'all' },
  { label: 'With discount', value: 'with-discount' },
  { label: 'No discount', value: 'no-discount' }
];

const CabinTableOperations = () => {
  return <Filter filterFiled="discount" options={options} />;
};

export default CabinTableOperations;
