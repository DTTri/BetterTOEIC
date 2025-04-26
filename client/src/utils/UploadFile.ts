import http from "@/services/http";

const uploadFile = async (file: File) => {
  try {
    const response = await http.get(
      `file/presigned-url?fileName=${file.name}&contentType=${file.type}`
    );
    if (!response) {
      throw new Error("Failed to get presigned URL");
    }

    const result = await fetch(response.presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!result.ok) {
      throw new Error("Failed to upload image");
    }
    return "https://seuit-qlnt.s3.amazonaws.com/" + response.key;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const uploadFiles = async (files: File[]) => {
    try {
        let res: string[] = [];
        const uploadPromises = files.map(async (file) => {
            return await uploadFile(file);
        });

        if (uploadPromises.length > 0) {
            res = await Promise.all(uploadPromises);
        }
        return res;
    } catch (error) {
        console.error("Error uploading files:", error);
        throw error;
    }
}

export { uploadFile, uploadFiles };