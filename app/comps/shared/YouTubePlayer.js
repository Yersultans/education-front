import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import YouTube from '@u-wave/react-youtube'

const Video = styled(YouTube)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`

function youtubeParser(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

const YoutubePlayer = ({ url }) => (
  <Video
    video={url}
    autoplay={false}
    showRelatedVideos={false}
    showInfo={false}
    annotations={false}
  />
)

YoutubePlayer.propTypes = {
  url: PropTypes.string.isRequired
}

export default YoutubePlayer
