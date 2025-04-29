const presets = [
  [
    '@babel/preset-env',
    {
      corejs: 3,
      targets: 'last 2 years, not dead',
      useBuiltIns: 'entry',
    },
  ],
];

module.exports = { presets };
