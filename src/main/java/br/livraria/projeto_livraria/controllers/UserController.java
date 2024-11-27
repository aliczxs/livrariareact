package br.livraria.projeto_livraria.controllers;

import br.livraria.projeto_livraria.model.User;
import br.livraria.projeto_livraria.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Endpoint para cadastro de usuário
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        // Verifica se o email ou o username já existe
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Username já em uso!";
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Email já registrado!";
        }
        
        // Salva o usuário no banco
        userRepository.save(user);
        return "Cadastro realizado com sucesso!";
    }

    // Endpoint para login
    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        User foundUser = userRepository.findByUsername(user.getUsername());
        
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            return "Login realizado com sucesso!";
        } else {
            return "Usuário ou senha inválidos!";
        }
    }
}
