import { useState } from 'react'
import config from 'util/config'
import delay from 'util/delay'

export default function useProjectLaunch({ currentUid }) {
  const [projectLaunchStatus, setProjectLaunchStatus] = useState('ready')

  const launchProject = nextUid => {
    const isNew = nextUid !== currentUid
    const update = setProjectLaunchStatus
    if (isNew) {
      update('transitioning')
      delay(config.projectLaunchDur)
        .then(() => {
          update('afterload')
          return delay(config.afterLaunchDur)
        })
        .then(() => {
          update('ready')
        })
    }
  }

  return { projectLaunchStatus, launchProject }
}
