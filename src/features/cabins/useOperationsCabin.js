import { useSearchParams } from 'react-router';

const useOperationsCabin = cabins => {
  const [searchParams] = useSearchParams();
  const discount = searchParams.get('discount') || 'all';
  const sortBy = searchParams.get('sortBy') || 'name_asc';

  if (!cabins) return [];

  let filteredCabins;

  if (discount === 'all') filteredCabins = cabins;
  else if (discount === 'no_discount')
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  else if (discount === 'with_discount')
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);
  else filteredCabins = cabins;

  let sortedCabins = [...filteredCabins];

  if (sortBy === 'name_asc')
    sortedCabins.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === 'name_desc')
    sortedCabins.sort((a, b) => b.name.localeCompare(a.name));
  else if (sortBy === 'price_asc')
    sortedCabins.sort((a, b) => a.regularPrice - b.regularPrice);
  else if (sortBy === 'price_desc')
    sortedCabins.sort((a, b) => b.regularPrice - a.regularPrice);
  else if (sortBy === 'capacity_asc')
    sortedCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
  else if (sortBy === 'capacity_desc')
    sortedCabins.sort((a, b) => b.maxCapacity - a.maxCapacity);

  return sortedCabins;
};

export default useOperationsCabin;
