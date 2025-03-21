package com.uco.ems.service;

import java.util.List;

import com.uco.ems.dto.DepartmentDto;

public interface DepartmentService {
    DepartmentDto createDepartment(DepartmentDto departmentDto);

    DepartmentDto getDepartmentById(Long departmentId);

    List<DepartmentDto> getAllDepartments();

    DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartmentDto);

    void deleteDepartment(Long departmentId);
    
} 
