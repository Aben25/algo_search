import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  RefinementList,
  InfiniteHits,
  connectStateResults,
  SearchBox,
  connectHits,
  Index,
} from "react-instantsearch-dom";
import "instantsearch.css/themes/reset.css";
import "tailwindcss/tailwind.css";
import { useContext } from "react";

// define algolia client
const searchClient = algoliasearch("6V4U26IN4K", "20e488ed9f87b0b54e36cb36667512f7");

// create a custom hit component
const Hits = connectHits(({ hits }) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-2">
    {hits.map(hit => (
      <a href={hit.permalink} target="_blank" rel="noopener noreferrer">
        <div className="px-4 py-5 sm:px-6" key={hit.objectID}>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {hit.post_title}  {/* assuming "title" is a field in your Algolia index data */}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {hit.post_excerpt} {/* assuming "excerpt" is a field in your Algolia index data */}
          </p>

        </div>
      </a>
    ))}
  </div>
));

// Custom Results component that only shows hits when a query has been made
const Results = connectStateResults(
  ({ searchState }) => searchState && searchState.query
    ? <Hits />
    : null
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mb-0 flex">
      <InstantSearch searchClient={searchClient} indexName="artba_searchable_posts">
        <Configure hitsPerPage={10} />
        <div className="w-1/4 p-4">
          <h2 className="text-lg leading-7 font-medium text-gray-900">Filter</h2>
          <hr className="mt-2 mb-2" />
          <h5>Post Type</h5>
          <RefinementList attribute="post_type" />
        </div>
        <div className="w-3/4 p-4">
          <SearchBox />
          <Index indexName="tdf_searchable_posts">
            <Results />
          </Index>
          <Index indexName="artba_searchable_posts">
            <Results />
          </Index>
        </div>
      </InstantSearch>
    </div>
  );
}
