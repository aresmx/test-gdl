package com.mx.test.data;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "EMPLOYEES")
public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Column(name = "MIDDLE_INITIAL")
    private String middleInitial;
    @Column(name = "LAST_NAME")
    private String lastName;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_OF_BIRTH")
    private Date dateOfBirth;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_OF_EMPLOYMENT")
    private Date dateOfEmployment;
    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private Status status;

    public Employee(Integer id) {
        this.id = id;
    }

}
