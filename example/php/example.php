<?php

include('OOTFY.class.php');

function pin($pinResult) {
  if($pinResult == 1) {
    return 'Good PIN';
  }
  else {
    return 'Bad PIN';
  }
}

/*** Configuration ***/
define('DOMAIN', 'example.domain.com'); //Domain key
define('SIZE', 4); //Key size
define('PERIOD', 30); //Period
define('USER', 'MyUser'); //User info
define('PIN', '1234'); //User PIN
/*** End ***/

$example = 'qwer';
$OOTFY = new OOTFY(DOMAIN, USER);
$OOTFY->set_keysize(SIZE);
$OOTFY->set_period(PERIOD);
$token = $OOTFY->calcul_token(PIN);

echo '<b>Example:</b><br/>';

echo '<br/>Enter '.$example;
echo '<br/>'.pin($OOTFY->check_token($example, PIN));
echo '<br/>';

echo '<br/>Enter '.$token;
echo '<br/>'.pin($OOTFY->check_token($token, PIN));
echo '<br/>';

?>
