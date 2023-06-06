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
      <div className="px-4 py-5 sm:px-6" key={hit.objectID}>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {hit.post_title}  {/* assuming "title" is a field in your Algolia index data */}
        </h3>
      </div>
    ))}
  </div>
));


// Other imports and definitions...

const IndexComponent = ({ indexName }) => (
  <InstantSearch searchClient={searchClient} indexName={indexName}>
    <Configure hitsPerPage={10} />
    <Results />
  </InstantSearch>
);
export default function Home() {


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mb-0">
      <InstantSearch searchClient={searchClient} indexName="wp_searchable_posts">
        <Configure hitsPerPage={10} />
        <SearchBox />

        <Index indexName="tdf_searchable_posts">
          <h2>tdf_searchable_posts</h2>
          <Hits />
        </Index>

        <Index indexName="artba_searchable_posts">
          <h2>tdf_searchable_posts1</h2>
          <Hits />
        </Index>

      </InstantSearch>

    </div>
  );
}
