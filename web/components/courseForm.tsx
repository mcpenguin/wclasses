import { useRouter } from "next/router"
import { useState } from "react"

import styles from "@styles/form.module.css"

export default function CourseForm() {
  const router = useRouter()
  const [subjectCode, setSubjectCode] = useState("")
  const [catalogNumber, setCatalogNumber] = useState("")
  const [result, setResult] = useState("")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
      e.preventDefault()
      setResult(`Loading course information for ${subjectCode} ${catalogNumber}...`);
      router.push(`course?subjectCode=${subjectCode}&catalogNumber=${catalogNumber}`)
  }
  return(
    <div className={styles.container}>
      <h2 className={styles.title}>View Course</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.input}>
          <label className={styles.label}>Subject Code</label>
          <input type="text" name='subject_code' onChange={(e)=>{setSubjectCode(e.target.value)}} />
        </div>
        <div className={styles.input}>
          <label className={styles.label}>Catalog Number</label>
          <input type="text" name='catalog_number' onChange={(e)=>{setCatalogNumber(e.target.value)}} />
        </div>
        <button type="submit" className={styles.submit}>View Course</button>
        <div>
          {result}
        </div>
      </form>
    </div>
  )
}
