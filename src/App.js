import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';
import ListItem from './components/ListItem';


function App() {
  const [students, setStudents] = useState([])
  const [searchText, setSearchText] = useState('')
  const url = 'https://api.hatchways.io/assessment/students'

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

        />

        {students.filter((student) => {
          let [fName, lName] = [student.firstName.toLowerCase(), student.lastName.toLowerCase()];
          let includesSearch = fName.includes(searchText.toLowerCase()) || lName.includes(searchText.toLowerCase())

          return searchText === '' ? student : (includesSearch ? student : null)
        }).map((student, i) => (
          <ListItem student={student} i={i} calcAverage={calcAverage} />
        ))}
      </div>
    </div>
  );
}

export default App;
