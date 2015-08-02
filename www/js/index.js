/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var url = document.URL.split('/');
        var current = url[url.length-1];
        if(current == 'index.html') {
            localStorage.pin='';
            setTimeout(function(){
              document.location.href="home.html";
            }, 500);
        }
        else if(current == 'conf.html') {
            load_config();
        }
        else if(current == 'token.html') {
            display_token();
        }
    }
};

app.initialize();

/*** Menu ***/
$("#menu-home").touchstart(function() {
	   document.location.href="home.html"
});
$("#menu-conf").touchstart(function() {
	   document.location.href="conf.html"
});

/*** Home ***/
$("#pin_0").touchstart(function() {
	   add_pin("0");
});

$("#pin_1").touchstart(function() {
     add_pin("1");
});

$("#pin_2").touchstart(function() {
     add_pin("2");
});

$("#pin_3").touchstart(function() {
     add_pin("3");
});

$("#pin_4").touchstart(function() {
     add_pin("4");
});

$("#pin_5").touchstart(function() {
     add_pin("5");
});

$("#pin_6").touchstart(function() {
     add_pin("6");
});

$("#pin_7").touchstart(function() {
     add_pin("7");
});

$("#pin_8").touchstart(function() {
     add_pin("8");
});

$("#pin_9").touchstart(function() {
     add_pin("9");
});

function add_pin(num) {
  if($("#pin-area").val().length < 4) {
    $("#pin-area").val($("#pin-area").val()+""+num);
  }
}

$("#pin_ok").touchstart(function() {
	var pin = $("#pin-area").val();
	alert(pin);
	if(pin != '') {
		localStorage.pin = pin;
		document.location.href="token.html"
	}
});

$("#pin_delete").touchstart(function() {
	   $("#pin-area").val('');
});

/*** Conf ***/
$("#conf-save").touchstart(function() {
  var userid = $("#conf-userid").val();
  if(userid != "" && userid != null) {
    localStorage.userid = userid;
  }
  
  var domain = $("#conf-domain").val();
  if(domain != "" && domain != null) {
    localStorage.domain = domain;
  }
  
  var key = $("#conf-key").val();
  if(key == 4 || key == 8 || 
     key == 16 || key == 32) {
    localStorage.key_size = key;
  }
  
  var validity = $("#conf-validity").val();
  if(validity == 15 || validity == 30 || validity == 60 || 
     validity == 90 || validity == 120) {
    localStorage.validity = validity;
  }
  
  $("#conf-error").show();
  
  load_config();
});

function load_config() {
  
  var userid = localStorage.userid;
  if(userid != "" && userid != null) {
    $("#conf-userid").val(userid);
  }
  
  var domain = localStorage.domain;
  if(domain != "" && domain != null) {
    $("#conf-domain").val(domain);
  }
  
  var key = localStorage.key_size;
  if(key == 4  || key == 8 || 
     key == 16 || key == 32) {
     $("#conf-key").val(key);
     $("#conf-key").selectmenu('refresh', true);
  }
  
  var validity = localStorage.validity;
  if(validity == 15 || validity == 30 || validity == 60 || 
     validity == 90 || validity == 120) {
    $("#conf-validity").val(validity);
    $("#conf-validity").selectmenu('refresh', true);
  }
}

/*** Token ***/

$("#token-back").touchstart(function() {
	   document.location.href="home.html"
});

function generate_token(base_time) {

  var userid = localStorage.userid;
  
  if(userid == null) {
    userid = '';
  }
  
  var domain = localStorage.domain;
  if(domain == null) {
    domain = '';
  }
  
  var key_size = localStorage.key_size;
  
  if(key_size != 4 && key_size != 8 && 
   key_size != 16 && key_size != 32) {
    key_size = 4;
  }
  
  var pin = localStorage.pin;
  
  if(pin == null || pin == '') {
    document.location.href="home.html";
  }
  
  var shaPin = new jsSHA(pin+''+base_time, "TEXT");
  console.log(userid+shaPin.getHash("SHA-512", "HEX")+domain);
  var shaObj = new jsSHA(userid+shaPin.getHash("SHA-512", "HEX")+domain, "TEXT");
  
  return shaObj.getHash("SHA-512", "HEX").substring(0, key_size);
}

function display_token() {

  var timestamp = Math.round(+new Date() / 1000);
  var validity  = localStorage.validity;
  var token     = '';
  var val       = 0;
  
  if(validity != 15 && validity != 30 && validity != 60 && 
     validity != 90 && validity != 120) {
    validity = 60;
  }
  
  var increment = 360/validity;
  
  timestamp = timestamp - timestamp%validity;
  token     = generate_token(timestamp);
  $("#token").val(format_token(token));
  
  window.setInterval(function(){
    timestamp = Math.round(+new Date() / 1000);
    val = (validity-timestamp%validity);
    
    if(val == validity) {
      token = generate_token(timestamp);
      $("#token").val(format_token(token));
    }
    
    $('#progress-bar').val(val * increment);
    $('#progress-bar').slider('refresh');
  }, 1000);
}

function format_token(token) {
  var back = '';
  var i;
  for(i=0;i<token.length;i++) {
    if(i > 0 && i%4 == 0) {
      back = back + ' ';
    }
    back = back + token[i];
  }
  return back;
}

