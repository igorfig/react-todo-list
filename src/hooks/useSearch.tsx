import { useState, createContext, useContext, ReactNode, useCallback } from 'react';

interface SearchProviderProps {
    children: ReactNode;
}

interface SearchContextData {
    value: string;
    handleChangeSearchValue: (value: string) => void;
    isSearching: boolean;
    handleSwitchIsSearchingStatus: (status: boolean) => void;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export function SearchProvider({ children }: SearchProviderProps) {
    const [value, setValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    const handleSwitchIsSearchingStatus = useCallback((status: boolean) => setIsSearching(status),[]);
    const handleChangeSearchValue = useCallback((value: string) => setValue(value), [])

    return (
        <SearchContext.Provider value={{value, handleChangeSearchValue, isSearching, handleSwitchIsSearchingStatus}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = useContext(SearchContext);

    return context
}