import { useState } from "react";
import { useLocation } from "react-router-dom"; // 이메일 데이터를 받기 위해 import
import { useHandleRoute } from "../../lib/util";
import styles from "../../styles/common/Video.module.css";
import Step2 from "../../components/steps/step2";

export default function GetVideoPage() {

    const baseURL = "http://127.0.0.1:8000"


    const { handleRoute } = useHandleRoute();
    const location = useLocation();
    
    const emailFields = location.state?.emailFields || [];

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    const MAX_TOTAL_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

    const calculateTotalSize = (files) => {
        return files.reduce((total, file) => total + file.file.size, 0);
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter((file) => file.type.startsWith("video/"));
        updateFileList(validFiles);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const validFiles = files.filter((file) => file.type.startsWith("video/"));
        updateFileList(validFiles);
    };

    // 실제 File 객체 + 보여줄 정보를 함께 저장
    const updateFileList = (files) => {

        const newFiles = files.map((file) => ({
            file, // 실제 원본 File 객체
            name: file.name,
            size: file.size,
            displaySize: (file.size / 1024).toFixed(2) + " KB",
        }));
        const updatedFiles = [...uploadedFiles, ...newFiles];

        const totalSize = calculateTotalSize(updatedFiles);

        if (totalSize > MAX_TOTAL_SIZE) {
            alert("동영상은 총 2GB만 가능합니다");
        } else {
            setUploadedFiles(updatedFiles);
            setIsNextDisabled(false);
        }
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(updatedFiles);

        const totalSize = calculateTotalSize(updatedFiles);
        setIsNextDisabled(totalSize > MAX_TOTAL_SIZE);
    };

    /**
     * 이메일과 동영상 server로 전송
     * @returns null
     */
    const handleUploadAndNext = async () => {

        if (uploadedFiles.length === 0) {
            alert("업로드할 동영상이 없습니다.");
            return;
        }

        try {

            const formData = new FormData();

            formData.append("emails", JSON.stringify(emailFields));


            uploadedFiles.forEach(({ file }) => {
                formData.append("videos", file);
            });

            const response = await fetch(baseURL + "/edit/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.error("업로드 실패", response.statusText);
                alert("업로드 실패");
                return;
            }
            handleRoute("/complete");

        } catch (error) {
            console.error("업로드 에러", error);
            alert("업로드 중 오류가 발생했습니다.");
        }
    };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Upload video</h2>

      {uploadedFiles.length === 0 ? (
        <div
          className={styles.videoInput}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <label htmlFor="fileInput" className={styles.dropContent}>
            <img src="/drop.svg" alt="Drop Icon" className={styles.dropIcon} />
            <p>
              <span className={styles.uploadLink}>Click to Upload</span> or drag and drop
            </p>
            <p className={styles.fileSize}>Max. File size: 3GB per file</p>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="video/*"
            multiple
            className={styles.fileInput}
            onChange={handleFileSelect}
          />
        </div>
      ) : (
        <>
          <div className={styles.fileList}>
            {uploadedFiles.map((item, index) => (
              <div key={index} className={styles.fileItem}>
                <div className={styles.fileDetails}>
                  <img
                    src="/videoIcon.svg"
                    alt="Video Icon"
                    className={styles.fileIcon}
                  />
                  <div>
                    <p className={styles.fileName}>{item.name}</p>
                    <p className={styles.fileSize}>{item.displaySize}</p>
                    <p className={styles.addLocation}>Click to add location</p>
                  </div>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleRemoveFile(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className={styles.addButton}>
            <button
              className={styles.addVideoButton}
              onClick={() => document.getElementById("fileInput").click()}
            >
              + Add Video
            </button>
            <input
              id="fileInput"
              type="file"
              accept="video/*"
              multiple
              className={styles.fileInput}
              onChange={handleFileSelect}
            />
          </div>
        </>
      )}

      {uploadedFiles.length > 0 && (
        <div className={styles.buttons}>
          <button
            className={styles.startButton}
            disabled={isNextDisabled}
            onClick={handleUploadAndNext} // ← 여기서 업로드 + 이동
          >
            다음
          </button>
        </div>
      )}

      <div className={styles.graph}>
        <Step2 />
      </div>
    </div>
  );
}