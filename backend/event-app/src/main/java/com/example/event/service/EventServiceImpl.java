package com.example.event.service;

import com.example.event.dto.response.EventRatingItem;
import com.example.event.dto.response.EventRatingResponse;
import com.example.event.dto.response.EventSearchResponse;
import com.example.event.dto.response.EventSearchResponseItem;
import com.example.event.model.Event;
import com.example.event.model.EventComment;
import com.example.event.repository.EventCommentRepository;
import com.example.event.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;
import java.util.concurrent.ThreadLocalRandom;
@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventCommentRepository eventCommentRepository;

    public EventServiceImpl(EventRepository eventRepository, EventCommentRepository eventCommentRepository) {
        this.eventRepository = eventRepository;
        this.eventCommentRepository = eventCommentRepository;
    }

    @Override
    public EventSearchResponse searchEvents(int page, int size) {
        Page<Event> eventPage = eventRepository.findAll(PageRequest.of(page, size));

        List<EventSearchResponseItem> items = eventPage.getContent().stream()
            .map(this::mapToResponseItem)
            .collect(Collectors.toList());

        EventSearchResponse response = new EventSearchResponse();
        response.setEvents(items);
        response.setPage(eventPage.getNumber());
        response.setSize(eventPage.getSize());
        response.setTotalPages(eventPage.getTotalPages());
        response.setTotalElements(eventPage.getTotalElements());

        return response;
    }

    private EventSearchResponseItem mapToResponseItem(Event event) {
        EventSearchResponseItem item = new EventSearchResponseItem();
        item.setId(event.getId());
        item.setTitle(event.getTitle());
        item.setCategories(event.getCategory() != null ? List.of(event.getCategory().getName()) : List.of());
        item.setDistrict(event.getLocation() != null ? event.getLocation().getDistrict() : null);
        item.setCity(event.getLocation() != null ? event.getLocation().getCity() : null);
        item.setStartDate(event.getStartDatetime());
        item.setEndDate(event.getEndDatetime());
        item.setShortDescription(event.getDescription());
        item.setPrice(event.getPrice());
        double randomRating = Math.round(
                (ThreadLocalRandom.current().nextDouble(1.0, 5.0) * 10)
        ) / 10.0;

        item.setRating(randomRating);
        item.setImage(null);  // optional, add image URL field in Event if needed
        return item;
    }

    @Override
    public EventRatingResponse getEventRatings(Long eventId, String sortBy) {
        // Kiểm tra event có tồn tại không
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Sự kiện không tồn tại với ID: " + eventId));

        // Lấy danh sách đánh giá theo cách sắp xếp
        List<EventComment> comments;
        if ("rating".equalsIgnoreCase(sortBy)) {
            // Sắp xếp theo xếp hạng cao nhất
            comments = eventCommentRepository.findByEventIdOrderByRatingDesc(eventId);
        } else {
            // Mặc định: sắp xếp theo thời gian gần nhất
            comments = eventCommentRepository.findByEventIdOrderByCreatedAtDesc(eventId);
        }

        // Tính toán xếp hạng trung bình
        Object[] summary = eventCommentRepository.getRatingSummaryByEventId(eventId);
        Long totalStars = ((Number) summary[0]).longValue();
        Long totalRatings = ((Number) summary[1]).longValue();
        
        BigDecimal averageRating = BigDecimal.ZERO;
        if (totalRatings > 0) {
            averageRating = BigDecimal.valueOf(totalStars)
                .divide(BigDecimal.valueOf(totalRatings), 2, RoundingMode.HALF_UP);
        }

        // Chuyển đổi sang DTO
        List<EventRatingItem> ratingItems = comments.stream()
            .map(comment -> new EventRatingItem(
                comment.getId(),
                comment.getUser().getId(),
                comment.getUser().getFullName(),
                comment.getUser().getEmail(),
                comment.getRating(),
                comment.getComment(),
                comment.getCreatedAt()
            ))
            .collect(Collectors.toList());

        // Tạo response
        EventRatingResponse response = new EventRatingResponse();
        response.setEventId(eventId);
        response.setEventTitle(event.getTitle());
        response.setAverageRating(averageRating);
        response.setTotalRatings(totalRatings.intValue());
        response.setRatings(ratingItems);

        return response;
    }
}