const App = require('../src/index');

class Like extends App.PluginBase{
  constructor(){
    super('Like', 'あなたにいいねします!');
    super.addCommand('like', 'yesでいいねします。noでいいねしなくなります。');

    this.reaction = [
      "👍",
      "😋",
      "😆",
      "😫",
      "😀",
      "😃",
      "😅",
      "😂",
      "🤣",
      "☺️",
      "😊",
      "🙂",
      "🙃",
      "😍",
      "🥰",
      "😘",
      "😙",
      "😗",
      "😚",
      "😛",
      "😝",
      "😞",
      "🤗",
      "🙌",
      "❤️",
      "♥️",
      "🤩",
      "😎",
      "🐳",
      "🐋"
    ];
  }

  onMessage(message){
    var data = super.store().get(message.guild.id);

    if(!data){
      super.store().set(message.guild.id, {});
      return;
    }

    var user_data = data[message.author.id];

    if(user_data){
      var random = Math.floor(Math.random() * this.reaction.length);
      message.react(this.reaction[random]);
    }
  }

  onCommand(command, argv, message){
    if(argv[0] && argv[0].match(new RegExp("yes", "i"))){
      var sw = true;
    }else if(argv[0] && argv[0].match(new RegExp("no", "i"))){
      var sw = false;
    }else{
      message.channel.send('指定がおかしくない？');
      return;
    }

    if(!super.store().get(message.guild.id)) super.store().set(message.guild.id, {});

    console.log(super.store());
    super.store().get(message.guild.id)[message.author.id] = sw;

    message.channel.send('りょーかーい');
  }
}

module.exports = Like;
