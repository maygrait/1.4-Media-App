//Audio files contained in this sample are copyright � 2009 by Palm, Inc

function AudioPlayerAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

AudioPlayerAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Luna.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
	myassistant = this;
	this.buttonModel1 = {
		buttonLabel : 'Open audio app',
		buttonClass : '',
		disable : false
	}
	this.buttonAtt1 = {
		type : Mojo.Widget.activityButton
	}
	this.buttonModel3 = {
		buttonLabel : 'Launch audio app',
		buttonClass : '',
		disable : false
	}
	this.buttonAtt3 = {
		type : Mojo.Widget.activityButton
	}
	myassistant = this;
	this.buttonModel2 = {
		buttonLabel : 'Audio Object',
		buttonClass : '',
		disable : false
	}
	this.buttonAtt2 = {
	}
	this.controller.setupWidget('LaunchAudioButton',this.buttonAtt1,this.buttonModel1)
	this.controller.setupWidget('EmbeddedButton',this.buttonAtt3,this.buttonModel3)
	this.controller.setupWidget('audioObjectButton',this.buttonAtt2,this.buttonModel2)
	this.controller.listen('LaunchAudioButton',Mojo.Event.tap, this.handleButtonPressed.bind(this));
	this.controller.listen('EmbeddedButton',Mojo.Event.tap, this.handleButton3Pressed.bind(this));
	this.controller.listen('audioObjectButton',Mojo.Event.tap, this.handleButton2Pressed.bind(this));
}

AudioPlayerAssistant.prototype.handleButtonPressed = function(event) {
	
	this.controller.serviceRequest(	'palm://com.palm.applicationManager',
	{
		method: 'open',
		parameters: {
			target : Mojo.appPath + "sounds/song.mp3"
		},
		onSuccess: function(status){
            $('area-to-update').update(Object.toJSON(status));
        },
        onFailure: function(status){
        	$('area-to-update').update(Object.toJSON(status));							
        },
		onComplete: function(){
			this.getButton = myassistant.controller.get('LaunchAudioButton');
			this.getButton.mojo.deactivate();
		}
	});
}
AudioPlayerAssistant.prototype.handleButton3Pressed = function(event) {
	this.controller.serviceRequest('palm://com.palm.applicationManager', {
		method:'launch', 
		parameters: {
			id : 'com.palm.app.streamingmusicplayer',
			params: {
				target : Mojo.appPath + "sounds/song.mp3"
			}
		},
		onSuccess: function(status){
            $('area-to-update').update(Object.toJSON(status));
        },
        onFailure: function(status){
        	$('area-to-update').update(Object.toJSON(status));							
        },
		onComplete: function(){
			this.getButton = myassistant.controller.get('EmbeddedButton');
			this.getButton.mojo.deactivate();
		}
	});
}
AudioPlayerAssistant.prototype.handleButton2Pressed = function(event) {
	this.controller.stageController.pushScene('audioObject'); 
}
AudioPlayerAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


AudioPlayerAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	  //this.getButton = myassistant.controller.get('OpenSceneButton');
	//		this.getButton.mojo.deactivate();
}

AudioPlayerAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening('LaunchAudioButton',Mojo.Event.tap, this.handleButtonPressed.bind(this));
	this.controller.stopListening('EmbeddedButton',Mojo.Event.tap, this.handleButton3Pressed.bind(this));
}
