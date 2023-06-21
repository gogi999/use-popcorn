import React, { useState } from 'react';

import Box from './components/Box';
import Main from './components/Main';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import NumResults from './components/NumResults';
import Search from './components/Search';
import WatchedMoviesList from './components/WatchedMoviesList';
import WatchedSummary from './components/WatchedSummary';
import {
  tempMovieData,
  tempWatchedData,
} from './tempData';

const App = () => {
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);

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
