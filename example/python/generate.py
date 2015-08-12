from OOTFY import OOTFY

if __name__ == "__main__":
    ### Configuration ####
    DOMAIN = 'example.domain.com' #Domain key
    SIZE   = 4        #Key size
    PERIOD = 30       #Period
    USER   = 'MyUser' #User info
    PIN    = '1234'   #User PIN
    
    OOTFY = OOTFY(DOMAIN, USER);
    OOTFY.set_keysize(SIZE);
    OOTFY.set_period(PERIOD);

    print('Generated Token : '+OOTFY.calcul_token(PIN)+'\n')
