const baseURL = "http://127.0.0.1:8000";

export async function uploadVideos(emailFields, uploadedFiles) {

    const formData = new FormData();
    formData.append("emails", JSON.stringify(emailFields));
  
    uploadedFiles.forEach(({ file }) => {
      formData.append("videos", file);
    });
  
    const response = await fetch(baseURL + "/edit/upload", {
      method: "POST",
      body: formData,
    });
  
    return response;
  }