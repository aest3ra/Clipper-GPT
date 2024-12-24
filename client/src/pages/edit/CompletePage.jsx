import { useNavigate } from "react-router-dom";
import styles from "../../styles/common/Complete.module.css";
import Step3 from "../../components/steps/step3";

export default function CompletePage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/"); // 홈으로 이동
    };

    return (
        <div className={styles.root}>

            <div className={styles.completeContent}>
                <img src="/check.svg" alt="Completion Checkmark" className={styles.checkIcon} />
                <h2 className={styles.completeText}>Complete</h2>
            </div>

            {/* Home Button */}
            <div className={styles.buttons}>
                <button className={styles.homeButton} onClick={handleGoHome}>
                    홈으로 돌아가기
                </button>
            </div>

            {/* Progress Graph */}
            <div className={styles.graph}>
                <Step3 />
            </div>
        </div>
    );
}
