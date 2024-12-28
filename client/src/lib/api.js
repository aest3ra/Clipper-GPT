const baseURL = "http://127.0.0.1:8000";

export async function uploadVideos(subtitle, emailFields, uploadedFiles) {
    const formData = new FormData();

    formData.append("subtitle", subtitle);
    formData.append("emails", JSON.stringify(emailFields));

    uploadedFiles.forEach(({ file, location }) => {
        formData.append("videos", file);
        formData.append("locations", location || ""); // 위치 정보 추가 (없으면 빈 값)
    });

    console.log("Subtitle:", subtitle);
    console.log("Uploaded Files:", uploadedFiles);

    const response = await fetch(baseURL + "/edit/upload", {
        method: "POST",
        body: formData,
    });

    return response;
}
