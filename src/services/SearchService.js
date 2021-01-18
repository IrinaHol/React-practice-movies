import {AXIOS} from "./axiosConfig";

class SearchService{
		async getSearch(params){
				console.log(params);
				const {data} = await AXIOS.get(`/search/movie`, {
						params
				})
				return data
		}

}
export const searchService = new SearchService();