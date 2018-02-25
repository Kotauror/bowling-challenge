function Game() {
  this.frames = [];
  this.pairs = [];
}

Game.prototype.isInProgress = function() {
  if ( this._endGameStrike() ||  this._endGameSpare() || this._lessThan20() ) {
    return true;
  } else {
    return false;
  }
}

Game.prototype._addFrame = function() {
  let framesNum = this.frames.length;
    if (framesNum === 0 || framesNum === 1 ) {
      this.frames.push(1);
    } else if (this.frames[framesNum-1] !== this.frames[framesNum-2]) {
      this.frames.push(this.frames[framesNum-1]);
    } else if (this.frames[framesNum-1] === this.frames[framesNum-2]) {
      if (this.frames[framesNum-1] === 10) {
        this.frames.push(10);
      } else {
        this.frames.push(this.frames[framesNum-1]+1);
      }
    }
}

Game.prototype._currentFrame = function() {
  return this.frames[this.frames.length-1];
}

Game.prototype.basicScore = function () {
  var counter = 0;
  this.pairs.map(function(pair) {
    if (Object.values(pair)[0] !== undefined) {
      counter += Object.values(pair)[0]
    }
  })
  return counter;
}

Game.prototype.spares = function() {
  var spares = 0;
  for (i = 0; i < 17; i+=2) {
    if ( this.isNotNull(this.pairs[i+1]) ) {
      if (Object.values(this.pairs[i])[0] + Object.values(this.pairs[i+1])[0] === 10) {
        spares += Object.values(this.pairs[i+2])[0];
      }
    }
  }
  if (Object.values(this.pairs[18])[0] + Object.values(this.pairs[19])[0] === 10) {
    spares += Object.values(this.pairs[20])[0];
  }
  return spares;
}

Game.prototype.strikes = function() {
  var strikes = 0;
  for (i = 0; i <= 14; i++) {
    if (Object.values(this.pairs[i])[0] === 10) {
      if (Object.values(this.pairs[i+2])[0] !== 10) {
      strikes += Object.values(this.pairs[i+2])[0];
      strikes += Object.values(this.pairs[i+3])[0];
      } else {
      strikes += Object.values(this.pairs[i+2])[0];
      strikes += Object.values(this.pairs[i+4])[0];
      }
    }
  }
  if (Object.values(this.pairs[16])[0] === 10) {
    strikes += Object.values(this.pairs[18])[0];
    strikes += Object.values(this.pairs[19])[0];
  }
  if (Object.values(this.pairs[18])[0] === 10) {
    strikes += Object.values(this.pairs[19])[0];
    strikes += Object.values(this.pairs[20])[0];
  }
  return strikes;
}

Game.prototype.generalScore = function() {
  var whole = 0
  whole += this.basicScore();
  whole += this.spares();
  whole += this.strikes();
  return whole
}

Game.prototype.isNotNull = function(stuff) {
  if (Object.values(stuff)[0] !== undefined) {
    return true;
  } else {
    return false;
  }
}

Game.prototype._lessThan20 = function() {
  if (this.frames.length < 20) {
    return true;
  }
}

Game.prototype._endGameStrike = function() {
  if (this.frames.length === 20 && this._secondLastPairValue() === 10) {
    return true;
  } else if (this.frames.length === 22 && this._lastPairValue() === 10) {
    return true;
  } else if (this.frames.length === 22 && this._lastPairValue() === 10) {
    return true;
  } else {
    return false;
  }
}

Game.prototype._endGameSpare = function() {
  if (this.frames.length === 20 && (this._lastPairValue() + this._secondLastPairValue()) === 10) {
    return true;
  } else {
    return false;
  }
}

Game.prototype._lastPairValue = function() {
  return Object.values(this.pairs[this.pairs.length-1])[0];
}

Game.prototype._secondLastPairValue = function() {
  return Object.values(this.pairs[this.pairs.length-2])[0];
}
