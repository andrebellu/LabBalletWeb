import adapter from '@sveltejs/adapter-cloudflare';

export default {
	kit: {
		env: {
			dir: process.env.ENV_DIR || './'
		},
		prerender: {
			handleHttpError: ({ path, status }) => {
				if (path.startsWith('/images/') && status === 404) {
					return;
				}
				throw new Error(`Unexpected ${status} on ${path}`);
			}
		},
		adapter: adapter({
			config: undefined,
			platformProxy: {
				configPath: undefined,
				environment: undefined,
				persist: undefined
			},
			fallback: 'plaintext',
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		})
	}
};