const data = [
  { id: 'Q', letter: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  { id: 'W', letter: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},
  { id: 'E', letter: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},
  { id: 'A', letter: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},
  { id: 'S', letter: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},
  { id: 'D', letter: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},
  { id: 'Z', letter: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},
  { id: 'X', letter: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'},
  { id: 'C', letter: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'},
];
    
class App extends React.Component {
  constructor(props) {
	  super(props);
	    this.state = {
		    display: "Enjoy your own beats!"
		  }
		this.handleDisplay = this.handleDisplay.bind(this);
  }
  
  handleDisplay(display) {
	  this.setState({
	    display: display
	  });
  }
	  
	render() {
    {/* To render the drum machine composed by display and 
		drum pads */}
    return (
	    <div id='drum-machine'>
        <h1 id="title">The Raw Drum Machine</h1>
	      <div id="display">{this.state.display}</div>
	      <div id='drum-pads'>
          {data.map(d => (
	        <DrumPad
            key={d.letter}
	          id={d.id}
	          letter={d.letter}
	          src={d.src}
	          onClick={this.playAudioClip}
	          handleDisplay={this.handleDisplay}
	        />
	        ))}</div>
	      </div>
	    );
	  }
	}
	
class DrumPad extends React.Component {
  constructor(props) {
	  super(props);
	  this.playAudioClip = this.playAudioClip.bind(this);
	  this.handleKeyPress = this.handleKeyPress.bind(this);
	}
    
	componentDidMount() {
	  document.addEventListener('keydown', this.handleKeyPress);
	  window.focus();
	}
	  
	componentWillUnmount() {
	  document.removeEventListener('keydown', this.handleKeyPress);
	}
	  
	playAudioClip() {
    this.audio.play();
    this.audio.currentTime = 0;
    this.props.handleDisplay(this.props.id);
	}
    
	handleKeyPress(e) {
    if (e.keyCode === this.props.letter.charCodeAt()) {
      this.playAudioClip();
    }
	}
	  
	render() {
	  return (
	    <div 
        className="drum-pad" 
        id={this.props.id}
        onClick={this.playAudioClip}
      >
        <h1>{this.props.letter}</h1>
	      <audio
          id={this.props.letter}
		    	className='clip' 
		    	src={this.props.src} 
		      ref={ref => this.audio = ref}
		    ></audio>
		  </div>
	  )
	}
}
    
ReactDOM.render(
  <App />, document.getElementById('root')
);
