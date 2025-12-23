package com.example.event.service;

public interface FavoriteService {
    void addFavorite(Long eventId);
    boolean isFavorite(Long eventId);
    void removeFavorite(Long eventId);
}

