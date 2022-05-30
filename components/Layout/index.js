import styles from './Layout.module.css'

const Layout = (props) => {
  const className = props?.className ? props.className : ''

  return (
    <div
      dir={'rtl'}
      lang={'ar'}
      className={`${styles.layout} d-flex flex-column flex-fill bg-layout ${className}`}
    >
      {props.children}
    </div>
  )
}

export default Layout
