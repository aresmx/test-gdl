package com.mx.test.controller;

import com.mx.test.data.Employee;
import com.mx.test.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getEmployee(@PathVariable(value = "id") Integer id) {
        log.info("Get employee request {}", id);
        Employee employee = this.employeeService.findById(id);
        return ResponseEntity.ok().body(employee);
    }

    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        log.info("Create employee request {}", employee);
        Employee employeeSaved = this.employeeService.create(employee);
        return ResponseEntity.ok().body(employeeSaved);
    }

    @PutMapping
    public ResponseEntity<?> updateEmployee(@RequestBody Employee employee) {
        log.info("Update employee request {}", employee);
        this.employeeService.update(employee);
        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable(value = "id") Integer id) {
        log.info("Delete employee request {}", id);
        boolean deleted = this.employeeService.delete(id);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping
    public ResponseEntity<?> getAllEmployees() {
        log.info("Get all employees request");
        List<Employee> employees = this.employeeService.getAll();
        return ResponseEntity.ok().body(employees);
    }

}
