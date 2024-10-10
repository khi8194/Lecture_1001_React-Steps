import Layout from '../common/Layout';
import memberData from '../../data/memberData';
import Pic from '../common/Pic';
import { useRef, useState } from 'react';
import MaskBox from '../common/MaskBox';

/*
참조객체에 가상돔을 담아 활용하는 패턴
1. useRef로 빈 참조객체 생성
2. 원하는 가상돔요소 (JSX El) ref속성으로 참조객체 연결
3. 참조객체명.current로 해당요소를 가져와서 제어
*/

export default function Members() {
	console.log('Member rendered!!');

	const refEl = useRef(0);
	const [Num, setNum] = useState(0);

	const changeRef = () => {
		console.log('changeRef called!!');
		refEl.current = 1;
	};

	const changeState = () => {
		console.log('changeState called!!');
		setNum(Num + 1);
	};

	return (
		<Layout title={'MEMBERS'}>
			<article className='ceoBox'>
				<div className='txt'>
					<h2>{memberData[0].name}</h2>
					<p>{memberData[0].position}</p>
				</div>
				{/* <Pic className='pic' src={'/' + memberData[0].pic} shadow /> */}

				{/* MaskBox 안쪽에 Pic요소가 들어갈 경우 shadow속성 적용 불가: Mask frame자체가 내부 요소를 overflow:hidden 처리하기 때문 */}
				<MaskBox style={{ width: '50%', height: '65vh' }} delay={1}>
					{/* 직접 style객체를 props로 전달하여 불필요한 scss구문 추가 없이 스타일 적용 */}
					<Pic style={{ width: '100%', height: '100%' }} src={'/' + memberData[0].pic} />
				</MaskBox>
			</article>

			<article className='memberListBox'>
				<div className='titBox'>
					<h2 onClick={changeRef}>Our Team Member</h2>

					<p onClick={changeState}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, iste accusantium! Eum corrupti voluptates
						natus! Harum dolorum reprehenderit modi nostrum?
					</p>
				</div>

				<ul>
					{memberData.map((member, idx) => {
						if (idx !== 0) {
							return (
								<li key={idx}>
									<Pic src={member.pic} className='pic' shadow={true} />
									<div className='txt'>
										<h2>{member.name}</h2>
										<p>{member.position}</p>
									</div>
								</li>
							);
						}
					})}
				</ul>

				<div className='descBox'>
					<h2>Lorem ipsum dolor sit.</h2>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. A esse cupiditate, vitae deleniti repellat
						explicabo sit, corrupti beatae dicta, nulla optio corporis alias. Perferendis quidem sapiente minima,
						quisquam inventore soluta.
					</p>
				</div>
			</article>
		</Layout>
	);
}

/*
state
-컴포넌트가 재랜더링 되더라도 값이 사라지지 않고 계속 유지 (이전값을 기억하면서 재활용가능)
-해당값이 변경되면 자동으로 컴포넌트가 재랜더링됨
-사용예: JSX뱐호와 관련된 모든값은 state에 담아줌, 서버데이터, 모달을 열기위한 불린값, 목록클릭시 변경되야 되는 순서값

useRef
-컴포넌트가 재랜더링 되더라도 값이 사라지지 않고 계속 유지 (이전값을 기억하면서 재활용가능)
-해당값이 변경되더라도 컴포넌트를 재랜더링시키지 않음
-사용예1: 화면의 랜더링과 직접적인 연관은 없지만 로직활용시 유지되야되는 값
-사용예2: 브라우저 리사이즈시 갱신되야되는 브라우저의 폭, 스크롤시 갱신해야 되는 현재 스크롤 위치

컴포넌트 함수가 재랜더링(재호출)되더라도 State와 useRef의 값을 기억할 수 있는 이유 
-자바스크립트 lexical scope가 클로저(closure)환경을 기반으로 하고 있기 때문 
*/
