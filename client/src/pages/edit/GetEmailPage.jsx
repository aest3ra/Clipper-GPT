import { useState } from "react";
import styles from "../../styles/common/Email.module.css";
import Step1 from "../../components/steps/step1";
import { useHandleRoute } from "../../lib/util";

export default function GetEmailPage() {
  const { handleRoute } = useHandleRoute();

  const [emailFields, setEmailFields] = useState([""]);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (value, index) => {
    const updatedEmails = [...emailFields];
    updatedEmails[index] = value;
    setEmailFields(updatedEmails);

    setIsNextDisabled(
      !updatedEmails.some((email) => email.trim() !== "") ||
      !updatedEmails.every((email) => isValidEmail(email) || email.trim() === "")
    );
  };

  const addEmailField = () => {
    if (emailFields.length < 5) {
      setEmailFields([...emailFields, ""]);
    }
  };

  const removeEmailField = (indexToRemove) => {
    const updatedEmails = emailFields.filter((_, idx) => idx !== indexToRemove);
    setEmailFields(updatedEmails);
    setIsNextDisabled(
      !updatedEmails.some((email) => email.trim() !== "") ||
      !updatedEmails.every((email) => isValidEmail(email) || email.trim() === "")
    );
  };

  const handleNext = () => {
    if (!emailFields.every((email) => isValidEmail(email) || email.trim() === "")) {
      alert("이메일 형식이 올바르지 않습니다");
      return;
    }
    handleRoute("/edit2", { emailFields });
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
                <img
                  src="/trash.svg"
                  alt="Email Icon"
                  className={styles.deleteButton}
                  onClick={() => removeEmailField(index)}
                />
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
          onClick={handleNext}
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
