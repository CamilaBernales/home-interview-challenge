import Link from 'next/link';
import Page from './[path]';

const ConfigurationModel = require('../models/inputs.json');
export default function Index() {
	return (
		<div>
			<ul>
				<li>
					<Link href='/login' as='/login'>
						<a>login</a>
					</Link>
				</li>
				<li>
					<Link href='/register' as='/register'>
						<a>register</a>
					</Link>
				</li>
			</ul>
		</div>
	);
}
