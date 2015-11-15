<?php
if ($_POST) {
        $to_email = "etna_scorpio91@mail.ru"; //Recipient email, Replace with own email here

        //Sanitize input data using PHP filter_var().
        $user_name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
        $user_email = filter_var($_POST["email"], FILTER_SANITIZE_STRING);
        $user_comment = filter_var($_POST["comment"], FILTER_SANITIZE_STRING);

        // subject
        $subject = "Вяземское. Квартал таунхаусов";

        //email body
        $message_body = $user_name."\r\n".$user_email."\r\n".$user_comment;

        //proceed with PHP email.
        $headers = 'From: '.$user_name.'' . "\r\n" .
        'Reply-To: '.$user_phone.'' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

        $send_mail = mail($to_email, $subject, $message_body, $headers);

        if (!$send_mail){
            //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
            $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
            die($output);
        }else{
            $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$user_name .' Thank you for your email'));
            die($output);
        }
    }
?>