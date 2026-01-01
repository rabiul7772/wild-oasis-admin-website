import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabins from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router';

const CabinTable = () => {
  const { isPending, cabins } = useCabins();

  const [searchParams] = useSearchParams();
  const discount = searchParams.get('discount') || 'all';

  if (isPending) return <Spinner />;

  let filteredCabins;

  if (discount === 'all') filteredCabins = cabins;
  if (discount === 'no-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if (discount === 'with-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
