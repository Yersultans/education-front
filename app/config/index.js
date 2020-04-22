import getEndpoints from './endpoints'

const S3credit = {
  bucketName: 'explorerpass-submission-assets',
  albumName: 'frontFileSubmit',
  region: 'Asia Pacific (Singapore)',
  accessKeyId: 'AKIA2WUGRGFCGQCOJZFS',
  secretAccessKey: '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'
}

const getBackendUrl = () => {
  if (!process.browser) {
    return process.env.BACKEND_URL || 'https://warm-cliffs-58797.herokuapp.com'
  }
  return (
    (window.env && window.env.BACKEND_URL) ||
    'https://warm-cliffs-58797.herokuapp.com'
  )
}

const getIsSaturday = () => {
  if (!process.browser) {
    return process.env.SATURDAY_KIDS
  }

  return window.env && window.env.SATURDAY_KIDS
}

const getChapterId = () => {
  if (!process.browser) {
    return process.env.CHAPTER_ID
  }

  return window.env && window.env.CHAPTER_ID
}

const getNodeEnv = () => {
  if (!process.browser) {
    return process.env.NODE_ENV
  }

  return window.env && window.env.NODE_ENV
}

const config = {
  getEndpoints,
  getBackendUrl,
  S3credit,
  getIsSaturday,
  getChapterId,
  getNodeEnv
}

export default config
