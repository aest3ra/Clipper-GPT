const baseURL = "http://127.0.0.1:8000";

export async function uploadVideos(subtitle, emailFields, uploadedFiles) {

    const formData = new FormData();

    formData.append("subtitle", subtitle);
    formData.append("emails", JSON.stringify(emailFields));
    
    uploadedFiles.forEach(({ file }) => {
		formData.append("videos", file);
    });

    console.log(subtitle)
	
	const response = await fetch(baseURL + "/edit/upload", {
		method: "POST",
		body: formData,
    });
  
    return response;
}