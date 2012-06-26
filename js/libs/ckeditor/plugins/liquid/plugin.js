(function(){
	
  var pluginName='liquid';
  var pluginLabel='insert liquid tag';
	
  var commandName= {
    exec:function(editor){
          editor.insertHtml("{algun_tag}");
    }
  }

  CKEDITOR.plugins.add(pluginName,{
  	
    init:function(editor){
    	
      editor.addCommand(pluginName,commandName);
      
      editor.ui.addButton(pluginName,
      {
		label:pluginLabel,
        command:pluginName,        
        icon: this.path +'images/'+pluginName + '_icon.png'
      });
    }
  });

})();
