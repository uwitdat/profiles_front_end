import { useState } from 'react';

const ListItem = ({ student, i, calcAverage }) => {
  const [openIndex, setOpenIndex] = useState([]);

  const [tag, setTag] = useState('')
  const [tagArray, setTagArray] = useState([])

  const makeHandleClick = (i) => {
    if (openIndex.includes(i)) {
      setOpenIndex(openIndex.filter(item => item !== i))
    } else {
      setOpenIndex(newArray => [...newArray, i]);
    }
  }

  const handleSubmit = (e, idx) => {
    e.preventDefault()
    setTagArray(tagArrayClone => [...tagArrayClone, tag])
    setTag('')
  }
  return (
    <div className="students" key={student.id}>
      <div className='image__container'>
        <img className='students__image' src={student.pic} alt="avatar of various students"></img>
      </div>
      <div className='text__container'>
        <h3 className='students__title'>{student.firstName} {student.lastName}
          <span onClick={() => makeHandleClick(i)} className='plus-minus'>
            {openIndex.includes(i) ? '\u2796' : '\u2795'}
          </span></h3>

        <p>Email: {student.email}</p>
        <p>Company: {student.company}</p>
        <p>Skill: {student.skill}</p>
        <p>Average: {calcAverage(student.grades)}%</p>
        <ul className={`grades__list`}>
          {openIndex.includes(i) ?
            student.grades.map((grade, idx) => (
              <li key={idx}>Test {idx + 1}: <span className='grades__span'>{grade}%</span></li>
            ))
            :
            null}
        </ul>
        <div className='tag__container'>
          {tagArray.length > 0 ? tagArray.map((tag, i) => (
            <span key={i} className='tag__span'>{tag}</span>
          )) : null}
        </div>
        <form onSubmit={(e) => handleSubmit(e, i)}>
          <input
            name={`tag_input_${student.id}`}
            type='text'
            placeholder='Add a tag'
            className='tag__input'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </form>
      </div>

    </div>
  )
}

export default ListItem