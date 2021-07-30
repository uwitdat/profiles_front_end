import './App.css';
import { useEffect, useState } from 'react'
import ListItem from './components/ListItem';
import ProfileForm from './components/ProfileForm';



function App() {
  const [students, setStudents] = useState([])
  const [searchText, setSearchText] = useState('')
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    avatar: '',
    interests: []
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
          <ListItem key={i} profile={profile} setProfile={setProfile} tagSearch={tagSearch} student={student} setStudents={setStudents} students={students} i={i} />
        ))}
      </div>
      <ProfileForm profile={profile} setProfile={setProfile} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
