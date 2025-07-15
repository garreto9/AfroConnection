package com.afroconnection.backend.upload;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;

@Service
public class FileUploadService {

    @Autowired
    private Cloudinary cloudinary;
    
    /**
     * Faz o upload de um ficheiro para o Cloudinary.
     * @param file O ficheiro recebido do front-end.
     * @return A URL segura da imagem que foi feito o upload.
     * @throws IOException Se ocorrer um erro durante o upload.
     */
    public String uploadFile(MultipartFile file) throws IOException {
        // Faz o upload para o Cloudinary, gerando um ID público único e aleatório
        Map<?, ?> uploadResult = cloudinary.uploader().upload(
            file.getBytes(),
            Map.of("public_id", UUID.randomUUID().toString())
        );

        // Retorna a URL segura da imagem
        return (String) uploadResult.get("secure_url");
    }
}
