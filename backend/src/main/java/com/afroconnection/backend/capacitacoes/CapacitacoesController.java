package com.afroconnection.backend.capacitacoes;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Record para representar um Curso de forma simples
record Curso(long id, String image, String badge, String title, String description, List<CursoDetalhe> details) {}

// Record para os detalhes de cada curso
record CursoDetalhe(String icon, String text) {}

@RestController
@RequestMapping("/api/capacitacoes") // Todos os endpoints aqui começarão com /api/capacitacoes
public class CapacitacoesController {

    /**
     * Endpoint para buscar a lista de todas as capacitações.
     * URL: GET /api/capacitacoes
     *
     * Esta rota será protegida automaticamente pelo nosso JwtAuthFilter,
     * exigindo um token válido para ser acedida.
     */
    @GetMapping
    public ResponseEntity<List<Curso>> getCapacitacoes() {
        // Simulação dos dados que viriam do banco de dados
        List<Curso> cursos = Arrays.asList(
            new Curso(1, "sobre.avif", "Tecnologia", "Desenvolvimento Web", "Aprenda HTML, CSS e JavaScript do zero ao avançado.",
                Arrays.asList(
                    new CursoDetalhe("bi-clock", "60 horas"),
                    new CursoDetalhe("bi-person-check", "Certificado"),
                    new CursoDetalhe("bi-laptop", "Online")
                )
            ),
            new Curso(2, "negocios.jpeg", "Negócios", "Gestão de Negócios", "Fundamentos de administração e empreendedorismo.",
                Arrays.asList(
                    new CursoDetalhe("bi-clock", "40 horas"),
                    new CursoDetalhe("bi-person-check", "Certificado"),
                    new CursoDetalhe("bi-laptop", "Online")
                )
            ),
            new Curso(3, "marketing.jpg", "Marketing", "Marketing Digital", "Estratégias para divulgar seus produtos ou serviços na internet.",
                Arrays.asList(
                    new CursoDetalhe("bi-clock", "30 horas"),
                    new CursoDetalhe("bi-person-check", "Certificado"),
                    new CursoDetalhe("bi-laptop", "Online")
                )
            )
        );

        // Retorna a lista de cursos com um status 200 OK
        return ResponseEntity.ok(cursos);
    }
}
