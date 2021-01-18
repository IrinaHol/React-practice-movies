
import {searchService} from '../../services'
// export const setSearchFilm = (film) =>({
// 		type: 'SEARCH_FILM',
// 		payload: film
// })

// export const setSearchFilm = (value)=> async (dispatch)=>{
// 		let data = await searchService.getSearch(value).then()
// 		dispatch({type: 'SEARCH_FILM', payload:data})
// }

export const setSearchFilm = (query)=> async (dispatch)=>{
		const data = await searchService.getSearch(query).then()
		dispatch({type: 'SEARCH_FILM', payload:data})
}

