import React from 'react'
// import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const ProfilePage = () => {
  const location = useLocation()
  const userDetails = location.state.userDetails  
  const navigate = useNavigate()

  const navigateToLogout = () => {
    navigate('/logout')
  }

  // Rest of the component

  return (
    <div className='mt-10 h-full'>
      <div className='h-full'>
        <h1 className='text-2xl font-bold ml-[350px] mr-[350px]'>Profile Details</h1>
        <div className= 'border-1 border-gray-300 rounded-md h-3/4 ml-80 mr-80 p-[25px] pl-10 pr-14 mt-3'>
          <div className='flex justify-between'>     
            <div className='mb-4'>
              <div className='text-sm font-bold text-gray-500 mb-2'>Username</div>
              <div className='text-xl font-bold'>{userDetails.userId}</div>
            </div>
            <div className='mb-4'>
              <div className='text-sm font-bold text-gray-500 mb-2'>Who can see this?</div>
              <div className='text-lg'>Only you</div>
            </div>
          </div>
          <div className='flex justify-between'>     
            <div className='mb-4'>
              <div className='text-sm font-bold text-gray-500 mb-2'>Name</div>
              <div className='text-xl font-bold'>{userDetails.name}</div>
            </div>
            <div className='mb-4'>
              <div className='text-sm font-bold text-gray-500 mb-2'>Who can see this?</div>
              <div className='text-lg'>Only you</div>
            </div>
          </div>
          <div className='flex justify-between'>     
            <div className='mb-4'>
              <div className='text-sm font-bold text-gray-500 mb-2'>Email</div>
              <div className='text-xl font-bold'>{userDetails.email}</div>
            </div>
            <div className='mb-4'>
              <div className='text-sm font-bold text-gray-500 mb-2'>Who can see this?</div>
              <div className='text-lg'>Only you</div>
            </div>
          </div>
          <div className='flex justify-between'>     
            <div className='mb-4'>
              <div className='text-sm font-bold text-gray-500 mb-2'>Company</div>
              <div className='text-xl font-bold'>{userDetails.companyName}</div>
            </div>
            <div className='mb-4'>
              <div className='text-sm font-bold text-gray-500 mb-2'>Who can see this?</div>
              <div className='text-lg'>Only you</div>
            </div>
          </div>
          <button
            className='text-xl font-bold text-white bg-main-purple rounded-sm p-2 mt-24 w-full hover:bg-violet-900'
            onClick={navigateToLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

// ProfilePage.propTypes = {
//   userDetails: PropTypes.shape({
//     userId: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     companyName: PropTypes.string.isRequired,
//     tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
//     hash: PropTypes.string.isRequired,
//   }).isRequired,
// }
