package com.example.event.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class EventRatingResponse {
    
    private Long eventId;
    private String eventTitle;
    private BigDecimal averageRating; // Xếp hạng trung bình
    private Integer totalRatings; // Tổng số đánh giá
    private List<EventRatingItem> ratings; // Danh sách đánh giá
    
    public EventRatingResponse() {
    }
    
    public EventRatingResponse(Long eventId, String eventTitle, BigDecimal averageRating, 
                               Integer totalRatings, List<EventRatingItem> ratings) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.averageRating = averageRating;
        this.totalRatings = totalRatings;
        this.ratings = ratings;
    }
    
    public Long getEventId() {
        return eventId;
    }
    
    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
    
    public String getEventTitle() {
        return eventTitle;
    }
    
    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }
    
    public BigDecimal getAverageRating() {
        return averageRating;
    }
    
    public void setAverageRating(BigDecimal averageRating) {
        this.averageRating = averageRating;
    }
    
    public Integer getTotalRatings() {
        return totalRatings;
    }
    
    public void setTotalRatings(Integer totalRatings) {
        this.totalRatings = totalRatings;
    }
    
    public List<EventRatingItem> getRatings() {
        return ratings;
    }
    
    public void setRatings(List<EventRatingItem> ratings) {
        this.ratings = ratings;
    }
}

