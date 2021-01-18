import {AXIOS} from "./axiosConfig";

class MovieService{
		async getMovies(params){
				const {data} = await AXIOS.get('/discover/movie', {
						params
				})
				return data
		}

		async getMovieDetailsById(movieId){
				const {data} = await AXIOS.get(`/movie/${movieId}`)
				return data
		}

}
export const moviesService = new MovieService();


