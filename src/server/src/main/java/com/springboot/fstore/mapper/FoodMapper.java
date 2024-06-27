package com.springboot.fstore.mapper;

import com.springboot.fstore.entity.Food;
import com.springboot.fstore.entity.FoodSize;
import com.springboot.fstore.entity.Image;
import com.springboot.fstore.entity.Tag;
import com.springboot.fstore.payload.FoodDTO;

public class FoodMapper {
    public static FoodDTO toFoodDTO(Food food) {
        if (food == null) return null;
        return FoodDTO.builder()
                .id(food.getId())
                .name(food.getName())
                .description(food.getDescription())
                .status(food.getStatus())
                .isDeleted(food.getIsDeleted())
                .createdAt(food.getCreatedAt())
                .foodSizes(food.getFoodSizes() != null ? food.getFoodSizes().stream().filter(foodSize -> !foodSize.isDeleted()).map(FoodSizeMapper::toFoodSizeDTO).toList() : null)
                .category(food.getCategory() != null ? CategoryMapper.toCategoryDTO(food.getCategory()) : null)
                .images(food.getImages() != null ? food.getImages().stream().map(Image::getUrl).toList() : null)
                .tags(food.getTags() != null ? food.getTags().stream().map(Tag::getName).toList() : null)
                .totalRating(food.getComments() == null || food.getComments().isEmpty() ? 0.0 : food.getComments().stream().reduce(0.0, (a, b) -> a + b.getRating(), Double::sum) / food.getComments().size())
                .totalSold(0)
                .build();
    }

    public static Food toFood(FoodDTO foodDTO) {
        return Food.builder()
                .name(foodDTO.getName())
                .description(foodDTO.getDescription())
                .status(foodDTO.getStatus())
                .isDeleted(foodDTO.getIsDeleted() != null && foodDTO.getIsDeleted())
                .build();
    }
}
