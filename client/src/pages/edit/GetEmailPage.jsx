import { useState } from "react";
import styles from "../../styles/common/Email.module.css";
import Step1 from "../../components/steps/step1";

export default function GetEmailPage() {
    const [emailFields, setEmailFields] = useState(["Your email"]); // Initial email field

    const addEmailField = () => {
        if (emailFields.length < 5) {
            setEmailFields([...emailFields, "Others email"]); // Add a new email field
        }
    };

    const removeEmailField = (indexToRemove) => {
        setEmailFields(emailFields.filter((_, index) => index !== indexToRemove)); // Remove specific email field
    };

    return (
        <div className={styles.root}>
            <h2 className={styles.title}>Email</h2>
            {/* Email Fields Section */}
            <div className={styles.emailWrapper}>
                {emailFields.map((placeholder, index) => (
                    <div key={index} className={styles.emailInputContainer}>
                        <div className={styles.emailInput}>
                            <div className={styles.icon}>
                                <img src="/email.svg" alt="Email Icon" />
                            </div>
                            <input
                                type="email"
                                placeholder={placeholder}
                                className={styles.inputField}
                            />
                            {index > 0 && (
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => removeEmailField(index)}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Share With Others Button */}
                <div className={styles.share}>
                    <button
                        className={styles.shareButton}
                        onClick={addEmailField}
                        disabled={emailFields.length >= 5}
                    >
                        <span>+</span>&nbsp; Share With Others
                    </button>
                </div>
            </div>

            {/* Navigation Button */}
            <div className={styles.buttons}>
                <button className={styles.startButton}>다음</button>
            </div>

            {/* Progress Graph */}
            <div className={styles.graph}>
              <Step1 />
            </div>
        </div>
    );
}
