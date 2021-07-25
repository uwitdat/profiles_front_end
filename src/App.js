import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';
import ListItem from './components/ListItem';


function App() {
  const [students, setStudents] = useState([])
  const [searchText, setSearchText] = useState('')
  const url = 'https://api.hatchways.io/assessment/students'

  const [tagSearch, setTagSearch] = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsRes = await axios.get(url)
      setStudents(studentsRes.data.students)
    }
    fetchStudents()
  }, [])

  const calcAverage = (array) => array.reduce((a, b) => parseInt(a) + parseInt(b)) / array.length;

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
          let [fName, lName] = [student.firstName.toLowerCase(), student.lastName.toLowerCase()];
          let includesSearch = fName.includes(searchText.toLowerCase()) || lName.includes(searchText.toLowerCase())

          return searchText === '' ? student : (includesSearch ? student : null)
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
          <ListItem key={i} tagSearch={tagSearch} student={student} setStudents={setStudents} i={i} calcAverage={calcAverage} />
        ))}
      </div>
    </div>
  );
}

export default App;
