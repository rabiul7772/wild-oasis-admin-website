import { useSearchParams } from 'react-router';
import styled from 'styled-components';

const Select = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const Sort = ({ sortByField, sortOptions }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get(sortByField) || "";

  function handleChange(e) {
    searchParams.set(sortByField, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select value={currentSortBy} type="white" onChange={handleChange}>
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default Sort;
