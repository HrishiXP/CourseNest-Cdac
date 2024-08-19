package coursenest.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "order_details_table")
public class OrderDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_details_id")
	@JsonProperty("id")
	private int id;

	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;

	@Column(name = "order_quantity")
	@JsonProperty("qty")
	private int qty;

	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;

}
