import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useKey } from '../hooks/useKey';
import Loader from './Loader';
import StarRating from './StarRating';

const KEY = process.env.REACT_APP_OMDB_API_KEY;

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('');

    const countRef = useRef(0);

    useEffect(() => {
        if (userRating) countRef.current++;
    }, [userRating]);

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    const { 
        Title: title, 
        Year: year, 
        Poster: poster, 
        Runtime: runtime, 
        imdbRating, 
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

    // if (imdbRating > 8) return <p>Greatest ever!</p>
    /*
    const [isTop, setIsTop] = useState(imdbRating > 8);
    console.log(isTop);

    useEffect(() => {
        setIsTop(imdbRating > 8);
    }, [imdbRating]);
    */

    // const isTop = imdbRating > 8;
    // console.log(isTop);

    // const [avgRating, setAvgRating] = useState(0);

    const handleAdd = () => {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
            countRatingDecisions: countRef.current,
        }

        onAddWatched(newWatchedMovie);
        // onCloseMovie();

        // setAvgRating(Number(imdbRating));
        // setAvgRating((avgRating) => (avgRating + userRating) / 2);
    }

    useKey('Escape', onCloseMovie)
    /*
    useEffect(() => {
        const callback = (e) => {
            if (e.code === 'Escape') {
                onCloseMovie();
            }
        }

        document.addEventListener('keydown', callback);

        return () => document.removeEventListener('keydown', callback);
    }, [onCloseMovie]);
    */
    useEffect(() => {
        const getMovieDetails = async () => {
            setIsLoading(true);

            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        }

        getMovieDetails();
    }, [selectedId]);

    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return () => {
            document.title = 'usePopcorn';
        }
    }, [title]);

    return (
        <div className="details">
            {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <header>
                            <button className="btn-back" onClick={onCloseMovie}>
                                &larr;
                            </button>
                            <img src={poster} alt={`Poster of ${movie} movie`} />
                            <div className="details-overview">
                                <h2>{title}</h2>
                                <p>
                                    {released} &bull; {runtime}
                                </p>
                                <p>{genre}</p>
                                <p>
                                    <span>⭐️</span>
                                    {imdbRating} IMDb rating
                                </p>
                            </div>
                        </header>
                    </>
                )}
                {/* <p>{avgRating}</p> */}
            <section>
                <div className="rating">
                    {!isWatched ? (
                        <>
                            <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                            {userRating > 0 && (
                                <button className="btn-add" onClick={handleAdd}>
                                    + Add to list
                                </button>
                            )}
                        </>
                    ) : (
                        <p>
                            You rated this movie {watchedUserRating}{" "}
                            <span>⭐️</span>
                        </p>
                    )}
                </div>
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    );
}

export default MovieDetails;
