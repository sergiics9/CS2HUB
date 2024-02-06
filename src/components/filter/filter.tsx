import { useSkins } from '../../hooks/skins/use.skins';
import './filter.scss';

export function Filter() {
  const { handleFilter } = useSkins();

  return (
    <>
      <label htmlFor="filter">
        <select
          onChange={handleFilter}
          name="filter"
          id="filter"
          aria-label="filter"
        >
          <label id="all"></label>
          <option value="">All</option>
          <label id="pistol"></label>
          <option value="Pistol">Pistols</option>
          <label id="smg"></label>
          <option value="SMG">SMG's</option>
          <label id="rifle"></label>
          <option value="Rifle">Rifles</option>
          <label id="knife"></label>
          <option value="Knife">Knifes</option>
          <label id="glove"></label>
          <option value="Glove">Gloves</option>
        </select>
      </label>
    </>
  );
}
