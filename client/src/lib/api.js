// const baseURL = "http://127.0.0.1:8000";

export async function uploadVideos(subtitle, emailFields, uploadedFiles) {

  const metaData = {
    subtitle,
    emails: emailFields,
    videos: uploadedFiles.map(({ name, location }) => ({
      name,
      location: location || "",
    })),
  };

  const formData = new FormData();

  formData.append("data", JSON.stringify(metaData));

  uploadedFiles.forEach(({ file }) => {
    formData.append("files", file);
  });

  console.log("Subtitle:", subtitle);
  console.log("MetaData:", metaData);

  const response = await fetch("/api/edit/upload", {
    method: "POST",
    body: formData,
  });

  return response;
}
