
import React from 'react';
import formatTime from 'minutes-seconds-milliseconds';

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

var StopWatch = React.createClass({
  getInitialState: function() { // is run only one time when a Component is created
    return { // always return a singlr object
      timeElapsed: null,
      running: false,
      startTime: null,
      laps:[]
    };
  },
  render: function(){
        return <View style={styles.container}>
                <View style={[styles.header, this.border('yellow')]}>
                    <View style={[styles.timerWrapper,this.border('red')]}>
                      <Text style={styles.timer}>
                        {formatTime(this.state.timeElapsed)}

                      </Text>
                    </View>
                    <View style={[styles.buttonWrapper,this.border('green')]}>
                        {this.startStopButton()}
                        {this.lapButton()}
                    </View>
                  </View>

                  <View style={[styles.footer,this.border('blue')]}>
                    {this.laps()}
                  </View>
            </View>
  },
laps: function(){
  return this.state.laps.map(function(time, index){ // we pass map a function
    return <View style={styles.lap}>
    <Text style={styles.lapText}>
    Lap #{index+1}
    </Text>
    <Text style={styles.lapText}>
    {formatTime(time)}
    </Text>
    </View>
  });
},
  startStopButton: function(){
    var style2 = this.state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight

        underlayColor="gray"
        onPress={this.handleStartPress}
        style={[styles.button, style2]}>
        <Text>
        {this.state.running ? 'Stop' : 'Start'}

        </Text>
      </TouchableHighlight>
);
  },

  lapButton: function(){
    return <TouchableHighlight

      underlayColor="gray"
      style={styles.button}
      onPress={this.handleLapPress}>
        <Text>
            Lap
        </Text>
      </TouchableHighlight>
},
handleLapPress: function(){// moment user hits the lap buttin the timer gets back to 0
  var lap=this.state.timeElapsed; // current time saved

  this.setState({ //
    startTime: new Date(),
    laps: this.state.laps.concat([lap])// copying the lap to the array laps[]
  });
},

handleStartPress: function(){
  if(this.state.running){
  clearInterval(this.interval);// clearInterval is a default function passing this.interval so that we can stop it and take it 0
  this.setState({// calling setState therefore it will re-render it on the screen
    running:false// with this we stopped the timer

  });
      return
}// console.log('element pressed')
// var startTime = new Date();

// Never do this in React never update like this
//this.state.timeElapsed = null

//update out state with some new value

//() => fat arrow function
this.setState({startTime: new Date()});

this.interval = setInterval(() => {// storing the value of current timer in a variable k/a this.interval
this.setState({
    timeElapsed: new Date() - this.state.startTime,
    running: true
  });

},1)// set interval ha stwo arguments // number here is milliseconds
// setInterval is a function which takes two arguments
// the 1st one is a function and the 2nd one is a number in milli seconds
// after 30 milliseonds I will see it on the screen i can increase or decrease the speed
},
border:function(color){
  return{
    borderColor:color,
    borderWidth:4
  }
}
});

var styles= StyleSheet.create({

  container:{
  flex:1,//fill the entire screen
  alignItems:'stretch'

},
    header: { //yellow area basically
      flex: 1
    },
    footer: { // blue area
    flex: 1
    },

    timerWrapper:{
    flex: 5,// red area takes 5/8th space of the space available
    justifyContent: 'center',
    alignItems:'center'
    },

    buttonWrapper:{
     flex:  3, // green area takes 3/8th space of the space available
     flexDirection: 'row',
     justifyContent: 'space-around', // flexDirection is row so didnt directly made justifycontent as center
     alignItems: 'center' // instead made alignItems as center
    },

timer: {
  fontSize:60

},
button:{
  borderWidth:2,
  height:100,
  width:100,
  borderRadius:50,
  justifyContent: 'center',
  alignItems: 'center'

},
startButton:{
  borderColor:'blue'
},
stopButton:{
  borderColor:'red'
},
lap:{
  justifyContent:'space-around',
  flexDirection: 'row'
},
lapText:{
  fontSize: 30
}

});
AppRegistry.registerComponent('stopwatch', () => StopWatch);
