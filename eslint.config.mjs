// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import fs from 'node:fs'

const componentsDir = './app/components'
const featureDirs = fs.existsSync(componentsDir)
  ? fs.readdirSync(componentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name !== 'shared')
      .map(dirent => dirent.name)
  : []

const sharedZones = [
  {
    target: './app/components/shared/atoms/**/*.vue',
    from: './app/components',
  },
  {
    target: './app/components/shared/molecules/**/*.vue',
    from: './app/components/shared/molecules',
  },
  {
    target: './app/components/shared/molecules/**/*.vue',
    from: './app/components/shared/organisms',
  },
  {
    target: './app/components/shared/molecules/**/*.vue',
    from: './app/components/shared/templates',
  },
  {
    target: './app/components/shared/organisms/**/*.vue',
    from: './app/components/shared/organisms',
  },
  {
    target: './app/components/shared/organisms/**/*.vue',
    from: './app/components/shared/templates',
  },
  {
    target: './app/components/shared/templates/**/*.vue',
    from: './app/components/shared/atoms',
  },
  {
    target: './app/components/shared/templates/**/*.vue',
    from: './app/components/shared/templates',
  },
]

for (const feature of featureDirs) {
  sharedZones.push({
    target: './app/components/shared/**/*.vue',
    from: `./app/components/${feature}`,
  })
}

const featureZones = []
for (const feature of featureDirs) {
  const basePath = `./app/components/${feature}`

  featureZones.push(
    { target: `${basePath}/atoms/**/*.vue`, from: `${basePath}/molecules` },
    { target: `${basePath}/atoms/**/*.vue`, from: `${basePath}/organisms` },
    { target: `${basePath}/atoms/**/*.vue`, from: `${basePath}/templates` },
    { target: `${basePath}/atoms/**/*.vue`, from: `${basePath}/atoms` },
    { target: `${basePath}/atoms/**/*.vue`, from: './app/components/shared/molecules' },
    { target: `${basePath}/atoms/**/*.vue`, from: './app/components/shared/organisms' },
    { target: `${basePath}/atoms/**/*.vue`, from: './app/components/shared/templates' },
  )

  featureZones.push(
    { target: `${basePath}/molecules/**/*.vue`, from: `${basePath}/molecules` },
    { target: `${basePath}/molecules/**/*.vue`, from: `${basePath}/organisms` },
    { target: `${basePath}/molecules/**/*.vue`, from: `${basePath}/templates` },
    { target: `${basePath}/molecules/**/*.vue`, from: './app/components/shared/organisms' },
    { target: `${basePath}/molecules/**/*.vue`, from: './app/components/shared/templates' },
  )

  featureZones.push(
    { target: `${basePath}/organisms/**/*.vue`, from: `${basePath}/organisms` },
    { target: `${basePath}/organisms/**/*.vue`, from: `${basePath}/templates` },
    { target: `${basePath}/organisms/**/*.vue`, from: './app/components/shared/templates' },
  )

  featureZones.push(
    { target: `${basePath}/templates/**/*.vue`, from: `${basePath}/atoms` },
    { target: `${basePath}/templates/**/*.vue`, from: `${basePath}/templates` },
    { target: `${basePath}/templates/**/*.vue`, from: './app/components/shared/atoms' },
    { target: `${basePath}/templates/**/*.vue`, from: './app/components/shared/templates' },
  )

  for (const otherFeature of featureDirs) {
    if (otherFeature !== feature) {
      featureZones.push({ target: `${basePath}/**/*.vue`, from: `./app/components/${otherFeature}` })
    }
  }
}

export default withNuxt({
  rules: {
    'vue/block-order': ['error', {
      order: ['script', 'template', 'style'],
    }],
    'vue/component-api-style': ['error',
      ['script-setup'],
    ],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    'no-console': 'warn',
    'import/no-restricted-paths': ['error', {
      basePath: './',
      zones: [...sharedZones, ...featureZones],
    }],
  },
})
