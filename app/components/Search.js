import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('6V4U26IN4K', '20e488ed9f87b0b54e36cb36667512f7');

const Hit = ({ hit }) => <div>{hit.name}</div>;

export default function SearchBar() {
    return (
        <InstantSearch searchClient={searchClient} indexName="your_index">
            <SearchBox />
            <Hits hitComponent={Hit} />
        </InstantSearch>
    );
}
