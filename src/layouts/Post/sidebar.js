import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import Newsletter from '../../fragments/Newsletter'
import styles from './sidebar.css'

const propTypes = {
  children: PropTypes.any
}

export default class Sidebar extends React.Component {
  static hasLoadingState = true
  constructor(props, context) {
    super(props, context)

    this.handleScroll = this.handleScroll.bind(this)

    this.scrolling = false
  }
  componentDidMount() {
    this.sidebar = document.getElementById('sidebar')
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll(e) {
    if (this.scrolling) {
      return
    }
    requestAnimationFrame(() => {
      this.scrolling = true
      let st = window.pageYOffset || document.documentElement.scrollTop

      if (st > 70) {
        this.sidebar.style.top = '0'
      } else {
        this.sidebar.style.top = 70 - st + 'px'
      }

      this.scrolling = false
    })
  }
  render() {
    return (
      <div id='sidebar' className={styles.sidebar}>
        <div className={styles.aboutBlog}>
          <h2><Link to='/blog'>Serverless Blog</Link></h2>
          <h3>The blog on serverless & event driven compute</h3>
        </div>

        <div className={styles.getStarted}>
          <h3>New to serverless?</h3>
          <p>To get started, pop open your terminal & run</p>
          <pre>
        <code className={styles.code}>
        npm install serverless -g
        </code>
      </pre>
          <p className={styles.continue}>
            <Link to='/framework/docs/getting-started/'>
              how? learn more
            </Link>
          </p>
        </div>

        <div className={styles.quickLinks}>
          <h3>Resources & Links</h3>
          <div className={styles.sidebarLinks}>
            <Link to='/framework/docs'>
              Documentation
            </Link>
          </div>
          <div className={styles.sidebarLinks}>
            <a href='https://github.com/serverless/examples' target='_blank' rel='noopener noreferrer'>
              Serverless examples
            </a>
          </div>
          <div className={styles.sidebarLinks}>
            <a href='https://github.com/serverless/plugins' target='_blank' rel='noopener noreferrer'>
              Serverless plugins
            </a>
          </div>
          <div className={styles.sidebarLinks}>
            <a href='https://gitter.im/serverless/serverless' target='_blank' rel='noopener noreferrer'>
              Chat in Gitter
            </a>
          </div>
          <div className={styles.sidebarLinks}>
            <a href='http://forum.serverless.com' target='_blank' rel='noopener noreferrer'>
              Engage on the Forum
            </a>
          </div>
        </div>
        <div className={styles.subscribe}>
          <h3>
            Subscribe
          </h3>
          <p>
            Join 12,000+ other serverless devs & keep up to speed on the latest serverless trends
          </p>
        </div>
        <Newsletter className={styles.stacked} buttonText={'Get Updates'} black />
      </div>
    )
  }
}

Sidebar.propTypes = propTypes