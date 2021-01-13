const App = require('../src/index');

class Oyasumi extends App.PluginBase{
  constructor(){
    super('Oyasumi', 'おやすみに答えます');

    this.regex = /^おやす|[寝ね]る?/i;
    this.replys = [
      "おやすみなさい。",
      "よい夢を。",
      "おやすみー",
      "💤"
    ]
  }

  onMessage(mes){
    if(this.regex.test(mes.content)){
      var random = Math.floor(Math.random() * this.replys.length);
      mes.channel.send(`${this.replys[random]}`);
    }
  }
}

module.exports = Oyasumi;
