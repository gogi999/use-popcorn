import React, {
  useEffect,
  useState,
} from 'react';

import Box from './components/Box';
import Main from './components/Main';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import NumResults from './components/NumResults';
import Search from './components/Search';
import WatchedMoviesList from './components/WatchedMoviesList';
import WatchedSummary from './components/WatchedSummary';

const KEY = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=godfather`)
            .then((res) => res.json())
            .then((data) => setMovies(data.Search));
    }, []);

    return (
        <>
            <Navbar>
                <Search />
                <NumResults movies={movies} />
            </Navbar>
            <Main>
                <Box>
                    <MovieList movies={movies} />
                </Box>
                <Box>
                    <>
                        <WatchedSummary watched={watched} />
                        <WatchedMoviesList watched={watched} />
                    </>
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
