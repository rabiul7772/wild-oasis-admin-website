import { useSearchParams } from 'react-router';

const useOperationsCabin = cabins => {
  const [searchParams] = useSearchParams();
  const discount = searchParams.get('discount') || 'all';
  const sortBy = searchParams.get('sortBy') || 'name_asc';

  if (!cabins) return [];

  // FILTER

  const discountFilters = {
    all: cabins => cabins,
    no_discount: cabins => cabins.filter(cabin => cabin.discount === 0),
    with_discount: cabins => cabins.filter(cabin => cabin.discount > 0)
  };

  const filteredCabins = discountFilters[discount]?.(cabins) ?? cabins;

  // SORT

  const sortConfig = {
    name: (a, b) => a.name.localeCompare(b.name),
    price: (a, b) => a.regularPrice - b.regularPrice,
    capacity: (a, b) => a.maxCapacity - b.maxCapacity
  };

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const [key, order] = sortBy.split('_');
    const compareFn = sortConfig[key];

    if (!compareFn) return 0;
    return order === 'asc' ? compareFn(a, b) : compareFn(b, a);
  });

  return sortedCabins;
};

export default useOperationsCabin;
