/**
 * @author abel
 */
function sayHello (input) {
	return 'Hola '+input;
}

window.onload = function() {
  var te = document.getElementById("code");
  var sc = document.getElementById("script");
  te.value = (sc.textContent || sc.innerText || sc.innerHTML).replace(/^\s*/, "");
  sc.innerHTML = "";
  var te_html = document.getElementById("code-html");
  te_html.value = "<html>\n  " + document.documentElement.innerHTML + "\n</html>";

  var foldFunc = CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
  window.editor = CodeMirror.fromTextArea(te, {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
    onGutterClick: foldFunc,
    extraKeys: {"Ctrl-Q": function(cm){foldFunc(cm, cm.getCursor().line);}}
  });
  foldFunc(editor, 9);
  foldFunc(editor, 20);

  var foldFunc_html = CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
  window.editor_html = CodeMirror.fromTextArea(te_html, {
    mode: "text/html",
    lineNumbers: true,
    lineWrapping: true,
    onGutterClick: foldFunc_html,
    extraKeys: {"Ctrl-Q": function(cm){foldFunc_html(cm, cm.getCursor().line);}}
  })
  foldFunc_html(editor_html, 1);
  foldFunc_html(editor_html, 15);
};

