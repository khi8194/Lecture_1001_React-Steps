// import { useEffect, useState } from 'react';
// import Layout from '../common/Layout';
// import Pic from '../common/Pic';
// import Modal from '../common/Modal';
// import Content from '../common/Content';

// export default function Gallery() {
// 	console.log('Gallery Component Rendered!!');

// 	const [Flickr, setFlickr] = useState([]);
// 	const [ModalOpen, setModalOpen] = useState(false);
// 	//클릭한 목록요소의 순번을 담을 상태값 생성
// 	const [Index, setIndex] = useState(0);

// 	useEffect(() => {
// 		const method = `flickr.people.getPhotos`;
// 		const flickr_api = import.meta.env.VITE_FLICKR_API;
// 		const myID = '201494903@N03';
// 		const num = 10;
// 		const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;

// 		fetch(url)
// 			.then(data => data.json())
// 			.then(json => {
// 				setFlickr(json.photos.photo);
// 				console.log(json);
// 			});
// 	}, []);

// 	useEffect(() => {
// 		document.body.style.overflow = ModalOpen ? 'hidden' : 'auto';
// 	}, [ModalOpen]);

// 	return (
// 		<>
// 			<Layout title={'GALLERY'}>
// 				<Content delay={1}>
// 					<section className='galleryList'>
// 						{Flickr.map((data, idx) => {
// 							return (
// 								<article
// 									key={idx}
// 									onClick={() => {
// 										setModalOpen(true);
// 										setIndex(idx);
// 									}}>
// 									<Pic
// 										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`}
// 										className='pic'
// 										shadow
// 									/>
// 									<h3>{data.title}</h3>
// 								</article>
// 							);
// 						})}
// 					</section>
// 				</Content>
// 			</Layout>

// 			{ModalOpen && (
// 				<Modal setModalOpen={setModalOpen}>
// 					<Pic
// 						src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`}
// 						shadow
// 					/>
// 				</Modal>
// 			)}
// 		</>
// 	);
// }

import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';
import Content from '../common/Content';

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
	const [ModalOpen, setModalOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	//Gallery페이지에만 전용으로 동작할 커스텀 모션 객체 생성
	const customMotion = {
		init: { opacity: 0, x: 200 },
		active: { opacity: 1, x: 0 },
		end: { opacity: 0, x: -200 },
		transition: { delay: 0 }
	};

	useEffect(() => {
		const method = 'flickr.people.getPhotos';
		const flickr_api = import.meta.env.VITE_FLICKR_API;
		const myID = '197119297@N02';
		const num = 10;
		const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				setFlickr(json.photos.photo);
			});
	}, []);

	useEffect(() => {
		document.body.style.overflow = ModalOpen ? 'hidden' : 'auto';
	}, [ModalOpen]);

	return (
		<>
			<Layout title={'GALLERY'}>
				{/* Content호출시 위에서 준비한 전용 모션 정보 props로 전달 */}
				<Content delay={1.5} customMotion={customMotion}>
					<section className='galleryList'>
						{Flickr.map((data, idx) => {
							return (
								<article
									key={idx}
									onClick={() => {
										setModalOpen(true);
										setIndex(idx);
									}}>
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
				</Content>
			</Layout>

			{ModalOpen && (
				<Modal setModalOpen={setModalOpen}>
					<Pic
						src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`}
						shadow
					/>
				</Modal>
			)}
		</>
	);
}
