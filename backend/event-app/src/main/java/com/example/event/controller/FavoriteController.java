package com.example.event.controller;

import com.example.event.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    /**
     * Thêm sự kiện vào danh sách yêu thích.
     */
    @PostMapping("/{eventId}")
    public ResponseEntity<Void> addFavorite(@PathVariable Long eventId) {
        favoriteService.addFavorite(eventId);
        return ResponseEntity.ok().build();
    }

    /**
     * Kiểm tra sự kiện đã được yêu thích chưa.
     */
    @GetMapping("/{eventId}")
    public ResponseEntity<Boolean> isFavorite(@PathVariable Long eventId) {
        boolean exists = favoriteService.isFavorite(eventId);
        return ResponseEntity.ok(exists);
    }

    /**
     * Xóa khỏi danh sách yêu thích.
     */
    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long eventId) {
        favoriteService.removeFavorite(eventId);
        return ResponseEntity.noContent().build();
    }
}

