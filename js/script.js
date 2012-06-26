/* Author:

*/
  
  var filesAll = new Array();
  
  
  function loadFile(index) {
  	 var f = filesAll[index];
  	var reader = new FileReader();
			
	  			  
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          var title = escape(theFile.name);
          // Render thumbnail.
          var content = e.target.result;
          document.getElementById('filename').innerHTML = title;
          CKEDITOR.instances.wpane.setData(content);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsText(f);
  	
  }
  
  
  function renderList() {
  	
    var files = filesAll;
    document.getElementById('list').innerHTML = '';
    if (files.length > 0) {
	    // files is a FileList of File objects. List some properties.
	    var output = [];
	    for (var i = 0, f; f = files[i]; i++) {
	    	var alt = f.type ? f.type : 'n/a';
	    	alt += ', size: '+ f.size + ' bytes, '; 
	    	alt += 'modified: ' + f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a' ;  	
	    	output.push('<div id="file_',escape(f.name),'"><a href="#" onclick="loadFile(',i,')" rel="tooltip" title="',alt,'">',f.name,'</a></div>');
	    	
	    }
	   document.getElementById('list').innerHTML += output.join('') ;
	    
	    for (var i = 0, f; f = files[i]; i++) {
	  		
	    	 if (f.type.match('image.*')) {
			      var reader = new FileReader();
			
	  			  
			      // Closure to capture the file information.
			      reader.onload = (function(theFile) {
			        return function(e) {
			          var span = document.createElement('span');
			          // Render thumbnail.
			          span.innerHTML = ['<img class="thumb" src="', e.target.result,
			                            '" title="', escape(theFile.name), '"/>'].join('');
			           document.getElementById('file_'+escape(theFile.name)).insertBefore(span, null);
			        };
			      })(f);
			
			      // Read in the image file as a data URL.
			      reader.readAsDataURL(f);
			    	
	    	 }
	    }
	 } 
  }

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    
    var files = null;
    try {    
    	files = evt.dataTransfer.files; // FileList object.
   	}catch (e) {
    	files = evt.target.files; // FileList object
  	}
  	
    for (var i = 0, f; f = files[i]; i++) {
    	filesAll.push(f);
    	
    }
    
    renderList();
    
  }

  function cleanFileList(evt) {
  	filesAll = new Array(); 
  	renderList();
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
   	
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  

  document.getElementById('files').addEventListener('change', handleFileSelect, false);  
  
  document.getElementById('clean').addEventListener('click', cleanFileList, false);
  
  
  CKEDITOR.on('instanceCreated', function (e) {
    e.editor.on('change', function (ev) {    	
      clearTimeout(pending);
      setTimeout(updateDiv, 100);
    });
  });
  
  
		var config = { extraPlugins: 'onchange', toolbar: 'Full'}; //,'autogrow'}
		CKEDITOR.replace('wpane', config);

	function updateDiv(){
	    var editorText = CKEDITOR.instances.wpane.getData();
	    $('#live').html(editorText);
	}
    
  
  function update() {    
	    var sourceText = myCodeMirror.getValue();
        $('#live').html(sourceText);
  }
  
  var foldFunc_html = CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder); //depends on mode

  var myCodeMirror = CodeMirror.fromTextArea(spane, {
    mode: "htmlmixed",
    lineNumbers: true,
    //lineWrapping: true,    
    onGutterClick: foldFunc_html,
    matchBrackets: true,
    tabMode: "indent",
    onChange: function() {
      clearTimeout(pending);
      setTimeout(update, 100);
    }
  });
  
  var pending;
  
  
  $('a[data-toggle="tab"]').on('shown', function (e) {
  	var source = e.relatedTarget.hash // previous tab
  	var target = e.target.hash // activated tab
  	
  	if (source == '#WYSIWYG') {  		
	    var editorText = CKEDITOR.instances.wpane.getData();
	  	myCodeMirror.setValue(editorText);
  	} else {
	    var sourceText = myCodeMirror.getValue();
	  	 CKEDITOR.instances.wpane.setData(sourceText);
  		
  	}
  
})
  
