(function(global){

    var selector,      
        prevSpans = [], 
        prevLines = [], 
        waitTime,       
        typeSpeed,      
        strInput = []; 


    
    var typing = function(id, speed, initialDelay){
        return new fn(id, speed, initialDelay);
    }

    
    function fn(id, speed, initialDelay) {
        
        
        selector = id;
        typeSpeed = speed || null;
        waitTime = initialDelay || 0;

        
        var newLine = createElem("div", "line"),
            newSpan = createElem("span", "current"),
            newLine = document.getElementById(selector).appendChild(newLine),
            newSpan = newLine.appendChild(newSpan);

        strInput.push("");
        prevSpans.push(newSpan);
        return this;
    };

    var library = fn.prototype = {

        // animation speed
        speed: function(speed){
            typeSpeed = speed;
            return this;
        },

        type: function(str, obj){
            var counter = 0,
                style = {},
                currSpan,
                prevSpan,
                newSpan = createElem("span"),
                newLine,
                speed = typeSpeed;
           
            prevSpan = prevSpans[prevSpans.length - 1];
            currSpan = createSibling(prevSpan, newSpan);
            
            if(typeof str !== "string") return this;

            if(obj && typeof obj === "object"){
                for(let key in obj){
                    switch(key){
                        case "fontWeight":
                            style.fontWeight = obj[key];
                            break;

                        case "color":
                            style.fontColor = obj[key];
                            break;

                        case "fontStyle":
                            style.fontStyle = obj[key];
                            break;
                    }
                }
            }
               
            // this is the part I loathe. Kill me.
            strInput.push(str);
            
            for(let i = 0; i < str.length; i++){
                setTimeout( (function(){

                    currChar = str.charAt(i);

                    if(i==0){
                        
                        if( hasClass(prevSpan, "current") )
                            prevSpan = resetSpanClass(prevSpan, "current", "past");
                       
                        if( !hasClass(currSpan, "current") )
                            currSpan.classList.add("current");
                         
                        if( isWhiteSpace(currChar) )
                            currSpan.classList.add("head");
                    }else{
                        
                        if( hasClass(currSpan, "space") )
                            currSpan.classList.remove("space");
                        
                        if( isWhiteSpace(currChar) )
                            currSpan.classList.add("space");
                    }
                    
                    
                    currSpan.innerHTML += currChar;

                    
                    if(style.fontWeight)
                        currSpan.style.fontWeight = style.fontWeight;
                    if(style.fontColor)
                        currSpan.style.color = style.fontColor;
                    if(style.fontStyle)
                        currSpan.style.fontStyle = style.fontStyle;

                }), waitTime + (speed * counter) );

                counter++;
            }

            waitTime += speed * counter;
            prevSpans.push(currSpan);  
            return this;
        },

        // backword delete
        delete: function(str){

            var str = str || "",
                currSpan = prevSpans[prevSpans.length - 1],
                currStr = strInput[strInput.length - 1],
                counter = 0,
                endIndex,
                speed = typeSpeed;

            if(!str){
                endIndex = 0;
            }else{
                endIndex =  currStr.includes(str) ? currStr.indexOf(str) : null;

                if(!endIndex){
                    console.log("string not match");
                    return this;
                }
            }

            for(let i = currStr.length - 1; i >= endIndex; i--){
                setTimeout( (function(){

                    var str = currStr.slice(0, i);

                    // remove the .head class if no str left in the span
                    if( i == endIndex && !str.length && hasClass(currSpan, "head") )
                        currSpan.classList.remove("head");
                    // reset .space class
                    if( hasClass(currSpan, "space") )
                        currSpan.classList.remove("space");
                    // check if currChar is whitespace
                    if( hasTailingSpace(str) )
                        currSpan.classList.add("space");

                    currSpan.innerHTML = str;
                    
                }), waitTime + (speed * counter) );

                counter++;
            }

            waitTime += speed * counter;
            strInput[strInput.length - 1] = currStr.slice(0, endIndex);
            return this;
        },

        // wait
        wait: function(time){
            if(typeof time !== "number") return this;
            waitTime += time;
            return this;
        },

        // line break
        lineBreak: function(){
            // create a new span
            var newLine = createElem("div", "line"),
                newSpan = createElem("span"),
                currSpan = prevSpans[prevSpans.length - 1];
                currLine = currSpan.parentNode;

            newLine = document.getElementById(selector).appendChild(newLine);
            newSpan = newLine.appendChild(newSpan);

            // insert linebreak
            strInput.push("\n");
    
            setTimeout( (function(){
                currSpan = resetSpanClass(currSpan, "current", "past");
                newSpan.classList.add("current");
            }), waitTime);

            prevSpans.push(newSpan);
            prevLines.push(currLine);
            
            return this;
        },

        // log
        log: function(){
            console.log(this);
        }
    }





    // helper function
    // check if single whitespace
    function isWhiteSpace(str){      
        return /^\s$/.test(str);
    }
    // check if last character is whitespace
    function hasTailingSpace(str){
        return /\s$/.test(str);
    }

    
    function hasClass(elem, className) {
        return elem ? elem.classList.contains(className) : false;
    }

    
    function resetSpanClass(elem, clsToRemove, clsToAdd){
        if(!elem) return;
        elem.classList.add(clsToAdd);
        elem.classList.remove(clsToRemove);
        return elem;
    }

    
    function createElem(elemName, className){
        var elem = document.createElement(elemName),
            cls = className || null;
        if(cls) elem.classList.add(cls);
        return elem;
    }

    function createSibling(elem, sibling){
        return elem.parentNode.appendChild(sibling);
    }

    typing.prototype = library;

    global._$ = global.typing = typing;

})(window);
  _$("demo", 100, 800)
  .type(">SET TERMINAL/INQUIRE").speed(250)
  .lineBreak()
  .lineBreak()
  .type("RIT-V300").speed(250)
  .lineBreak()
  .lineBreak()
  .type(">SET FILE/PROTECTION=OWNER:RWED ACCOUNTS:F").speed(250)
  .lineBreak()
  .type(">SET HALT RESTART/MAINT ").speed(250)
  .lineBreak()
  .lineBreak()
  .type("Initializing TermCo Industries(TM) MF Boot Agent V2.7.1").speed(250)
  .lineBreak()
  .type("RETROS BIOS").speed(250)
  .lineBreak()
  .type("RBIOS-4.01.08.00 76EE5.E6.E9").speed(250)
  .lineBreak()
  .type("COPYRIGHT 1987-1995 TermCo IND.").speed(250)
  .lineBreak()
  .type("MEM: 1024 MB").speed(250)
  .lineBreak()
  .type("ROOT (7R4)").speed(250)
  .lineBreak()
  .type("MAINTENANCE MODE").speed(250)
  .lineBreak()
  .lineBreak()
  .type(">RUN DEBUG.ACCOUNTS:F").speed(250)