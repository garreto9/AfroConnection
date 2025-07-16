package com.afroconnection.backend.email;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@Service
public class EmailService {

    @Value("${SENDGRID_API_KEY}")
    private String sendGridApiKey;

    public void sendPasswordResetEmail(String toEmail, String token) {
        Email from = new Email("jeffsonvidaloka@gmail.com"); 
        String subject = "Recuperação de Senha - AfroConnection";
        Email to = new Email(toEmail);

        String resetLink = "https://afroconnection.vercel.app/reset-password/" + token;

        Content content = new Content("text/html", 
            "<h3>Recuperação de Senha</h3>" +
            "<p>Você pediu para redefinir a sua senha. Clique no link abaixo para criar uma nova:</p>" +
            "<a href='" + resetLink + "'>Redefinir Minha Senha</a>" +
            "<p>Se você não pediu isto, por favor ignore este e-mail.</p>"
        );

        Mail mail = new Mail(from, subject, to, content);
        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
            System.out.println("E-mail de recuperação enviado para: " + toEmail);
        } catch (IOException ex) {
            System.err.println("Erro ao enviar e-mail: " + ex.getMessage());
        }
    }
}
