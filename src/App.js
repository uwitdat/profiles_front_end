import './App.css';
import { useEffect, useState } from 'react'
import ListItem from './components/ListItem';


function App() {
  const [students, setStudents] = useState([])
  const [searchText, setSearchText] = useState('')
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



  return (
    <div className='main__container'>
      <div className='students__container'>

        <input
          type='text'
          className='search__input'
          placeholder='Search by name'
          value={searchText}
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
    </div>
  );
}

export default App;
