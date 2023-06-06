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
} from "react-instantsearch-dom";
import "instantsearch.css/themes/reset.css";
import "tailwindcss/tailwind.css";
import { useContext } from "react";

// define algolia client
const searchClient = algoliasearch("6V4U26IN4K", "20e488ed9f87b0b54e36cb36667512f7");


export default function Home() {


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mb-0">
      <h1>Test1</h1>
      <InstantSearch searchClient={searchClient} indexName="wp_searchable_posts">
        <Configure hitsPerPage={10} />
        <SearchBox />
        <InfiniteHits />
      </InstantSearch>
      
    </div>
  );
}
