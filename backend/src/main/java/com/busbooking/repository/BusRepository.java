package com.busbooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.busbooking.entity.Bus;

public interface BusRepository extends JpaRepository<Bus, Integer> {

    List<Bus> findBySourceAndDestination(String source, String destination);
    @Query("SELECT DISTINCT b.source FROM Bus b")
    List<String> getAllSources();

    @Query("SELECT DISTINCT b.destination FROM Bus b")
    List<String> getAllDestinations();
    
//    @Query("SELECT b FROM Bus b WHERE b.source = :source AND b.destination = :destination AND b.journeyDate = :date")
//    List<Bus> searchBus(String source, String destination, String date);

}
