package com.hajicyclestore.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${cloudinary.cloud_name:}")
    private String cloudName;

    @Value("${cloudinary.api_key:}")
    private String apiKey;

    @Value("${cloudinary.api_secret:}")
    private String apiSecret;

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    private Cloudinary cloudinary;

    private boolean isCloudinaryConfigured() {
        return cloudName != null && !cloudName.isBlank()
                && apiKey != null && !apiKey.isBlank()
                && apiSecret != null && !apiSecret.isBlank();
    }

    private Cloudinary getCloudinaryClient() {
        if (cloudinary == null && isCloudinaryConfigured()) {
            cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName,
                    "api_key", apiKey,
                    "api_secret", apiSecret,
                    "secure", true
            ));
        }
        return cloudinary;
    }

    public String storeFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store empty file");
        }

        // If Cloudinary is configured, upload to Cloudinary
        if (isCloudinaryConfigured()) {
            Cloudinary client = getCloudinaryClient();
            if (client != null) {
                @SuppressWarnings("rawtypes")
                Map uploadResult = client.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                        "folder", "haji_cycle_store"
                ));
                return (String) uploadResult.get("secure_url");
            }
        }

        // Local storage fallback
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        } else {
            extension = ".jpg";
        }

        String fileName = UUID.randomUUID().toString() + extension;
        Path targetLocation = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Return relative endpoint path which WebConfig maps
        return "/uploads/" + fileName;
    }
}
