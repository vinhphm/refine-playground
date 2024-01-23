import type { AuthProps } from '@refinedev/antd'
import { AuthPage as AntdAuthPage } from '@refinedev/antd'
import { Link } from 'react-router-dom'

const authWrapperProps = {
  style: {
    background:
            'radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url(\'images/login-bg.png\')',
    backgroundSize: 'cover',
  },
}

function renderAuthContent(content: React.ReactNode) {
  return (
    <div
      style={{
        maxWidth: 408,
        margin: 'auto',
      }}
    >
      <Link to="/">
        <img
          style={{ marginBottom: 26 }}
          src="/images/fine-foods-login.svg"
          alt="Logo"
          width="100%"
        />
      </Link>
      {content}
    </div>
  )
}

export const AuthPage = ({ type, formProps }: AuthProps) => {
  return (
    <AntdAuthPage
      type={type}
      wrapperProps={authWrapperProps}
      renderContent={renderAuthContent}
      formProps={formProps}
    />
  )
}
