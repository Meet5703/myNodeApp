// fileValidation.js
document.getElementById("VideoUpload").addEventListener("change", function () {
  const file = this.files[0];
  const fileSize = file.size;
  const fileType = file.type;

  // Validate file type and size
  if (fileType !== "video/mp4") {
    document.getElementById("error-message").textContent =
      "Please upload an MP4 file.";
    this.value = ""; // Clear the file input
    return;
  }

  if (fileSize > 30 * 1024 * 1024) {
    // 30MB in bytes
    document.getElementById("error-message").textContent =
      "File size exceeds 30MB.";
    this.value = ""; // Clear the file input
    return;
  }

  // Validate video duration
  const video = document.createElement("video");
  video.preload = "metadata";
  video.onloadedmetadata = function () {
    window.URL.revokeObjectURL(video.src);
    if (video.duration > 30) {
      document.getElementById("error-message").textContent =
        "Video duration should be within 30 seconds.";
      document.getElementById("VideoUpload").value = ""; // Clear the file input
    }
  };
  video.src = URL.createObjectURL(file);
});
