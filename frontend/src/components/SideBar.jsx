import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {
  MdHome,
  MdAssignment,
  MdSettings,
  MdPeople,
  MdBusiness,
  MdInsertChart,
  MdCloudUpload,
} from 'react-icons/md'
import React from 'react'
import SideBarIcon from './SideBarIcon'
import DarkModeButton from '../components/DarkModeButton'

const Sidebar = () => {
  const location = useLocation()
  return (
    <div className="sidebar list-none min-h-screen">
      <li className="mb-12">
        <DarkModeButton />
      </li>

      <li>
        <NavLink to="/">
          <SideBarIcon
            icon={<MdHome />}
            text={'dashboard'}
            isActive={location.pathname === '/'}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/sales-invoices">
          <SideBarIcon
            icon={<MdAssignment />}
            text={'sales invoices'}
            isActive={location.pathname === '/sales-invoices'}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/purchase-invoices">
          <SideBarIcon
            icon={<MdBusiness />}
            text={'purchase invoices'}
            isActive={location.pathname === '/purchase-invoices'}
          />
        </NavLink>
      </li>
      {/* I want to make this a drop down */}
      <li>
        <NavLink to="/people">
          <SideBarIcon
            icon={<MdPeople />}
            text={'people'}
            isActive={location.pathname === '/people'}
          />
          <div
            className="absolute w-auto p-2 m-4 min-w-max hidden left-24 rounded-md 
    shadow-md text-white bg-main-purple text-lg font-bold transition-all
     duration-300 origin-left dark:bg-white dark:text-main-table"
          >
            sub menu items
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/upload">
          <SideBarIcon
            icon={<MdCloudUpload />}
            text={'upload'}
            isActive={location.pathname === '/upload'}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/analytics">
          <SideBarIcon
            icon={<MdInsertChart />}
            text={'analytics'}
            isActive={location.pathname === '/analytics'}
          />
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings">
          <SideBarIcon
            icon={<MdSettings />}
            text={'settings'}
            isActive={location.pathname === '/settings'}
          />
        </NavLink>
      </li>
    </div>
  )
}

export default Sidebar
