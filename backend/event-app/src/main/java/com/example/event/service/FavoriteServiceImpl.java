package com.example.event.service;

import com.example.event.model.Event;
import com.example.event.model.EventFavorite;
import com.example.event.model.User;
import com.example.event.repository.EventFavoriteRepository;
import com.example.event.repository.EventRepository;
import com.example.event.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EventFavoriteRepository eventFavoriteRepository;

    public FavoriteServiceImpl(EventRepository eventRepository,
                               UserRepository userRepository,
                               EventFavoriteRepository eventFavoriteRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.eventFavoriteRepository = eventFavoriteRepository;
    }

    @Override
    public void addFavorite(Long eventId) {
        User currentUser = getCurrentUser();
        Event event = getEvent(eventId);

        boolean exists = eventFavoriteRepository.existsByUserAndEvent(currentUser, event);
        if (!exists) {
            eventFavoriteRepository.save(new EventFavorite(currentUser, event));
        }
    }

    @Override
    public boolean isFavorite(Long eventId) {
        User currentUser = getCurrentUser();
        Event event = getEvent(eventId);
        return eventFavoriteRepository.existsByUserAndEvent(currentUser, event);
    }

    @Override
    public void removeFavorite(Long eventId) {
        User currentUser = getCurrentUser();
        Event event = getEvent(eventId);
        eventFavoriteRepository.deleteByUserAndEvent(currentUser, event);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }

    private Event getEvent(Long eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    }
}

