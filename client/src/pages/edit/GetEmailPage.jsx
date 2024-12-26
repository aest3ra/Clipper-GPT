import { useState } from "react";
import styles from "../../styles/common/Email.module.css";
import Step1 from "../../components/steps/step1";
import { useHandleRoute } from "../../lib/util";

export default function GetEmailPage() {
  const { handleRoute } = useHandleRoute();

  const [emailFields, setEmailFields] = useState([""]);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const handleEmailChange = (value, index) => {
    const updatedEmails = [...emailFields];
    updatedEmails[index] = value;
    setEmailFields(updatedEmails);

    setIsNextDisabled(!updatedEmails.some((email) => email.trim() !== ""));
  };

  const addEmailField = () => {
    if (emailFields.length < 5) {
      setEmailFields([...emailFields, ""]);
    }
  };

  const removeEmailField = (indexToRemove) => {
    const updatedEmails = emailFields.filter((_, idx) => idx !== indexToRemove);
    setEmailFields(updatedEmails);
    setIsNextDisabled(!updatedEmails.some((email) => email.trim() !== ""));
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Email</h2>

      {/* Email Fields Section */}
      <div className={styles.emailWrapper}>
        {emailFields.map((value, index) => (
          <div key={index} className={styles.emailInputContainer}>
            <div className={styles.emailInput}>
              <div className={styles.icon}>
                <img src="/email.svg" alt="Email Icon" />
              </div>
              <input
                type="email"
                placeholder={index === 0 ? "Your email" : "Others email"}
                className={styles.inputField}
                value={value}
                onChange={(e) => handleEmailChange(e.target.value, index)}
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
        <button
          className={styles.startButton}
          disabled={isNextDisabled}
          onClick={() => handleRoute("/edit2", { emailFields })}
        >
          다음
        </button>
      </div>

      {/* Progress Graph */}
      <div className={styles.graph}>
        <Step1 />
      </div>
    </div>
  );
}