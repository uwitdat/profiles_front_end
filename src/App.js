import './App.css';
import { useEffect, useState } from 'react'
import ListItem from './components/ListItem';



function App() {
  const [students, setStudents] = useState([])
  const [searchText, setSearchText] = useState('')
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    avatar: ''
  })
  const url = 'http://localhost:3001/profiles'


  const [tagSearch, setTagSearch] = useState('')


  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        await fetch(url)
          .then(res => res.json())
          .then(data => setStudents(data))
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchProfiles()
  }, [])

  const clearFields = () => {
    setProfile({
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
      avatar: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          age: profile.age,
          avatar: profile.avatar
        })
      }).then(res => {
        return res.json()
      })
        .then(data => setStudents([...students, data]))
      clearFields()
    } catch (err) {
      console.log('ERROR', err.message)
    }
  }

  return (
    <div className='main__container'>
      <div className='students__container'>

        <input
          type='text'
          className='search__input'
          placeholder='Search by name'
          value={searchText}
          name='firstName'
          onChange={(e) => setSearchText(e.target.value)}
        />

        <input
          type='text'
          className='search__input'
          placeholder='Search by tag'
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}

        />

        {students.filter((student) => {
          let fullName = student.firstName.toLowerCase() + student.lastName.toLowerCase();
          return searchText !== "" ? (fullName.includes(searchText.split(" ").join("")) ? student : null) : student;

        }).filter((student) => {
          if (tagSearch !== "") {
            let results = student.tags.map((tag) => {
              return tag.includes(tagSearch)
            })
            return results.includes(true) ? student : null;
          } else {
            return student;
          }

        }).map((student, i) => (
          <ListItem key={i} tagSearch={tagSearch} student={student} setStudents={setStudents} i={i} />
        ))}
      </div>
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
            type='number'
            className='input'
            placeholder='Age'
            required='true'
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
          />
          <input
            type='text'
            className='input'
            placeholder='Avatar'
            required='true'
            value={profile.avatar}
            onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
          />
          <button className='btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
