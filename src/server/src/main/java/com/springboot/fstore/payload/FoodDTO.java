package com.springboot.fstore.payload;

import com.springboot.fstore.entity.FoodSize;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FoodDTO {
    private int id;
    private String name;
    private String description;
    private String status;
    private Boolean isDeleted;
    private Double totalRating;
    private LocalDateTime createdAt;
    private CategoryDTO category;
    private List<String> images;
    private List<String> tags;
    private List<FoodSizeDTO> foodSizes;
    private boolean isPurchased;
    private Integer totalSold;
}
