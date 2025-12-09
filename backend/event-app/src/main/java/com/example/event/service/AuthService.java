package com.example.event.service;

import com.example.event.dto.request.LoginRequest;
import com.example.event.dto.request.RegisterRequest;
import com.example.event.dto.response.LoginResponse;
import com.example.event.dto.response.RegisterResponse;
import com.example.event.model.User;
import com.example.event.repository.UserRepository;
import com.example.event.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest loginRequest) {

        // Tìm người dùng theo email
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        User user = userOptional.get();

        // So sánh mật khẩu
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        // Tạo JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getEmail(),
                "Đăng nhập thành công"
        );
    }

    public RegisterResponse register(RegisterRequest registerRequest) {
        // Kiểm tra email đã tồn tại chưa
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email này đã được sử dụng");
        }

        // Tạo user mới
        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setFullName(registerRequest.getFullName());

        // Lưu vào database
        userRepository.save(newUser);

        return new RegisterResponse(
                "Đăng ký thành công",
                newUser.getEmail(),
                true
        );
    }
}

