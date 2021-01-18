import React, {useEffect, useState} from 'react'
import {FilmList} from "../../components";
import {generesService, moviesService, searchService} from '../../services';
import styles from './Home.module.css';
import {useHistory} from "react-router-dom";
import {PaginationWrapper} from '../../components'

const mergeMoviesWithGenres = (movies, genres) => {
		return movies.map((movie) => {
				const {genre_ids} = movie;
				const movieGenresList =
						genre_ids.map(genreId =>
								genres.find(el => el.id === genreId))
				return {
						...movie,
						movieGenresList
				}
		})
}
export const Home = () => {
		const history = useHistory();

		const [genresList, setGenersList] = useState([]);
		const [moviesData, setMoviesData] = useState([])
		const [isLoading, setIsLoading] = useState(null);
		const [searchData, setSearchData] = useState([])

		const fetchMovies = (params) => {
				try {
						return moviesService.getMovies(params);

				} catch (e) {
						console.error(e);
				}
		}

		const fetchGenres = async () => {
				try {
						const {genres} = await generesService.getGeneres();
						return genres
				} catch (e) {
						console.log(e)
				}
		}
		// const fetchSearch = async () => {
		//
		// 				const {results} = await searchService.getSearch();
		// 				// return results
		// 				setSearchData(results);
		// 				console.log(results)
		//
		// }


		const fetchMoviesData = async () => {
				const requests = [fetchMovies(), fetchGenres()];
				try {
						setIsLoading(true);
						const [{results, ...rest}, genres] = await Promise.all(requests);


						setMoviesData({movies: mergeMoviesWithGenres(results, genres), ...rest});
						setGenersList(genres);
				} catch (e) {
						console.error(e)
				} finally {
						setIsLoading(false);
				}
		}
		// const searchMoviesData = async () => {
		//
		// 		try {
		// 				setIsLoading(true);
		//
		// 				setSearchData();
		// 		} catch (e) {
		// 				console.error(e)
		// 		} finally {
		// 				setIsLoading(false);
		// 		}
		// }


		useEffect(() => {
				fetchMoviesData();
		}, [])

		const renderLoadingIndicator = () => <div className={styles.loading}>Loading...</div>

		const onFilmClick = (film) => history.push(`/movie/${film.id}`)

		const handleChangePage = async (page) => {
				const {results, ...rest} = await fetchMovies({page})
				setMoviesData({
						movies: mergeMoviesWithGenres(results, genresList),
						...rest
				})
		}


		return (
				<div>
						{/*{true ? renderLoadingIndicator() : <FilmList/>}*/}
						{isLoading || isLoading === null ? renderLoadingIndicator() : (
								<PaginationWrapper currentPage={moviesData.page}
																	 totalPage={moviesData.total_pages}
																	 onPrevClick={handleChangePage}
																	 onNextClick={handleChangePage}
																	 handleFirstPage={handleChangePage}
																	 handleLastPage={handleChangePage}>
										<FilmList
												onFilmClick={onFilmClick}
												items={moviesData.movies}/>
								</PaginationWrapper>
						)}
				</div>

		)
}


// export const Home = () => {
// 		const history = useHistory();
// 		const [moviesList, setMoviesList] = useState([]);
// 		const [genresList, setGenersList] = useState([]);
// 		const [movieData, setMovieData] = useState(null)
// 		const [isLoading, setIsLoading] = useState(null);
//
// 		const fetchMovies = async (params) => {
// 				try {
// 						const {results, page, total_pages, total_results} = await moviesService.getMovies(params);
// 						setMovieData({page, total_pages, total_results})
// 						return results
// 						// throw new Error('ploho');
// 						// console.log(results)
// 				} catch (e) {
// 						console.error(e);
// 				}
// 		}
// 		const fetchGenres = async () => {
// 				try {
// 						const {genres} = await generesService.getGeneres();
// 						return genres
// 				} catch (e) {
// 						console.log(e)
// 				}
// 		}
//
// 		const fetchMoviesData = async (movieParams) => {
// 				const requests = genresList.length ? [fetchMovies(movieParams)] : [fetchMovies(movieParams), fetchGenres()];
// 				try {
// 						setIsLoading(true);
// 						const [movies, genres = genresList] = await Promise.all(requests);
// 						console.log({movies, genres})
// 						const mergedWithGeneresMovies = movies.map((movie) => {
// 								const {genre_ids} = movie;
// 								const movieGenresList =
// 										genre_ids.map(genreId =>
// 												genres.find(el => el.id === genreId))
// 								return {
// 										...movie,
// 										movieGenresList
// 								}
// 						})
// 						setMoviesList(mergedWithGeneresMovies);
// 						setGenersList(genres);
// 				} catch (e) {
// 						console.error(e)
// 				} finally {
// 						setIsLoading(false);
// 				}
// 		}
//
// 		useEffect(() => {
// 				fetchMoviesData();
// 		}, [])
//
// 		const renderLoadingIndicator = () => (
// 				<div className={styles.loading}>Loading...</div>
// 		)
// 		const onFilmClick = (film) => {
// 				history.push(`/movie/${film.id}`)
// 		}
//
// 		const handleChangePage = (page) => {
// 				fetchMoviesData({page})
// 		}
//
// 		return (
// 				<div>
// 						{/*{true ? renderLoadingIndicator() : <FilmList/>}*/}
// 						{isLoading || isLoading === null ? renderLoadingIndicator() : (
// 								<PaginationWrapper currentPage={movieData.page}
// 																	 totalPage={movieData.total_pages}
// 																	 onPrevClick={handleChangePage}
// 																	 onNextClick={handleChangePage}
// 																	 handleFirstPage={handleChangePage}
// 																	 handleLastPage={handleChangePage}>
// 										<FilmList
// 												onFilmClick={onFilmClick}
// 												items={moviesList}/>
// 								</PaginationWrapper>
// 						)}
// 				</div>
//
// 		)
// }
