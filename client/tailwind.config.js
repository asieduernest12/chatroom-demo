module.exports = {
	important: true,
	mode: 'jit',
	purge: {
		content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
		options: { whitelistPatterns: [/^bg-/] },
	},
	theme: {
		extend: {},
	},
	plugins: [],
};
