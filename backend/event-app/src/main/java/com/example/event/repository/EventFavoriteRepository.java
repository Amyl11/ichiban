package com.example.event.repository;

import com.example.event.model.Event;
import com.example.event.model.EventFavorite;
import com.example.event.model.EventFavoriteId;
import com.example.event.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventFavoriteRepository extends JpaRepository<EventFavorite, EventFavoriteId> {

    boolean existsByUserAndEvent(User user, Event event);

    void deleteByUserAndEvent(User user, Event event);
}