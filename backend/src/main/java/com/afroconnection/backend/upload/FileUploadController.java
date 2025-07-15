package com.afroconnection.backend.upload;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    /**
     * @param file O ficheiro enviado na requisição.
     * @return Uma resposta com a URL da imagem.
     */
    @PostMapping("/admin/upload")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = fileUploadService.uploadFile(file);
            return ResponseEntity.ok(Map.of("url", imageUrl));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao fazer o upload do ficheiro: " + e.getMessage());
        }
    }
}
