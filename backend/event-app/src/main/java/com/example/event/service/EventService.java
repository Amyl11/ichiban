package com.example.event.service;

import com.example.event.dto.response.EventRatingResponse;
import com.example.event.dto.response.EventSearchResponse;

public interface EventService {
    EventSearchResponse searchEvents(int page, int size);
    EventRatingResponse getEventRatings(Long eventId, String sortBy);
}