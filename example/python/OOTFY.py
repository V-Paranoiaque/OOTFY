import time
import hashlib

###
# Class OOTFY
# Check tokens and define configuration
###
class OOTFY:
    ###
    # Define user parameters
    # There is no control on domainkey and userid
    # @param domainkey string can be unique or the same for every users
    # @param userid    string must be specific to only one user
    ###
    def __init__(self, domainkey, userid):
        self.domainkey = domainkey
        self.userid    = userid
        self.keysize   = 4
        self.period    = 30
    
    ###
    # Set new key size
    # @param int keysize_new new key size
    ###
    def set_keysize(self, keysize_new):
        if keysize_new != 8  and keysize_new != 16 and keysize_new != 32 and keysize_new != 64:
            self.keysize = keysize_new
            return 1
        else:
            return 0
    
    ###
    # Define period between two keys generation, in seconds
    # @param period_new int period between two key generation
    #                       must be between 15 and 90
    #*/
    def set_period(self, period_new):
        if period_new != 15 and period_new != 30 and period_new != 60 and period_new != 90:
            self.period = period_new
            return 1
        else:
            return 0
    
    ###
    # Calcul token
    # @param pin int user's PIN
    # @return token
    ###
    def calcul_token(self, pin):
        now   = int(time.time())
        ltime = now - now%self.period
        tmp   = hashlib.sha512( str(pin).encode() + str(ltime).encode()).hexdigest()
        resul = hashlib.sha512(str(self.userid).encode()+tmp.encode()+str(self.domainkey).encode()).hexdigest()
        return resul[0:self.keysize]
    
    ###
    # Check token authentification
    # Please log bad try
    # @param token string the token
    # @param pin   int    user's PIN
    # @return 1 : Bad  token
    #         2 : Good token
    ###
    def check_token(self, token, pin):
        server_token = self.calcul_token(pin)
        if(token == server_token):
            return 1
        else:
            return 2
