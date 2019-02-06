  let run = document.querySelector('.btn-run');
  let editor = document.querySelector('.editor');
  let input = editor.querySelector('#input')
  let output = document.querySelector('.console #output')

  /*run.onclick = function(){  
    output.innerHTML = input.value
  }*/

  editor.onclick = function(){
    input.focus()
  }

  // *****************************

        var autoExpand = function (field) {
  // Reset field height
  field.style.height = 'inherit';
  // Get the computed styles for the element
  var computed = window.getComputedStyle(field);
  // Calculate the height
  var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
               + parseInt(computed.getPropertyValue('padding-top'), 10)
               + field.scrollHeight
               + parseInt(computed.getPropertyValue('padding-bottom'), 10)
               + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
  field.style.height = height + 'px';
};
document.addEventListener('input', function (event) {
  if (event.target.tagName.toLowerCase() !== 'textarea') return;
  autoExpand(event.target);
}, false);

  // *****************************

/*jslint evil: true */

/*members create, error, message, name, prototype, stringify, toSource,
    toString, write
*/

/*global JSON, make_parse, parse, source, tree */

// Make a new object that inherits members from an existing object.

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

// Transform a token object into an exception object and throw it.

Object.prototype.error = function (message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw t;
};


(function () {
    var parse = make_parse();

    function go(source) {
        var string, tree;
        try {
            tree = parse(source);
            string = JSON.stringify(tree, ['key', 'name', 'message',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
        } catch (e) {
            string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                    'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
        }
        document.getElementById('output').innerHTML = string
            .replace(/&/g, '&amp;')
            .replace(/[<]/g, '&lt;');
    }

    // go("var make_parse = " + (make_parse.toSource ? make_parse.toSource() : make_parse.toString()) + ";");

    document.getElementById('btn-run').onclick = function (e) {
        go(document.getElementById('input').value);
    };

    input.onkeydown = function(o) {
      o = o || event;
      if (o.ctrlKey && o.keyCode == 13) {
        console.log("Ctrl+Enter");
        go(document.getElementById('input').value);
        o.preventDefault();  
      }
    }

}());