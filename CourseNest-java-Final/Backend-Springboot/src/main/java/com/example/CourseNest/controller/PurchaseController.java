package com.example.CourseNest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CourseNest.model.Purchase;
import com.example.CourseNest.service.PurchaseService;

@RestController
@RequestMapping("/api/purchases")
@PreAuthorize("hasAuthority('SCOPE_USER')")
public class PurchaseController {

	@Autowired
	private PurchaseService purchaseService;

	@GetMapping("/{userId}/courses")
	public ResponseEntity<List<Purchase>> getCoursePurchasesByUserId(@PathVariable Long userId) {
		return ResponseEntity.ok(purchaseService.findCoursePurchasesByUserId(userId));
	}

	@GetMapping("/{userId}/consultations")
	public ResponseEntity<List<Purchase>> getConsultationPurchasesByUserId(@PathVariable Long userId) {
		return ResponseEntity.ok(purchaseService.findConsultationPurchasesByUserId(userId));
	}

	@GetMapping("/{userId}/workshops")
	public ResponseEntity<List<Purchase>> getWorkshopPurchasesByUserId(@PathVariable Long userId) {
		return ResponseEntity.ok(purchaseService.findWorkshopPurchasesByUserId(userId));
	}
}
