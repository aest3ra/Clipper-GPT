import { useState } from "react";
import { useHandleRoute } from "../../lib/util";
import styles from "../../styles/common/Video.module.css";
import Step2 from "../../components/steps/step2";

export default function GetVideoPage() {

    const { handleRoute } = useHandleRoute();

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    const MAX_TOTAL_SIZE = 2 * 1024 * 1024 * 1024;

    const calculateTotalSize = (files) => {
        return files.reduce((total, file) => total + file.size, 0);
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

    const updateFileList = (files) => {
        const newFiles = files.map((file) => ({
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
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className={styles.fileItem}>
                                <div className={styles.fileDetails}>
                                    <img src="/videoIcon.svg" alt="Video Icon" className={styles.fileIcon} />
                                    <div>
                                        <p className={styles.fileName}>{file.name}</p>
                                        <p className={styles.fileSize}>{file.displaySize}</p>
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
                        onClick={() => handleRoute("/complete")}
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
