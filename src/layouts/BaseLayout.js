import React from 'react';
import styles from './BaseLayout.module.css';
import {Link} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {setSearchFilm} from '../redux';
import {searchFilm} from '../redux'

export const BaseLayout = ({children}) => {
		const dispatch = useDispatch();
		// const Film = (e) =>{
		// 		e.preventDefault()
		// }
		//
		// const onSearchFilm =  (value)=> {
		// 		 dispatch(setSearchFilm({film: value}))
		// console.log(searchFilm)
		const onSearchMovie =  (value) => {
			 dispatch(setSearchFilm({query: value}))

		}

		// const onSearchFilm = (e) => {
		// 		// e.preventDefault()
		// 		// dispatch(searchFilmAction(e.target.value))
		// 		const result = e.target.value
		// 		dispatch({type: 'SEARCH_FILM', payload:{result}})
		// 		console.log(result)
		// }

		return (
				<div>
						<header className={styles.mainWrapper}>
								<div className={styles.LinkHeader}><Link to='/'>Header</Link></div>
								<div className={styles.searchWrapper}>
										{/*<form onSubmit={Film}>*/}
										{/*<input type="text" placeholder="Search..."*/}
										{/*			 onSearchMovie={onSearchMovie}*/}
										{/*/>*/}
										<input onChange={(e)=>
												onSearchMovie(e.target.value)} className={styles.search}
													 type="text" placeholder='search...'
										value={searchFilm}/>

													 <button type="submit">Ok</button>
										{/*</form>*/}
								</div>
						</header>
						<main>
								{children}
						</main>
						<footer>Footer</footer>
				</div>
		)

}