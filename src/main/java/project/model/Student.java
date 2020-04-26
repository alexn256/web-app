package project.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Set;

/**
 * Simple JavaBean object that represents a Student
 * and extended {@link Model} class.
 *
 * @author Alexander Naumov.
 */
@Entity
@Table(name = "STUDENT")
@Data
@EqualsAndHashCode(exclude = {"grades", "subjects", "faculty"}, callSuper = true)
@ToString(exclude = {"grades", "subjects", "password", "photo", "faculty"})
@NoArgsConstructor
public class Student extends Model implements Comparable<Student>{

    @Column(name = "FIRST_NAME")
    private String first_name;

    @Column(name = "LAST_NAME")
    private String last_name;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Column(name = "BIRTHDAY")
    private LocalDate birthday;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name  = "ROLE")
    private Role role;

    @Lob
    @Column(name = "PHOTO")
    private String photo;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "student")
    private Set<Grade> grades;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "SUBJECT_STUDENT",
            joinColumns = { @JoinColumn(name = "STUD_ID") },
            inverseJoinColumns = { @JoinColumn(name = "SUB_ID") })
    private Set<Subject> subjects;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FAC_ID")
    private Faculty faculty;

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