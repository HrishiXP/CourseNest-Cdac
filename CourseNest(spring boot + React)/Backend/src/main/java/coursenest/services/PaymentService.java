package coursenest.services;

import coursenest.entities.Payment;

public interface PaymentService {
	Payment savePayment(Payment payment);

	Payment findPaymentById(int id);
}
