import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useHandleRoute } from "../../lib/util";
import { uploadVideos } from "../../lib/api";
import styles from "../../styles/common/Video.module.css";
import Step2 from "../../components/steps/step2";
import Spinner from "../../components/spinner/Spinner";

export default function GetVideoPage() {
    const { handleRoute } = useHandleRoute();
    const location = useLocation();

    const emailFields = location.state?.emailFields || [];
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [subtitleChecked, setSubtitleChecked] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(null);

    // 교체 애니메이션 적용 대상 인덱스(두 개) 보관
    const [swappingIndices, setSwappingIndices] = useState([]);

    const MAX_TOTAL_SIZE = 2 * 1024 * 1024 * 1024;
    const MAX_VIDEO_COUNT = 5;
    const MAX_TOTAL_DURATION = 30 * 60;

    const handleLocationChange = (index, value) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles[index].location = value;
        setUploadedFiles(updatedFiles);
        setIsEditingLocation(null);
    };

    const calculateTotalSize = (files) => {
        return files.reduce((total, file) => total + file.file.size, 0);
    };

    const calculateTotalDuration = async (files) => {
        const durationPromises = files.map((file) =>
            new Promise((resolve) => {
                const videoElement = document.createElement("video");
                videoElement.preload = "metadata";
                videoElement.onloadedmetadata = () => {
                    resolve(videoElement.duration);
                };
                videoElement.src = URL.createObjectURL(file.file);
            })
        );
        const durations = await Promise.all(durationPromises);
        return durations.reduce((total, duration) => total + duration, 0);
    };

    const handleFileSelect = async (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter((file) => file.type.startsWith("video/"));
        await updateFileList(validFiles);
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const validFiles = files.filter((file) => file.type.startsWith("video/"));
        await updateFileList(validFiles);
    };

    const updateFileList = async (files) => {
        const newFiles = files.map((file) => ({
            file,
            name: file.name,
            size: file.size,
            displaySize: (file.size / (1024 * 1024)).toFixed(1) + " MB",
        }));

        const updatedFiles = [...uploadedFiles, ...newFiles];
        if (updatedFiles.length > MAX_VIDEO_COUNT) {
            alert("동영상은 최대 5개만 업로드할 수 있습니다.");
            return;
        }

        const totalSize = calculateTotalSize(updatedFiles);
        const totalDuration = await calculateTotalDuration(updatedFiles);

        if (totalSize > MAX_TOTAL_SIZE) {
            alert("동영상은 총 2GB만 가능합니다.");
        } else if (totalDuration > MAX_TOTAL_DURATION) {
            alert("동영상은 최대 5개이고 30분을 초과할 수 없습니다.");
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

    const handleUploadAndNext = async () => {
        if (uploadedFiles.length === 0) {
            alert("업로드할 동영상이 없습니다.");
            return;
        }
        try {
            setIsLoading(true);
            const response = await uploadVideos(
                subtitleChecked ? 1 : 0,
                emailFields,
                uploadedFiles
            );
            if (!response.ok) {
                console.error("업로드 실패", response.statusText);
                alert("업로드 실패");
                setIsLoading(false);
                return;
            }
            handleRoute("/complete");
        } catch (error) {
            console.error("업로드 에러", error);
            alert("업로드 중 오류가 발생했습니다.");
            setIsLoading(false);
        }
    };

    // 화살표 클릭 시, 두 아이템에 "fadeOut" 후 재정렬 → "fadeIn"
    const handleMoveUp = (index) => {
        if (index === 0) return;
        swapItems(index, index - 1);
    };

    const handleMoveDown = (index) => {
        if (index === uploadedFiles.length - 1) return;
        swapItems(index, index + 1);
    };

    // 두 인덱스를 교체하는 공통 로직
    const swapItems = (i1, i2) => {
        // 1) 우선 교체하려는 두 인덱스를 fadeOut 처리
        setSwappingIndices([i1, i2]);

        // 2) 0.3초 후, 배열 재정렬
        setTimeout(() => {
            const updated = [...uploadedFiles];
            const temp = updated[i1];
            updated[i1] = updated[i2];
            updated[i2] = temp;
            setUploadedFiles(updated);

            // 3) 재정렬 이후 fadeIn
            setSwappingIndices([]);
        }, 300);
    };

    return (
        <div className={styles.root}>
            {isLoading && (
                <div className={styles.loadingOverlay}>
                    <Spinner />
                </div>
            )}

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
                        <p className={styles.fileSize}>Max. number of video 5</p>
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
                        {uploadedFiles.map((item, index) => {
                            const isSwapping = swappingIndices.includes(index);

                            // fadeOut 클래스 적용 여부
                            // (배열 재정렬 전까지 0.3초 동안만 opacity 낮춤)
                            return (
                                <div
                                    key={index}
                                    className={`${styles.fileItem} ${isSwapping ? styles.fadeOut : ''}`}
                                >
                                    <div className={styles.fileDetails}>
                                        <img
                                            src="/video.svg"
                                            alt="Video Icon"
                                            className={styles.fileIcon}
                                        />
                                        <div>
                                            <p className={styles.fileName}>
                                                {item.name.length > 20
                                                    ? item.name.slice(0, 20) + "..."
                                                    : item.name}
                                            </p>
                                            <p className={styles.fileSize}>{item.displaySize}</p>
                                            {isEditingLocation === index ? (
                                                <input
                                                    type="text"
                                                    placeholder="Enter location"
                                                    className={styles.locationInput}
                                                    onBlur={(e) =>
                                                        handleLocationChange(index, e.target.value)
                                                    }
                                                    autoFocus
                                                />
                                            ) : (
                                                <p
                                                    className={styles.addLocation}
                                                    onClick={() => setIsEditingLocation(index)}
                                                >
                                                    {item.location || "Click to add location"}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img
                                            src="/upperArrow.svg"
                                            alt="Move Up"
                                            className={styles.arrowIcon}
                                            onClick={() => handleMoveUp(index)}
                                        />
                                        <img
                                            src="/underArrow.svg"
                                            alt="Move Down"
                                            className={styles.arrowIcon}
                                            onClick={() => handleMoveDown(index)}
                                        />
                                        <img
                                            src="/trash.svg"
                                            alt="Trash Icon"
                                            className={styles.trashIcon}
                                            onClick={() => handleRemoveFile(index)}
                                        />
                                    </div>
                                </div>
                            );
                        })}
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
                <>
                    <div className={styles.checkboxContainer}>
                        <div className={styles.checkboxContainer}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={subtitleChecked}
                                    onChange={(e) => setSubtitleChecked(e.target.checked)}
                                    className={styles.checkbox}
                                />
                                자막 씌우기
                            </label>
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button
                            className={styles.startButton}
                            disabled={isNextDisabled}
                            onClick={handleUploadAndNext}
                        >
                            다음
                        </button>
                    </div>
                </>
            )}

            <div className={styles.graph}>
                <Step2 />
            </div>
        </div>
    );
}
