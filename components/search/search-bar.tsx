'use client';

import { useState } from "react";
import SearchUserButton from "@/components/search/search-user-button";

const SearchBar = () => {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/searchUsers?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQ(value);
    handleSearch(value);
  }

  return ( 
    <div className="w-full flex flex-col items-center justify-center">
      <input 
        type="text"
        placeholder="Search by username..."
        value={q}
        onChange={handleChange}
        className="p-2 bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-lg w-1/2"
      />
      <ul className="pt-2 flex flex-col space-y-2 w-1/2">
        {results.map((user: any, index: number) => (
          <SearchUserButton user={user} key={index}/>
        ))}
      </ul>
    </div>
   );
}
 
export default SearchBar;