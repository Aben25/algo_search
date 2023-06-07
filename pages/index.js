import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  RefinementList,
  connectRefinementList,
  connectStateResults,
  SearchBox,
  connectHits,
  Index,
} from "react-instantsearch-dom";
import "instantsearch.css/themes/reset.css";
import "tailwindcss/tailwind.css";
import { FaSearch } from 'react-icons/fa';

// define algolia client
const searchClient = algoliasearch("6V4U26IN4K", "20e488ed9f87b0b54e36cb36667512f7");
function stripHtml(html) {
  let doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}
// create a custom hit component
const Hits = connectHits(({ hits }) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-2">
    {hits.map(hit => (
      <div className="px-4 py-1 sm:px-6" key={hit.objectID}>
        <a href={hit.permalink} target="_blank" rel="noopener noreferrer">

          <h4 className="text-md leading-6 font-small text-gray-900">
            {hit.post_title}  {/* assuming "title" is a field in your Algolia index data */}
          </h4>
        </a>

        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {/* Onle show few sentense from hit.content */}
          {hit.content.substring(0, 150)}... {/* assuming "excerpt" is a field in your Algolia index data */}
        </p>

      </div>
    ))}
  </div>
));

const NoviEventsHits = connectHits(({ hits }) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-0">
    {hits.map(hit => (
      <div className="sm:px-6" key={hit.EventUniqueId}>
        <a href={hit.Url} target="_blank" rel="noopener noreferrer">
        <h4 className="text-md leading-6 font-small text-gray-900">
            {hit.Name}
          </h4>
        </a>
        <p className="ax-w-2xl text-sm text-gray-500">
          {stripHtml(hit.Details).substring(0, 150)} ...
        </p>
      </div>
    ))}
  </div>
));


// Custom Results component that only shows hits when a query has been made
const Results = connectStateResults(
  ({ searchState }) =>
    <Hits />

);



const CustomRefinementList = ({ items, refine }) => (
  <ul>
    {items.map(item => {
      const url = new URL(item.label);
      const base = url.hostname;
      return (
        <li key={item.label}>
          <input
            type="checkbox"
            checked={item.isRefined}
            onChange={() => refine(item.value)}
          />
          <label>{base}</label>
        </li>
      );
    })}
  </ul>
);
const ConnectedRefinementList = connectRefinementList(CustomRefinementList);

export default function Home() {



  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mb-0 flex">
      <InstantSearch searchClient={searchClient} indexName="artba_searchable_posts">
        <Configure hitsPerPage={3} />
        <div className="w-1/4 p-4">
          <h2 className="text-lg leading-7 font-medium text-gray-900">Filter</h2>
          <hr className="mt-2 mb-2" />
          <h5>Category</h5>
          <RefinementList attribute="taxonomies.category" limit={5} />
          <h5>Author</h5>
          <RefinementList attribute="post_author.display_name" limit={5} />
          <h5>Post Type</h5>
          <RefinementList attribute="post_type" limit={2} />
          {/* <h5>Permalink</h5>
          <ConnectedRefinementList attribute="permalink" /> */}
        </div>
        <div className="w-3/4 p-4">
        <div className="relative flex items-center">
        <FaSearch className="absolute text-gray-500 right-5 text-xl " />
        <div className="w-full">
          <SearchBox />
        </div>
      </div>
          <Index indexName="artba_searchable_posts">
            <p>ARTBA</p>
            <Results />
          </Index>
          <Index indexName="Newsline_searchable_posts">
            <p>Newsline</p>
            <Results />
          </Index>
          <Index indexName="tdf_searchable_posts">
            <p>TDF</p>
            <Results />
          </Index>

          <Index indexName="novi_events">
            <p>Novi Events</p>
            <NoviEventsHits />
          </Index>
        </div>
      </InstantSearch>
    </div>
  );
}
