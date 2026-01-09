import styled from 'styled-components';
import DashboardFilter from '../features/dashboard/DashboardFilter';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

const DashboardWrapper = styled.div`
  transform: scale(90%);
  transform-origin: top left;
  width: 111.1%;
  height: 111.1%;
  overflow: hidden;
`;

const DashboardRow = styled(Row)`
  margin-bottom: 2rem;
`;

function Dashboard() {
  return (
    <DashboardWrapper>
      <DashboardRow type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </DashboardRow>
      <DashboardLayout />
    </DashboardWrapper>
  );
}

export default Dashboard;
