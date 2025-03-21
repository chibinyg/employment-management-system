package com.uco.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uco.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
}
