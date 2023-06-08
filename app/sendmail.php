<?php
	$SITE_TITLE = 'Moonberry';
	$SITE_DESCR = '';

	if ( isset($_POST) ) {
		$name = htmlspecialchars(trim($_POST['name']));
		$phone = htmlspecialchars(trim($_POST['phone']));
		$email = htmlspecialchars(trim($_POST['email']));
		$selector = htmlspecialchars(trim($_POST['selector']));
		$сompany = htmlspecialchars(trim($_POST['сompany']));
		$organisetion = htmlspecialchars(trim($_POST['organisetion']));
		$position = htmlspecialchars(trim($_POST['position']));
		$subject = $_POST['subject'] ? htmlspecialchars(trim($_POST['subject'])) : '';
		$question = isset($_POST['question']) ? htmlspecialchars(trim($_POST['question'])) : '';
		$to = 'info@moonberry.net.ru';

		$headers = "From: $SITE_TITLE \r\n";
		$headers .= "Reply-To: ". $email . "\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";

		$data = '<h1>'.$subject."</h1>";
		$data .= 'Имя: '.$name."<br>";
		$data .= 'Email: '.$email."<br>";

		if ( $phone != '' ) {
			$data .= 'Телефон: ' . $phone . "<br>";
		}

		if ( $position != '' ) {
			$data .= 'Ваша должность: ' . $position . "<br>";
		}

		if ( $organisetion != '' ) {
			$data .= 'ИНН организации: ' . $organisetion . "<br>";
		}
		
		if ( $сompany != '' ) {
			$data .= 'Название организации: ' . $сompany . "<br>";
		}

		if ( $selector != '' ) {
			$data .= 'Вид деятельности: ' . $selector . "<br>";
		}

		if ( $question != '' ) {
			$data .= 'Вопрос: ' . $question . "<br>";
		}

		$message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
				".$data."
				<br>\n
				<hr>\n
				<br>\n
				<small>это сообщение было отправлено с сайта ".$SITE_TITLE." - ".$SITE_DESCR.", отвечать на него не надо</small>\n</div>";
		$send = mail($to, $subject, $message, $headers);

		if ( $send ) {
			echo '';
		} else {
				echo '<div class="error">Ошибка отправки формы</div>';
		}

	}
	else {
			echo '<div class="error">Ошибка, данные формы не переданы.</div>';
	}
	die();
?>