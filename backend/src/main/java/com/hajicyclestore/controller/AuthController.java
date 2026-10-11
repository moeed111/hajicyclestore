package com.hajicyclestore.controller;

import com.hajicyclestore.model.AdminUser;
import com.hajicyclestore.repository.AdminUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AdminUserRepository adminUserRepository;

    public AuthController(AdminUserRepository adminUserRepository) {
        this.adminUserRepository = adminUserRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Map<String, Object> response = new HashMap<>();

        if (username == null || password == null) {
            response.put("success", false);
            response.put("message", "Username and password are required.");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<AdminUser> userOpt = adminUserRepository.findByUsername(username.trim());

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password.trim())) {
            AdminUser user = userOpt.get();
            response.put("success", true);
            response.put("message", "Admin authentication successful");
            response.put("username", user.getUsername());
            response.put("displayName", user.getDisplayName());
            response.put("role", user.getRole());
            // Token for client-side session identification
            response.put("token", "haji-adm-" + UUID.randomUUID());
            return ResponseEntity.ok(response);
        }

        response.put("success", false);
        response.put("message", "Invalid username or password. Only authorized admins can access.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
