import { useRouter } from "next/router"
import { useState } from "react"

import styles from "@styles/form.module.css"

export default function ProfForm() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [result, setResult] = useState("")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
      e.preventDefault()
      setResult(`Loading professor information for ${firstName} ${lastName}...`);
      router.push(`prof?firstName=${firstName}&lastName=${lastName}`)
  }
  return(
    <div className={styles.container}>
      <h2 className={styles.title}>View Professor</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.input}>
          <label className={styles.label}>First Name</label>
          <input type="text" name='first_name' onChange={(e)=>{setFirstName(e.target.value)}} />
        </div>
        <div className={styles.input}>
          <label className={styles.label}>Last Name</label>
          <input type="text" name='last_name' onChange={(e)=>{setLastName(e.target.value)}} />
        </div>
        <button type="submit" className={styles.submit}>View Professor</button>
        <div>
          {result}
        </div>
      </form>
    </div>
  )
}
