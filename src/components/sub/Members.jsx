import Layout from '../common/Layout';
// import Title from '../common/Title';
import memberData from '../../data/memberData';

export default function Members() {
	console.log(memberData);
	return (
		<Layout title={'MEMBERS'}>
			{/* <p>Members Page contents come here.</p> */}

			{/* 
			<div className="pic">
				<img src="이미지" alt="" />
			</div>
			<div className="txt">
				<h2>사람 이름</h2>
				<p>직책</p>
			</div> */}

			{/* 미션: 위의 구조로 반복 출력하도록 배열과 .map 함수를 이용해서 구현 */}

			{/* {memberData.map((member, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img src={'/' + member.pic} alt={member.name} />
						</div>
						<div className='txt'>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</div>
					</article>
				);
			})} */}

			{/* 첫번째 데이터만 뽑아서 출력 */}
			<article className='ceoBox'>
				<div className='txt'>
					<h2>{memberData[0].name}</h2>
					<p>{memberData[0].position}</p>
				</div>
				<div className='pic'>
					<img src={'/' + memberData[0].pic} alt={memberData[0].name} />
				</div>
			</article>
			<article className='memberListbox'>
				<ul>
					{memberData.map((member, idx) => {
						//첫번째 순번의 데이터가 아닐때에만 반복출력
						if (idx !== 0) {
							return (
								<li key={idx}>
									<div className='pic'>
										<img src={'/' + member.pic} alt={member.name} />
									</div>
									<div className='txt'>
										<h2>{member.name}</h2>
										<p>{member.position}</p>
									</div>
								</li>
							);
						}
					})}
				</ul>
			</article>
		</Layout>
	);
}

//미션
//위의 7개 배열 중에서 첫번째 데이터만 .ceoBox안쪽 출력
//첫번쨰를 제외한 나머지 6개 데이터만 기존 반복문 구문 안에서 출력
