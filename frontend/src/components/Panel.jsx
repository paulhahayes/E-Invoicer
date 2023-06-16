/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import classNames from 'classnames'
function Panel({ children, className, ...rest }) {
  const finalClassName = classNames('border shadow w-full', className)
  return (
    <div {...rest} className={finalClassName}>
      {children}
    </div>
  )
}

export default Panel
