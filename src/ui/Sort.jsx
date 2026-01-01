import { useSearchParams } from 'react-router';
import styled from 'styled-components';

const StyledSort = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
`;

const SortOption = styled.option`
  background-color: var(--color-grey-0);
  border: none;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  padding: 0.44rem 0.8rem;
`;

const Sort = ({ sortByField, sortOptions }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value) {
    searchParams.set(sortByField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSort>
      <select
        style={{ border: 'none' }}
        onChange={e => handleClick(e.target.value)}
      >
        {sortOptions.map(option => (
          <SortOption key={option.value} value={option.value}>
            {option.label}
          </SortOption>
        ))}
      </select>
    </StyledSort>
  );
};

export default Sort;
