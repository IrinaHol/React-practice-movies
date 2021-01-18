import React, {useEffect} from 'react'
import {BaseLayout} from './layouts';
import {Home, MovieDetails} from './pages';
import './App.css';
import {Route, Switch, useHistory} from "react-router-dom";
import './App.css';
import {useDispatch} from 'react-redux';
import {setSearchFilm} from "./redux";
import {generesService, searchService} from './services';




function App() {
		const history = useHistory();
		const dispatch = useDispatch();

		const onSearchMovie= async (value)=>{
				try {
					 await searchService.getSearch(value).then()
						// return promise
				}
				catch (e){
						console.error(e)
				}
		}
		// const onSearchMovie = async () => {
		// 		try {
		// 				const promise = await generesService.getGeneres();
		// 				console.log(promise);
		// 				 return promise
		// 		} catch (e) {
		// 				console.log(e)
		// 		}
		// }


		// useEffect(() => {
		// 		dispatch(setSearchFilm())
		// }, [])

		return (
						<BaseLayout onSearchMovie={onSearchMovie}>
								<Switch>
										<Route path='/' exact>
												<Home/>
										</Route>
										<div className={'mainMovieDetails'}>
												<Route path='/movie/:id'>
														<MovieDetails/>
												</Route>
										</div>


										<Route>
												<h1>Page not found <button onClick={()=> history.push('/')}>go home</button></h1>
										</Route>

								</Switch>
						</BaseLayout>


		);
}

export default App;
