package project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Set;

/**
 * Simple JavaBean object that represents a Student.
 *
 * @author Alexander Naumov.
 */

@Entity
@Table(name = "STUDENT")
@Data
@EqualsAndHashCode(exclude = {"marks", "subjects", "department"}, callSuper = true)
@ToString(exclude = {"marks", "subjects", "password", "photo", "department", "confirmedPassword"})
@NoArgsConstructor
public class Student extends Model implements Comparable<Student>{

    @Column(name = "FIRST_NAME")
    private String first_name;

    @Column(name = "LAST_NAME")
    private String last_name;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "BIRTHDAY")
    private LocalDate birthday;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @Transient
    private String confirmedPassword;

    @Enumerated(EnumType.STRING)
    @Column(name  = "ROLE")
    private Role role;

    @Lob
    @Column(name = "PHOTO")
    private String photo;

    @JsonIgnore
    @Fetch(FetchMode.JOIN)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "student")
    private Set<Mark> marks;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "SUBJECT_STUDENT",
            joinColumns = { @JoinColumn(name = "STUD_ID") },
            inverseJoinColumns = { @JoinColumn(name = "SUB_ID") })
    private Set<Subject> subjects;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DEP_ID")
    private Department department;

    @Override
    public int compareTo(Student o) {
        int index = last_name.compareTo(o.getLast_name());
        if (index < 0){
            return -1;
        }
        else {
            if (index > 0){
                return 1;
            }
            else {
                return first_name.compareTo(o.getFirst_name());
            }
        }
    }
}