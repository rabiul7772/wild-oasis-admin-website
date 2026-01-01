import CabinRow from './CabinRow';
import useCabins from './useCabins';
import useOperationsCabin from './useOperationsCabin';

import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Empty from '../../ui/Empty';

const CabinTable = () => {
  const { isPending, cabins } = useCabins();

  const filteredAndSortedCabins = useOperationsCabin(cabins);

  if (isPending) return <Spinner />;
  if (!filteredAndSortedCabins.length) return <Empty resourceName="cabins" />;

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
          data={filteredAndSortedCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
