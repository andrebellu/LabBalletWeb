import adapter from '@sveltejs/adapter-cloudflare';

export default {
	kit: {
		prerender: {
			handleHttpError: ({ path, status }) => {
				if (path.startsWith('/images/') && status === 404) {
					return;
				}
				throw new Error(`Unexpected ${status} on ${path}`);
			}
		},
		adapter: adapter({
			// See below for an explanation of these options
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