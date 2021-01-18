


const initialState = {
		searchFilm: '',
}




export const Reducer = (state=initialState, action) => {
		switch (action.type) {
				case 'SEARCH_FILM':{
						return {...state, searchFilm: action.payload}
				}
				default : {
						return state
				}
		}

}