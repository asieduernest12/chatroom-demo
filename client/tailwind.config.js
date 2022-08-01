module.exports = {
	important: true,
	mode: 'jit',
  content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  options: { whitelistPatterns: [/^bg-/, /^overflow-/] },
	theme: {
		extend: {},
	},
	plugins: [],
};
