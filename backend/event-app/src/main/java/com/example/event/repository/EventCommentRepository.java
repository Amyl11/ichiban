package com.example.event.repository;

import com.example.event.model.EventComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventCommentRepository extends JpaRepository<EventComment, Long> {

    List<EventComment> findByEventId(Long eventId);

    List<EventComment> findByUserId(Long userId);
    
    // Lấy đánh giá theo event, sắp xếp theo thời gian mới nhất
    List<EventComment> findByEventIdOrderByCreatedAtDesc(Long eventId);
    
    // Lấy đánh giá theo event, sắp xếp theo xếp hạng cao nhất
    List<EventComment> findByEventIdOrderByRatingDesc(Long eventId);
    
    // Tính tổng số sao và số lượng đánh giá
    @Query("SELECT COALESCE(SUM(c.rating), 0), COUNT(c) FROM EventComment c WHERE c.event.id = :eventId")
    Object[] getRatingSummaryByEventId(@Param("eventId") Long eventId);

}