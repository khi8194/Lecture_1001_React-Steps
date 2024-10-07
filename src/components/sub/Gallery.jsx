import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
	console.log(Flickr);

	useEffect(() => {
		const method = `flickr.people.getPhotos`;
		const flickr_api = import.meta.env.VITE_FLICKR_API;
		const myID = '201494903@N03';
		const num = 10;
		const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				setFlickr(json.photos.photo);
				console.log(json);
			});
	}, []);

	return (
		<Layout title={'GALLERY'}>
			<section className='galleryList'>
				{Flickr.map((data, idx) => {
					// const imgUrl = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`;

					return (
						<article key={idx}>
							{/* <img
								src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`}
								alt={data.title}
							/> */}
							{/* <img className='pic' src={imgUrl} alt={data.title} /> */}
							<Pic
								src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`}
								className='pic'
								shadow
							/>
							<h3>{data.title}</h3>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
