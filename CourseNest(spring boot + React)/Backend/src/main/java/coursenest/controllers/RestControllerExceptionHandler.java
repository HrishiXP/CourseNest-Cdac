package coursenest.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import coursenest.models.Response;

@ControllerAdvice
public class RestControllerExceptionHandler {
	
	@ExceptionHandler({RuntimeException.class})
	public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
		return Response.error(e.getMessage());
	}

}
