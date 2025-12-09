package com.example.event.dto.response;

import java.time.OffsetDateTime;

public class EventRatingItem {
    
    private Long commentId;
    private Long userId;
    private String userName;
    private String userEmail;
    private Integer rating; // 1-5 sao
    private String comment;
    private OffsetDateTime createdAt;
    
    public EventRatingItem() {
    }
    
    public EventRatingItem(Long commentId, Long userId, String userName, String userEmail, 
                          Integer rating, String comment, OffsetDateTime createdAt) {
        this.commentId = commentId;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
    }
    
    public Long getCommentId() {
        return commentId;
    }
    
    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getUserEmail() {
        return userEmail;
    }
    
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public String getComment() {
        return comment;
    }
    
    public void setComment(String comment) {
        this.comment = comment;
    }
    
    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

