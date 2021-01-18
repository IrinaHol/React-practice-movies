import {AXIOS} from "./axiosConfig";

class GeneresService{
		async getGeneres(){
				const {data} = await AXIOS.get('/genre/movie/list')
				return data
		}


}
export const generesService = new GeneresService();

