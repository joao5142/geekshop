module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // 0: disable，1: warning，2: error
      'always', // always | never
      [
        'build', // build workflow change
        'chore', // dependencies
        'ci', // ci/di workflow change
        'docs', // doc change
        'feat', // new feature
        'fix', // bug solve
        'perf', // improve performance
        'refactor', // refactor
        'revert', // roll back
        'style', // code style change or code format
        'test', // adds or modifies test
        'stage', // temporary stage
      ],
    ],
  },
}
