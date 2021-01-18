import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {moviesService} from "../../services";
import styles from './MovieDetails.module.css'
import {toast} from "react-toastify";

export const MovieDetails = () => {
		// const {params:{id}} = useRouteMatch()

		const [filmDetails, setFilmDetails] = useState(null);
		const [isLoading, setIsLoading] = useState(null);
		const {id, ...rest} = useParams();
		// const {poster_path} = props;
		const gerMovieDetails = async ()=>{
				try {
						setIsLoading(true);
						const data = await moviesService.getMovieDetailsById(id)
						setFilmDetails(data);
						toast.success('Loading...')
						console.log(data)

				}
				catch (e){
						console.error(e)
						toast.error('error((((')
				}
						finally {
						setIsLoading (false);
				}

		}

				useEffect(() => {
				gerMovieDetails()
		}, [])

		if((isLoading || !filmDetails) || isLoading === null ){
				return <div>loading...</div>
		}
		return (
				<div className= {styles.wrapperDetails}>
						<img src={`https://image.tmdb.org/t/p/w200${filmDetails.poster_path}`} alt={`${filmDetails.original_title} poster`}/>
						<h1>{filmDetails.original_title}</h1>
						<h2><span>Genres: </span>{filmDetails.genres.map((el, index) => <span key={el.id}>
								{el.name} {index < filmDetails.genres.length - 1 && '-'} </span>)}</h2>
						<h3>Release-date: {filmDetails.release_date}</h3>
						<h2>{filmDetails.tagline}</h2>
						<p>{filmDetails.overview}</p>

				</div>
		);
}