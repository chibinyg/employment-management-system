package com.uco.ems.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.uco.ems.dto.DepartmentDto;
import com.uco.ems.entity.Department;
import com.uco.ems.exception.ResourceNotFoundException;
import com.uco.ems.mapper.DepartmentMapper;
import com.uco.ems.repository.DepartmentRepository;
import com.uco.ems.service.DepartmentService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {

        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {

        Department department = departmentRepository.findById(departmentId).orElseThrow(
                () -> new ResourceNotFoundException("Department is not found with given id: " + departmentId));
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {

        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map((department) -> DepartmentMapper.mapToDepartmentDto(department))
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartment) {

        Department department = departmentRepository.findById(departmentId).orElseThrow(
                () -> new ResourceNotFoundException("Department is not found with given id: " + departmentId));
        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentDescription(updatedDepartment.getDepartmentDescription());
        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        departmentRepository.findById(departmentId).orElseThrow(
                () -> new ResourceNotFoundException("Department is not found with given id: " + departmentId));

        departmentRepository.deleteById(departmentId);
    }

}
