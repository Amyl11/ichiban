package com.example.event.controller;

import com.example.event.dto.request.EventSearchRequest;
import com.example.event.dto.response.EventRatingResponse;
import com.example.event.dto.response.EventSearchResponse;
import com.example.event.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/search")
    public EventSearchResponse searchEvents(@RequestBody EventSearchRequest request) {
        return eventService.searchEvents(request.getPage(), request.getSize());
    }

    @GetMapping("/{eventId}/ratings")
    public ResponseEntity<EventRatingResponse> getEventRatings(
            @PathVariable Long eventId,
            @RequestParam(required = false, defaultValue = "recent") String sortBy) {
        try {
            EventRatingResponse response = eventService.getEventRatings(eventId, sortBy);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}