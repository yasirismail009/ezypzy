import React from 'react'
import HomePage from './HomePage'
import Story from './StorySection'
import styles from './Homepage.module.css'
import Feature from './FeatureSection'

export default function Index() {
  return (
    <div className={styles.landingPage}>
        <HomePage/>
        <Story/>
        <Feature/>
    </div>
  )
}
