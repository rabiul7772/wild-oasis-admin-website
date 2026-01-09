import styled from 'styled-components';
import CabinTable from '../features/cabins/CabinTable';
import CabinTableOperations from '../features/cabins/CabinTableOperations';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import AddCabin from './AddCabin';

const CabinsWrapper = styled.div`
  transform: scale(90%);
  transform-origin: top left;
  width: 111.1%;
  height: 111.1%;
  overflow: hidden;
`;

const CabinRow = styled(Row)`
  margin-bottom: 2rem;
`;

function Cabins() {
  return (
    <CabinsWrapper>
      <CabinRow type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </CabinRow>
      <Row type="vertical">
        <CabinTable />
        <AddCabin />
      </Row>
    </CabinsWrapper>
  );
}

export default Cabins;
