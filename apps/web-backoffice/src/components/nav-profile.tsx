import { EditOutlined, LogoutOutlined } from "@ant-design/icons"
import { Dropdown, Menu } from "antd"
import { deleteToken } from "firebase/messaging"
import { useLocation, useNavigate } from "react-router-dom"
import AvatarInfo from "src/components/avatar-info"
import firebaseService from "src/services/firebase-service"

const MY_PROFILE_PATH = "/app/my-profile"

export const NavProfile = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onSignOut = async () => {
    await firebaseService.auth.signOut()
    await deleteToken(firebaseService.messaging)
  }

  return (
    <Dropdown
      placement="bottomRight"
      trigger={["click"]}
      forceRender
      overlay={
        // NOTE: Do not extract this into another component as it will cause the menu not to close on click
        <Menu
          selectedKeys={[pathname]}
          items={[
            {
              key: MY_PROFILE_PATH,
              label: "Edit Profile",
              icon: <EditOutlined size={500} />,
              onClick: () => navigate(MY_PROFILE_PATH),
            },
            {
              key: "SignOut",
              label: "Sign out",
              icon: <LogoutOutlined />,
              onClick: () => onSignOut(),
            },
          ]}
        />
      }
    >
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <a onClick={e => e.preventDefault()} className="leading-normal">
        <AvatarInfo title="name" subTitle="Roles" photoUrl="" reverse />
      </a>
    </Dropdown>
  )
}

export default NavProfile
