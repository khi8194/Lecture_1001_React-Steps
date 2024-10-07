import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
	const [ModalOpen, setModalOpen] = useState(false);
	//클릭한 목록요소의 순번을 담을 상태값 생성
	const [Index, setIndex] = useState(0);

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

	useEffect(() => {
		document.body.style.overflow = ModalOpen ? 'hidden' : 'auto';
	}, [ModalOpen]);

	return (
		<>
			<Layout title={'GALLERY'}>
				<section className='galleryList'>
					{Flickr.map((data, idx) => {
						return (
							// <article key={idx} onClick={() => {setModalOpen(true)}>
							<article
								key={idx}
								onClick={() => {
									setModalOpen(true);
									//각 이미지 목록 클릭시 클릭한 idx순번값을 Index상태값에 저장
									setIndex(idx);
								}}>
								{/*<article
								key={idx}
								onClick={() => {
									setIndex(`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`);
									setModalOpen(true);
								}}>*/}
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

			{/* {ModalOpen && (<Modal setModalOpen={setModalOpen} do>FLICKR IMAGE</Modal>)} */}
			{ModalOpen && (
				<Modal setModalOpen={setModalOpen}>
					<Pic
						//Pic컴포넌트 src값으로 Flickr전체 배열에서 Index상태 순번의 정보값으로 _b 접미사의 큰 이미지 주소를 Pic에 전달해서 호출
						src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`}
						shadow
					/>
				</Modal>
			)}
			{/* {ModalOpen && (
				<Modal setModalOpen={setModalOpen} do>
					<img src={Index} alt='Selected' />
				</Modal>
			)} */}
		</>
	);
}

/*
모달안에 반복 이벤트가
*/
