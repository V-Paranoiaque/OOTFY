<?php

include('OOTFY.class.php');

/*** Configuration ***/
define('DOMAIN', ''); //Domain key
define('SIZE', 4); //Key size
define('PERIOD', 30); //Period
define('USER', ''); //User info
define('PIN', '0000'); //User PIN
/*** End ***/

$OOTFY = new OOTFY(DOMAIN, USER);
$OOTFY->set_keysize(SIZE);
$OOTFY->set_period(PERIOD);

echo 'Generated Token : '.$OOTFY->calcul_token(PIN);
echo "\n\n";

?>
