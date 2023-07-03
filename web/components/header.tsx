import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "@styles/header.module.css"

export default function Header() {
  const router = useRouter()
  const handleClick = (e) => {
      e.preventDefault()
      router.push("/")
  }

  return <div className={styles.header} onClick={handleClick}>
    <h3>WClasses</h3>
  </div>
}
