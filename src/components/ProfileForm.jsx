import React from 'react'

const ProfileForm = ({ profile, setProfile, handleSubmit }) => {
  return (
    <div className='form__container'>
      <h3 className='form__title'>Add a new profile</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='input'
          placeholder='First name'
          required='true'
          value={profile.firstName}
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        />
        <input
          type='text'
          className='input'
          placeholder='Last name'
          required='true'
          value={profile.lastName}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
        <input
          type='email'
          className='input'
          placeholder='Email'
          required='true'
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <input
          type='test'
          className='input'
          placeholder='Enter your age'
          required='true'
          value={profile.age}
          onChange={(e) => setProfile({ ...profile, age: e.target.value })}
        />
        <input
          type='text'
          className='input'
          placeholder='Paste an image URL'
          required='true'
          value={profile.avatar}
          onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
        />
        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}

export default ProfileForm
