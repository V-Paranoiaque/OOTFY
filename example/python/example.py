from OOTFY import OOTFY

def pin(pinResult):
    if pinResult == 1:
        return 'Good PIN'
    else:
        return 'Bad PIN'

if __name__ == "__main__":
    ### Configuration ####
    DOMAIN = 'example.domain.com' #Domain key
    SIZE   = 4        #Key size
    PERIOD = 30       #Period
    USER   = 'MyUser' #User info
    PIN    = '1234'   #User PIN
    
    example = 'qwer'
    OOTFY = OOTFY(DOMAIN, USER)
    OOTFY.set_keysize(SIZE)
    OOTFY.set_period(PERIOD)
    token = OOTFY.calcul_token(PIN)
    
    print('Example:\n')

    print('Enter '+example)
    print(pin(OOTFY.check_token(example, PIN)))
    
    print('')

    print('Enter '+token)
    print(''+pin(OOTFY.check_token(token, PIN)))
