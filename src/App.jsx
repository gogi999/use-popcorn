import React, {
  useEffect,
  useState,
} from 'react';

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

const KEY = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
    const [query, setQuery] = useState('godfather');
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedId, setSelectedId] = useState(null);

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
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError('');

                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

                if (!res.ok) throw new Error('Something went wrong with fetching movies!');

                const data = await res.json();

                if (data.Response === 'False') throw new Error('Movie not found!');

                setMovies(data.Search);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        }

        fetchMovies();
    }, [query]);

    const handleSelectMovie = (id) => {
        setSelectedId((selectedId) => id === selectedId ? null : id);
    }

    const handleCloseMovie = () => {
        setSelectedId(null);
    }

    const handleAddWatched = (movie) => {
        setWatched((watched) => [...watched, movie]);
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
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList watched={watched} />
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
