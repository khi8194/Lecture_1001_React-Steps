/*
import { useLocation } from 'react-router-dom';
import useSplitText from '../../hooks/useSplitText';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MaskText from './MaskText';

export default function Layout({ title, children }) {
	const ref_title = useRef(null);
	const splitText = useSplitText();
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');

	useEffect(() => {
		splitText(ref_title, { interval: 0.1 });
	}, [splitText]);
	//useEffect에 의존성 배열에 특정 값을 등록하라고 뜨는 경우
	//해당 컴포넌트자체적으로 제어되지 않는 요소가 useEffect안쪽에서 활용되고 있을때 등록하라는 권고 사항 출력
	//해결 방법: 등록 처리 (잘못등록하면 재귀적호출 되면서 무한호출 문제)
	//무한호출시 해결방법 : useMemo, useCallback등의 메모이제이션 훅을 이용해서 강제로 메모리에 등록후 사용

	return (
		<main className={isDetail ? 'detail' : title.toLowerCase()}>
			<h1 ref={ref_title}>{title}</h1>

			<MaskText duration={1} delay={0} color={'#000'}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad?
			</MaskText>
			<br />

			<MaskText duration={0.6} delay={1} color={'#555'}>
				Lorem ipsum dolor
			</MaskText>

			<motion.section
				initial={{ opacity: 0, y: 200 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 200, transition: { delay: 0 } }}
				transition={{ duration: 1, delay: 0.7, ease: 'linear' }}>
				{children}
			</motion.section>
		</main>
	);
}
*/
import { motion } from 'framer-motion';
import Mask from './Mask';

export default function MaskBox({ children, duration = 0.5, delay = 0, color = '#000', style }) {
	//styles
	const frameStyle = {
		display: 'inline-block',
		position: 'relative',
		overflow: 'hidden'
	};
	const maskStyle = {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		backgroundColor: color
	};

	//motion options
	/*
	const motionBox = {
		in: { opacity: 0 },
		on: { opacity: 1 },
		out: { opacity: 0, transition: { delay: 0 } },
		time: { duration: 0.01, delay: duration / 2 + delay }
	};
	*/
	const { init, active, end, time } = {
		init: { opacity: 0 },
		active: { opacity: 1 },
		end: { opacity: 0, transition: { delay: 0 } },
		time: { duration: 0.01, delay: duration / 2 + delay }
	};

	return (
		<div style={{ ...frameStyle, ...style }}>
			{/* <motion.div
				style={{ width: '100%', height: '100%' }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0 } }}
				transition={{ duration: 0.01, delay: duration / 2 + delay }}>
				{children}
			</motion.div> */}

			{/* children으로 전달된 요소가 block요소이기 때문 내부 wrapper요소도 div처리 */}
			{/* <motion.div
				style={{ width: '100%', height: '100%' }}
				variants={motionBox}
				initial='in'
				animate='on'
				exit='out'
				transition={motionBox.time}> */}
			<motion.div
				style={{ width: '100%', height: '100%' }}
				initial={init}
				animate={active}
				exit={end}
				transition={time}>
				{children}
			</motion.div>

			<motion.div
				style={maskStyle}
				initial={{ x: '-101%' }}
				animate={{ x: '101%' }}
				transition={{ duration, delay, ease: 'linear' }}></motion.div>

			<Mask duration={duration} delay={delay} color={color} />
		</div>
	);
}

/*
	미션 (10시 50분까지 구현)
	- 현재 MaskText, MaskBox, 페이지전체(추후 적용예정)에 공통으로 Mask형태의 모션 요소를 활용하고 있음
	- 해당 마스크 기능만 별도의 컴포넌트로 분리해서 재활용하는 것이 유리
	- 수행 작업 1. Mask컴포넌트를 따로 Mask.jsx형태로 생성
	- 수행 작업 2. Mask컴포넌트를 MaskText.jsx,  MaskBox.jsx에 각각 호출해서 코드 정리
*/
