import { useState, useEffect } from 'react';

const ListItem = ({ student, i }) => {
  const [openIndex, setOpenIndex] = useState([]);
  const [tag, setTag] = useState('')
  const [tagArray, setTagArray] = useState([])
  const [studentObj, setStudentObj] = useState(student)

  useEffect(() => {
    if (!student.tags) {
      let newStudentObj = studentObj;
      newStudentObj.tags = tagArray
      student = newStudentObj
      setStudentObj(student)
    }
  }, [studentObj, tagArray])

  const makeHandleClick = (i) => {
    if (openIndex.includes(i)) {
      setOpenIndex(openIndex.filter(item => item !== i))
    } else {
      setOpenIndex(newArray => [...newArray, i]);
    }
  }

  const handleOnChange = (e) => {
    const newValue = e.target.value
    setTag(newValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTagArray(tagArrayClone => [...tagArrayClone, tag])
    let newStudentObj = student;
    newStudentObj.tags.push(tag);
    setStudentObj(prevState => ({ ...prevState, newStudentObj }))
    setTag('')
  }

  return (
    <div className="students" key={student.id}>
      <div className='image__container'>
        <img className='students__image' src={student.avatar} alt="avatar of various students"></img>
      </div>
      <div className='text__container'>
        <h3 className='students__title'>{student.firstName} {student.lastName}
          <span onClick={() => makeHandleClick(i)} className='plus-minus'>
            {openIndex.includes(i) ? '\u2796' : '\u2795'}
          </span></h3>

        <p>Email: {student.email}</p>
        <p>Age: {student.age}</p>
        <p>Interests: {student.skill}</p>

        <ul className={`grades__list`}>
          {openIndex.includes(i) ?
            student.interests.map((interest, idx) => (
              <li key={idx}>Interest {idx + 1}: <span className='grades__span'>{interest}</span></li>
            ))
            :
            null}
        </ul>
        <div className='tag__container'>
          {student.tags?.length > 0 ?
            student.tags.map((tag, i) => (
              <span key={i} className='tag__span'>{tag}</span>
            ))
            : null}
        </div>
        <form onSubmit={(e) => handleSubmit(e, i)}>
          <input
            type='text'
            placeholder='Add a tag'
            className='tag__input'
            value={tag}
            onChange={(e) => handleOnChange(e)}
          />
        </form>
        <form>
          <input
            type='text'
            placeholder='Add an interest'
            className='tag__input'

          />
        </form>
      </div>
    </div >
  )
}

export default ListItem