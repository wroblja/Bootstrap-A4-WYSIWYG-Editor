// private scope
(function(){
    
    
    // constructor
    this.Wysiwyg = function(){
        
        
        // global element references
        this.wysiwygHeight = null;
        this.elementSize = null;
        this.toolBar = null;
        this.selectionString = null;
        
        
        // options
        var defaults = {
            wysiwygType: 'default',
            template: 'default',
            wysiwygChange: true,
            fontFamily: true,
            fontSize: true,
            fontWeight: true,
            fontStyle: true,
            color: true,
            background: true,
            listStyleType: true,
            textAlign: true,
            link: true,
            image: true,
            margin: true
        }
        
        // change default options by user options
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }
    }
        
        
    // Public Methods

    Wysiwyg.prototype.select = function() {
        toggleToolBar.call(this);
        getSelectedText.call(this);
        initializeEvents.call(this);
        
    }

    // Private Methods

    function toggleToolBar() {

        var element;

        element = document.getElementsByClassName('wysiwyg-toolbar')[0];
        
        if (!this.toolBar){
            element.style.display = 'block';
            this.toolBar = true;
        }    

    }
    
    function getSelectedText () {
        
        if (window.getSelection) {  // all browsers, except IE before version 9

            Wysiwyg.selectionString = window.getSelection().getRangeAt(0);
              
        }
    }
    
    
    // wrap string
    function wrapSelectionString(tag, property, value){

        var element;
        var selection = Wysiwyg.selectionString;
        var selectedText = selection.extractContents();
        
        element = document.createElement(tag);
        element.style[property] = value;
        element.appendChild(selectedText);
        selection.insertNode(element);
    
    }
    
    
    // unwrap string
    function unWrapSelectionString(tag){
        
        var node;
        var selection = Wysiwyg.selectionString;
        
        node = $(selection.commonAncestorContainer);
        if (node.parent().is(tag)) {
            node.unwrap();
        }else{
            return false;
        }
    
    }
    
    
    function wrap(tag, property, value){
    
        if(!unWrapSelectionString(tag)){
            wrapSelectionString(tag, property, value)
        }
    
    }



    // user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
    

    function initializeEvents() {

        if (Wysiwyg.selectionString) {
            
            $('.wysiwyg-font-weight').on('click', function(){
                wrap('span', 'fontWeight', 'bold')
            });
            
            $('.wysiwyg-font-style').on('click', function(){
                wrap('span', 'fontStyle', 'italic')
            });
            
            $('.wysiwyg-font-style').on('click', function(){
                wrap('span', 'fontStyle', 'italic')
            });
            
        }

    }
             

}());

var myWysiwyg = new Wysiwyg({
    template: 'flat'
});


var pageEditor = $('#wysiwygEditor');

pageEditor.on('mouseup', function() {
    myWysiwyg.select();
});

