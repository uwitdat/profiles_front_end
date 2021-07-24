import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';



function App() {

  const [students, setStudents] = useState([])
  const [searchText, setSearchText] = useState('')
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsRes = await axios.get('https://api.hatchways.io/assessment/students')
      setStudents(studentsRes.data.students)
    }
    fetchStudents()
  }, [])

  const calcAverage = (array) => array.reduce((a, b) => parseInt(a) + parseInt(b)) / array.length;

  const makeHandleClick = i => () => {
    setOpenIndex(i === openIndex ? -1 : i);
    console.log(i)

  };

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

        {students.filter((student) => {
          if (searchText === '') {
            return student
          } else if (student.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchText.toLowerCase())) {
            return student
          }
        }).map((student, i) => (
          <div className="students" key={student.id}>
            <div className='image__container'>
              <img className='students__image' src={student.pic} alt="avatar of various students"></img>
            </div>
            <div className='text__container'>
              <h3 className='students__title'>{student.firstName} {student.lastName}
                <span onClick={makeHandleClick(i)} className='plus-minus'>
                  {openIndex === i ? '\u2795' : '\u2796'}
                </span></h3>

              <p>Email: {student.email}</p>
              <p>Company: {student.company}</p>
              <p>Skill: {student.skill}</p>
              <p>Average: {calcAverage(student.grades)}%</p>
              <ul className={`grades__list`}>
                {openIndex === i ?
                  student.grades.map((grade, idx) => (
                    <li key={idx}>Test {idx + 1}: <span className='grades__span'>{grade}%</span></li>
                  ))
                  :
                  null}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
