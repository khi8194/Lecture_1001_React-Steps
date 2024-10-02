// import { FaYoutube } from 'react-icons/fa';
// import { FaInstagram } from 'react-icons/fa';
// import { FaEnvelope } from 'react-icons/fa';
import { FaYoutube, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
//React의 Link컴포넌트를 활용해서 메뉴이동처리 하면
//불필요한 서버요청 없이 미리 한번에 불러온 컴포넌트를 실시간으로 클라이언트단에서 변경처리 가능

export default function Header() {
	const gnbArr = ['members', 'gallery', 'youtube', 'contact', 'posts'];
	return (
		<header className='header'>
			{/* <h1>
				<a href='/'>ALPACO</a>
			</h1>

			<nav>
				<ul className='gnb'>
					<li>
						<a href='/members'>MEMBERS</a>
					</li>
					<li>
						<a href='/gallery'>GALLERY</a>
					</li>
					<li>
						<a href='/youtube'>YOUTUBE</a>
					</li>
					<li>
						<a href='/contact'>CONTACT</a>
					</li>
					<li>
						<a href='/posts'>POSTS</a>
					</li>
				</ul> */}

			<h1>
				<Link to={'/'}>ALPACO</Link>
			</h1>

			<nav>
				{/* <ul className='gnb'>
					<li>
						<Link to={'/members'}>MEMBERS</Link>
					</li>
					<li>
						<Link to={'/gallery'}>GALLERY</Link>
					</li>
					<li>
						<Link to={'/youtube'}>YOUTUBE</Link>
					</li>
					<li>
						<Link to={'/contact'}>CONTACT</Link>
					</li>
					<li>
						<Link to={'/posts'}>POSTS</Link>
					</li>
				</ul> */}
				<ul className='gnb'>
					{gnbArr.map((data, idx) => {
						return (
							<li key={idx}>
								<Link to={'/' + data}>{data.toUpperCase()}</Link>
							</li>
						);
					})}
				</ul>

				<ul className='sns'>
					<li>
						<FaYoutube />
					</li>
					<li>
						<FaInstagram />
					</li>
					<li>
						<FaEnvelope />
					</li>
				</ul>
			</nav>
		</header>
	);
}
