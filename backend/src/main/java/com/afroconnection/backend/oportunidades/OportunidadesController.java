package com.afroconnection.backend.oportunidades;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Usamos um record para representar uma vaga de forma simples.
// No futuro, isto seria uma classe @Entity vinda do seu banco de dados.
record Oportunidade(long id, String title, String company, String location, List<String> tags, String link) {}

@RestController
@RequestMapping("/api/oportunidades") // Todos os endpoints aqui começarão com /api/oportunidades
public class OportunidadesController {

    /**
     * Endpoint para buscar a lista de todas as oportunidades.
     * URL: GET /api/oportunidades
     *
     * IMPORTANTE: Como esta rota não começa com /api/auth, o nosso SecurityConfig
     * irá protegê-la automaticamente. Só será possível acedê-la com um token JWT válido.
     */
    @GetMapping
    public ResponseEntity<List<Oportunidade>> getOportunidades() {
        // Simulação dos dados que viriam do banco de dados
        List<Oportunidade> oportunidades = Arrays.asList(
            new Oportunidade(1, "Analista de Dados", "DiDi Global", "São Paulo, SP", Arrays.asList("SQL", "Tecnologia"), "#"),
            new Oportunidade(2, "Desenvolvedor(a) de Software", "Amazon", "São Paulo, SP", Arrays.asList("SDLC", "Tecnologia"), "#"),
            new Oportunidade(3, "Analista de Marketing", "Divulga Vagas", "São Paulo, SP", Arrays.asList("Marketing"), "#")
        );

        return ResponseEntity.ok(oportunidades);
    }
}
