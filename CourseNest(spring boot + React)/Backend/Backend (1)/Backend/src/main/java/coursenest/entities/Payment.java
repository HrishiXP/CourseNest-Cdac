package coursenest.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="payments_table")
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "payment_id")
	@JsonProperty("id")
	private int id;
	
	@Column(name = "card_no")
	@JsonProperty("cardno")
	private String cardno;
	
	@Column(name = "name_on_card")
	@JsonProperty("nameoncard")
	private String nameoncard;
	
	@Column(name = "amount")
	@JsonProperty("amount")
	private int amount;
	
	@Column(name = "payment_date")
	@JsonProperty("paymentdate")
	private Date paymentdate;
	
}
