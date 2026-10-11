package com.hajicyclestore.controller;

import com.hajicyclestore.model.Product;
import com.hajicyclestore.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        if ((category != null && !category.isBlank()) || (search != null && !search.isBlank())) {
            return ResponseEntity.ok(productService.searchProducts(search, category));
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        try {
            Product created = productService.createProduct(product);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        try {
            Product updated = productService.updateProduct(id, product);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteProduct(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        Map<String, Object> response = new HashMap<>();
        if (deleted) {
            response.put("success", true);
            response.put("message", "Product deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Product not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<Product> updateStock(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        Boolean inStock = body.containsKey("inStock") ? (Boolean) body.get("inStock") : null;
        Integer stockQuantity = null;
        if (body.containsKey("stockQuantity") && body.get("stockQuantity") != null) {
            stockQuantity = Integer.valueOf(body.get("stockQuantity").toString());
        }
        try {
            Product updated = productService.updateStock(id, inStock, stockQuantity);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(productService.getInventoryStats());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> defaultCategories = Arrays.asList(
                "Cycle",
                "Ranger cycle",
                "Kids cycle",
                "Ladies cycle",
                "Cycle tubes",
                "Cycle parts",
                "Tubes for bikes and other vehicles",
                "Tyres for bikes and other vehicles"
        );
        return ResponseEntity.ok(defaultCategories);
    }
}
