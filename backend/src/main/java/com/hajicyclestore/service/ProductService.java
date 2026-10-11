package com.hajicyclestore.service;

import com.hajicyclestore.model.Product;
import com.hajicyclestore.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        if (category == null || category.trim().isEmpty() || "All".equalsIgnoreCase(category)) {
            return productRepository.findAll();
        }
        return productRepository.findByCategory(category.trim());
    }

    public List<Product> searchProducts(String query, String category) {
        boolean hasQuery = query != null && !query.trim().isEmpty();
        boolean hasCategory = category != null && !category.trim().isEmpty() && !"All".equalsIgnoreCase(category);

        if (hasQuery && hasCategory) {
            return productRepository.searchByCategoryAndQuery(category.trim(), query.trim());
        } else if (hasQuery) {
            return productRepository.searchProducts(query.trim());
        } else if (hasCategory) {
            return productRepository.findByCategory(category.trim());
        }
        return productRepository.findAll();
    }

    public Product createProduct(Product product) {
        if (product.getInStock() == null) {
            product.setInStock(true);
        }
        if (product.getStockQuantity() == null) {
            product.setStockQuantity(product.getInStock() ? 10 : 0);
        }
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setPrice(updated.getPrice());
            existing.setOriginalPrice(updated.getOriginalPrice());
            existing.setDescription(updated.getDescription());
            existing.setImageUrl(updated.getImageUrl());
            existing.setInStock(updated.getInStock());
            existing.setStockQuantity(updated.getStockQuantity());
            existing.setBrand(updated.getBrand());
            if (updated.getCategories() != null) {
                existing.setCategories(updated.getCategories());
            }
            return productRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Product updateStock(Long id, Boolean inStock, Integer stockQuantity) {
        return productRepository.findById(id).map(existing -> {
            if (inStock != null) {
                existing.setInStock(inStock);
            }
            if (stockQuantity != null) {
                existing.setStockQuantity(stockQuantity);
                if (stockQuantity <= 0) {
                    existing.setInStock(false);
                }
            }
            return productRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Map<String, Object> getInventoryStats() {
        List<Product> all = productRepository.findAll();
        long totalProducts = all.size();
        long inStockCount = all.stream().filter(p -> Boolean.TRUE.equals(p.getInStock())).count();
        long outOfStockCount = totalProducts - inStockCount;

        Map<String, Long> categoryCount = new HashMap<>();
        for (Product p : all) {
            if (p.getCategories() != null) {
                for (String cat : p.getCategories()) {
                    categoryCount.put(cat, categoryCount.getOrDefault(cat, 0L) + 1);
                }
            }
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProducts", totalProducts);
        stats.put("inStockCount", inStockCount);
        stats.put("outOfStockCount", outOfStockCount);
        stats.put("categoryCounts", categoryCount);
        return stats;
    }
}
