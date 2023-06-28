import React from "react"
import styles from "./LoadingUI.module.scss"

export const LoadingUI = () => {
    return (
        <div className={styles.loading_container}>
            <div className={styles.loading}></div>
        </div>
    )
}
