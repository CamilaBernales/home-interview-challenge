import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Index() {
	return (
		<div className="container my-5">
			<h1>Welcome</h1>
			<h3 className="my-4">
				Please if you are new,
				<Link href='/register' as='/register'>
					<a> please sign up</a>
				</Link>
			</h3>
			<h3 className="my-4">
				If you alredy have an account, please{' '}
				<Link href='/login' as='/login'>
					<a>login</a>
				</Link>
			</h3>
		</div>
	);
}
