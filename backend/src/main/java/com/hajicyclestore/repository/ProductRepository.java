package com.hajicyclestore.repository;

import com.hajicyclestore.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT DISTINCT p FROM Product p JOIN p.categories c WHERE LOWER(c) = LOWER(:category)")
    List<Product> findByCategory(@Param("category") String category);

    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN p.categories c WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.brand) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchProducts(@Param("query") String query);

    @Query("SELECT DISTINCT p FROM Product p JOIN p.categories c WHERE " +
           "LOWER(c) = LOWER(:category) AND (" +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.brand) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchByCategoryAndQuery(@Param("category") String category, @Param("query") String query);

    long countByInStockTrue();
}
