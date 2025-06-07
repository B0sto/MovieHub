import SearchIcon from "@/public/SearchIcon";


type searchTermType = {
    searchTerm: string,
    setSearchTerm: (value: string) => void;
}
const Search = ({searchTerm, setSearchTerm}: searchTermType) => {
  return (
    <div className="search">
        <div className="search-wrapper">
            <SearchIcon/>

            <input type="text" 
                placeholder="Search Through thousands of movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
    </div>
  )
}

export default Search