import React, { useState } from 'react';

import Box from './components/Box';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';
import Main from './components/Main';
import MovieDetails from './components/MovieDetails';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import NumResults from './components/NumResults';
import Search from './components/Search';
import WatchedMoviesList from './components/WatchedMoviesList';
import WatchedSummary from './components/WatchedSummary';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { useMovies } from './hooks/useMovies';

const KEY = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const { movies, isLoading, error } = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], 'watched');

    /*
    useEffect(() => {
        console.log('After initial render');
    }, []);

    useEffect(() => {
        console.log('After every render');
    });

    useEffect(() => {
        console.log('D');
    }, [query]);

    console.log('During render');
    */
    

    const handleSelectMovie = (id) => {
        setSelectedId((selectedId) => id === selectedId ? null : id);
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    const handleAddWatched = (movie) => {
        setWatched((watched) => [...watched, movie]);

        // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
    }

    const handleDeleteWatched = (id) => {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    return (
        <>
            <Navbar>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Navbar>
            <Main>
                <Box>
                    {/* {isLoading ? (
                        <Loader />
                    ) : (
                        <MovieList movies={movies} />
                    )} */}
                    {isLoading  && <Loader />}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails 
                            selectedId={selectedId} 
                            onCloseMovie={handleCloseMovie} 
                            onAddWatched={handleAddWatched}
                            watched={watched}    
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList 
                                watched={watched} 
                                onDeleteWatched={handleDeleteWatched} 
                            />
                        </>
                    )}
                </Box>
                {/* <Box element={<MovieList movies={movies} />} />
                <Box 
                    element={
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList watched={watched} />
                        </>
                    }
                /> */}
            </Main>
        </>
    );
}

export default App;
