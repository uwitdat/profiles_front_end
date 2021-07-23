import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {

  const [students, setStudents] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsRes = await axios.get('https://api.hatchways.io/assessment/students')
      setStudents(studentsRes.data.students)
    }
    fetchStudents()
  }, [])

  const calcAverage = (array) => array.reduce((a, b) => parseInt(a) + parseInt(b)) / array.length;

  const searchStudents = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div className='main__container'>
      <div className='students__container'>
        <input
          type='text'
          className='search__input'
          placeholder='Search by name'
          value={searchText}
          onChange={searchStudents}
        />

        {students.map((student) => (
          <div className="students" key={student.id}>
            <div className='image__container'>
              <img className='students__image' src={student.pic} alt="avatar of various students"></img>
            </div>
            <div className='text__container'>
              <h3 className='students__title'>{student.firstName} {student.lastName}</h3>
              <p>Email: {student.email}</p>
              <p>Company: {student.company}</p>
              <p>Skill: {student.skill}</p>
              <p>Average: {calcAverage(student.grades)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
