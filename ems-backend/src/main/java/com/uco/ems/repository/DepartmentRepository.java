package com.uco.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uco.ems.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long>{
     
} 
