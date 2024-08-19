package coursenest.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import coursenest.entities.Payment;

public interface PaymentDao extends JpaRepository<Payment, Integer> {

}
